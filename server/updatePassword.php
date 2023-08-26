<?php
include_once "../template/error.php";
include_once "../template/session.php";
require '../template/config.php';
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

header("Location:../main/main.php");
exit;

// Trim data from js
function test_input($data) {
    $data = trim($data);
    return $data;
}
?>