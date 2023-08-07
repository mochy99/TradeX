<?php
// error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
require 'config.php';


$data = $_POST['inf'];
$email = $_SESSION['email'];

// Create connection
$conn = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Update the information into the database

$updateStmt = $conn->prepare("UPDATE users SET userName=?, fname=?, lname=?, gender=?, phoneNum=?, dob=? WHERE email=?");
$updateStmt->bind_param("sssssss", $data[0], $data[1], $data[2], $data[3], $data[4], $data[5], $email);
$updateStmt->execute();

echo $response = "Your information is updated!";

$updateStmt->close();
$conn->close();
?>
