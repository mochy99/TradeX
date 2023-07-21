<?php
// error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// start new session
session_start();
?>

<?php
//function to validate that the email is registered or not from database

function isUsed () {
    $email = test_input($_POST["email"]);
    if ($email === "hello@world.com") {
        // execute code for the registered email
        $_SESSION["email"] = $email;
        $_SESSION["registeredMsg"] = "*Your email is already registered!";
        header("Location: signup.php");
        exit;
    } else {
        // execute code for a new email
        $_SESSION["email"] = $email;
        $_SESSION["registeredMsg"] = "";
        header("Location: nextsignup.php");
        exit;
    }
}
isUsed();
function test_input($data) {
    $data = trim($data);
    return $data;
}
?>