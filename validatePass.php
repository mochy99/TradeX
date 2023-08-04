<?php
// error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
require 'config.php';
?>
<?php
$email = $_SESSION["email"];
$password = $_POST["data"];
// SQL query and database operations here
// Create connection
$conn = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " .$conn->connect_error);
}

// Prerpare and bind
$stmt = $conn->prepare("SELECT password FROM users WHERE email=?");
$stmt->bind_param("s", $email);

// Execute the query
$stmt->execute();

// Get the result
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($password === $row["password"]) {
        echo $response = true;
    } else {
        echo $response = false;
    }
} 

$stmt->close();
$conn->close();
?>