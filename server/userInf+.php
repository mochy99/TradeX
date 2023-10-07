<?php
include_once "../template/error.php";
require "../template/session.php";
require '../template/config.php';
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
$stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
$stmt->bind_param("s", $email);

// Execute the query
$stmt->execute();

// Get the result
$result = $stmt->get_result();
    
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();;
};

$stmt->close();
$conn->close();
?>