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
        <h3>
            <?php echo "User: " . $_SESSION["email"] ; ?>
        </h3>
        <form action="savePassWord.php" method="post">
            <div class="box1">
                <input type="password" name="password" id="password" placeholder="Password" required> 
                <input type="password" name="repeat" id="repeat" placeholder="Confirm password" required>   
            </div>
            <div class="box2">
                <input type="checkbox" name="show" id="show" value ="show">
                <label for="show">Show password</label>
            </div>
            <span class="error"></span>
            <span class="length">Must contain at least 8 characters</span>
            <span class="uppercase">Must contain at least 1 uppercase</span>
            <span class="lowercase">Must contain at least 1 lowercase</span>
            <span class="digit">Must contain at least 1 number</span>
            <span class="special">Must contain at least 1 special character ~`!@#$%^&*()-_+={}[]|\;:"<>,./?</span>
            <input type="submit" value="Continue" class="button"> 
        </form>
    </div>
    
    <script src="nextsignup.js"></script>

</body>
</html>