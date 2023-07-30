<?php
// error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// start new session
session_start();

require 'config.php';
?>

<?php
$password = test_input($_POST["password"]);
// Create connection
$conn =  new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " .$conn->connect_error);
}

// Create prepare and bind
$stmt = $conn->prepare("INSERT INTO users (email, password) VALUE (?,?)");
$stmt->bind_param("ss", $_SESSION["email"], $password);

$stmt->execute();

$stmt->close();
$conn->close();

header("Location: mainPage.php");
exit;


function test_input($data) {
    $data = trim($data);
    return $data;
}
?>