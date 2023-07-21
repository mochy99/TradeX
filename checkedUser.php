<?php
// error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
?>
<?php
function validateLogin() {
    // Code here to retrieve password from the database based on user input
    $user = $_POST["email"];
    // SQL query and database operations here
    if ($user !== "hello@gmail.com") {
        $getPassword = false; // if email does not exist in DB
    } else {
        $getPassword = "@Hello123"; // password retrieved from DB    
    }
    
    if (!$getPassword) {
        $_SESSION["errorMsg"] = "Incorrect username or password.";
        $_SESSION["isAttemptedLogIn"] = true;
        header("Location: login.php");
        exit;
    } else {
        // Retrieve password from the database
        // For example purposes, assigning a static password
        $_SESSION["errorMsg"] = "";
        $password_DB = "@Hello123";
        $password_Page = $_POST["password"];
        
        if ($password_DB === $password_Page) {
            header("Location: landingPage.php");
            exit;
        } else {
            $_SESSION["errorMsg"] = "Incorrect username or password.";
            $_SESSION["isAttemptedLogIn"] = true;
            header("Location: login.php");
            exit;
        }
    }
}

validateLogin();
?>