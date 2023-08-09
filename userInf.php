<?php
// error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
require 'config.php';
?>

<?php
// Create connection
$email = $_SESSION['email'];
$conn =  new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " .$conn->connect_error);
}

// Create prepare and bind
$stmt = $conn->prepare("SELECT *
FROM users WHERE email=?");
$stmt->bind_param("s", $email);

// Execute the query
$stmt->execute();

// Get the result
$result = $stmt->get_result();
    
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $response = $row['userName'] . ',' . $row['fname'] . ',' .  $row['lname']   
    . ',' . $email . ',' .  $row['gender'] . ',' .  $row['phoneNum'] . ',' .  $row['dob']
    . ',' .  $row['cardName'] . ',' .  $row['cardNum']  . ',' .  $row['mExp']  
    . ',' .  $row['yExp']  . ',' .  $row['cvv'] . ',' . $row['balance'];
} else {
    $response ="err";
};
echo $response;
$stmt->close();
$conn->close();

?>