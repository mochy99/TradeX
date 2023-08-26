<?php
include_once "../template/error.php";
session_start();
require '../template/config.php';
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
            $_SESSION["email"]= $email;
            header("Location: ../main/main.php");
            exit;
        } else {
            $_SESSION["errorMsg"] =   "*Incorrect username or password";
            $_SESSION["isAttemptedLogIn"] = true;
            header("Location: ../signup/login.php");
            exit;
        }
    } else {
        $_SESSION["errorMsg"] =   "*Incorrect username or password";
        $_SESSION["isAttemptedLogIn"] = true;
        header("Location: ../signup/login.php");
        exit;
    }

    $stmt->close();
    $conn->close();
}

validateLogin();
?>