<?php
// error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
require 'config.php';


$data = $_POST['data'];
$email = $_SESSION['email'];

// Create connection
$conn = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the user already exists in the database

$updateStmt = $conn->prepare("UPDATE users SET password=? WHERE email=?");
$updateStmt->bind_param("ss", $data, $email);
$updateStmt->execute();

echo $response = "Your password is changed!";

$updateStmt->close();
$conn->close();
?>