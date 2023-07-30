<?php
// error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// start new session
session_start();

require 'config.php';
?>

<?php
//function to validate that the email is registered or not from database

function isUsed() {
    $email = test_input($_POST["email"]);

    // Create connection
    $conn = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the SQL statement with a placeholder (?)
    $sql = "SELECT email FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);

    // Bind the email value to the placeholder
    $stmt->bind_param("s", $email);

    // Execute the query
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    // Check if the email is already registered
    if ($result->num_rows > 0) {
        $_SESSION["email"] = $email;
        $_SESSION["registeredMsg"] = "*Your email is already registered!";
        header("Location: signup.php");
        exit;
    } else {
        $_SESSION["email"] = $email;
        $_SESSION["registeredMsg"] = "";
        header("Location: nextsignup.php");
        exit;
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}


    // if ($email === "hello@world.com") {
    //     // execute code for the registered email
    //     $_SESSION["email"] = $email;
    //     $_SESSION["registeredMsg"] = "*Your email is already registered!";
    //     header("Location: signup.php");
    //     exit;
    // } else {
    //     // execute code for a new email
    //     $_SESSION["email"] = $email;
    //     $_SESSION["registeredMsg"] = "";
    //     header("Location: nextsignup.php");
    //     exit;
    // }
isUsed();
function test_input($data) {
    $data = trim($data);
    return $data;
}
?>