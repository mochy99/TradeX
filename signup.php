<?php
// error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// start new session
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="signup.css">
    <title>Sign up TradeX</title>
</head>
<body>
    <div class="container">
        <h1>TradeX</h1>
        <h3>What's your mail address?</h3>
        <form action="checkEmail.php" method="post">
            <div class="box1">
            <input type="text" name="email" id="email" placeholder="me@email.com">
            </div>

            <span class="error">
                <?php
                 echo isset($_SESSION["registeredMsg"]) ? $_SESSION["registeredMsg"] : "";
                ?>
            </span>
            <span class="inf">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Assumenda cupiditate excepturi explicabo enim sunt aliquam atque, corporis, 
                doloribus nam!</span>
            <input type="submit" value="Continue" class="button">
    
        </form>
    </div>
    
    <script src="signup.js"></script>

</body>
</html>