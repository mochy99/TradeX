<?php
include_once "../template/error.php";
require "../template/session.php";
require '../template/config.php';
?>

<?php


$data = $_POST['inf'];
$email = $_SESSION['email'];

// Create connection
$conn = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Update the information into the database

$updateStmt = $conn->prepare("UPDATE users SET fname=?, lname=?, gender=?, phoneNum=?, dob=? WHERE email=?");
$updateStmt->bind_param("ssssss", $data[0], $data[1], $data[2], $data[3], $data[4], $email);
$updateStmt->execute();

echo $response = "Your information is updated!";

$updateStmt->close();
$conn->close();
?>
