<?php
// error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
require 'config.php';
?>

<?php
// Create connection
$userName = $_GET['userName'];
$conn =  new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " .$conn->connect_error);
}

// Create prepare and bind
$stmt = $conn->prepare("SELECT email FROM users WHERE userName=?");
$stmt->bind_param("s", $userName);

// Execute the query
$stmt->execute();

// Get the result
$result = $stmt->get_result();
    
if ($result->num_rows > 0) {
    if ($result !== $_SESSION['email']) {
        $response =false;
    } else {
        $response = true;
    }
} else {
    $response = true;
};
echo $response;
$stmt->close();
$conn->close();

?>