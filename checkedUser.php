<?php
// error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
require 'config.php';
?>
<?php
function validateLogin() {
    $email = $_POST["email"];
    $password = $_POST["password"];
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
            header("Location: mainPage.php");
            exit;
        } else {
            $_SESSION["errorMsg"] =   "*Incorrect username or password";
            $_SESSION["isAttemptedLogIn"] = true;
            header("Location: login.php");
            exit;
        }
    } else {
        $_SESSION["errorMsg"] =   "*Incorrect username or password";
        $_SESSION["isAttemptedLogIn"] = true;
        header("Location: login.php");
        exit;
    }

    $stmt->close();
    $conn->close();
}




    // if ($user !== "hello@gmail.com") {
    //     $getPassword = false; // if email does not exist in DB
    // } else {
    //     $getPassword = "@Hello123"; // password retrieved from DB    
    // }
    
    // if (!$getPassword) {
    //     $_SESSION["errorMsg"] = "Incorrect username or password.";
    //     $_SESSION["isAttemptedLogIn"] = true;
    //     header("Location: login.php");
    //     exit;
    // } else {
    //     // Retrieve password from the database
    //     // For example purposes, assigning a static password
    //     $_SESSION["errorMsg"] = "";
    //     $password_DB = "@Hello123";
    //     $password_Page = $_POST["password"];
        
    //     if ($password_DB === $password_Page) {
    //         header("Location: landingPage.php");
    //         exit;
    //     } else {
    //         $_SESSION["errorMsg"] = "Incorrect username or password.";
    //         $_SESSION["isAttemptedLogIn"] = true;
    //         header("Location: login.php");
    //         exit;
    //     }
    // }


validateLogin();
?>