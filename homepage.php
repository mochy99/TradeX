<?php
// error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
session_destroy();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="homepage.css">
    <title>TradeX</title>
</head>
<body>
    <div class="container">
        <h1>TradeX</h1>
        <section class="animation">
            <div class="description">Welcome to our cutting-edge trading platform, 
                where you can unlock endless possibilities in the financial markets.
            </div>
        </section>
        <section class="btns">
            <button class="signup">Sign up</button>
            <button class="login">Log in</button>
        </section>
    </div>
    <script src="homepage.js"></script>
</body>
</html>