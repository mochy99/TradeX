<?php
// error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="nextsignup.css">
    <title>Sign up TradeX</title>
</head>
<body>
    <div class="container">
        <h1>TradeX</h1>
        <h3>Welcome back!</h3>
        <form action="checkedUser.php" method="post">
            <div class="box1">
                <input type="text" name="email" id="email" placeholder="me@gmail.com" required
                > 
                <input type="password" name="password" id="password" placeholder="Password" required>   
            </div>
            <div class="box2">
                <input type="checkbox" name="show" id="show" value ="show">
                <label for="show">Show password</label>
            </div>
            <span class="error">
                <?php
                if (isset($_SESSION["isAttemptedLogIn"])) {
                    $_SESSION["isAttemptedLogIn"] = false;
                    echo isset($_SESSION["errorMsg"]) ? $_SESSION["errorMsg"] : "";   
                }
                ?>
            </span>
            <input type="submit" value="Continue" class="button">
    
        </form>
    </div>
    
    <script src="login.js"></script>

</body>
</html>