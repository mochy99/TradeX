<?php
include_once "../template/error.php";
include_once "../template/session.php";
require '../template/config.php';
?>

<?php
$email = $_SESSION['email'];
$password = test_input($_POST["password"]);
$login = $_POST['login'];
// Create connection
$conn =  new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " .$conn->connect_error);
}

if (isset($login)) {
    $stmt = $conn->prepare("UPDATE users SET password=? WHERE email=?");
    $stmt->bind_param("ss", $password, $email);
   
    $stmt->execute();
   
    $stmt->close();
    $conn->close();
   
    echo $response = "Your password was changed!";
} else {
    $stmt = $conn->prepare("INSERT INTO users (email, password) VALUE (?,?)");
    $stmt->bind_param("ss", $email, $password);

    $stmt->execute();

    $stmt->close();
    $conn->close();
   
    header("Location:../main/main.php");
    exit;
}

// Trim data from js
function test_input($data) {
    $data = trim($data);
    return $data;
}
?>