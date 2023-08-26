<?php
include_once "../template/error.php";
session_start();
?>
<?php include_once "../template/head.php"; ?>
    <script src="../js/login.js"></script>
    <link rel="stylesheet" href="../css/afterSignUp.css">
    <title>Sign up TradeX</title>
</head>
<body>
    <div class="container">
        <h1>TradeX</h1>
        <h3>Welcome back!</h3>
        <form action="../server/validateUser.php" method="post">
            <div class="box1">
                <input type="text" name="email" id="email" placeholder="me@gmail.com" required
                > 
                <input type="password" name="password" id="password" placeholder="Password" required>   
            </div>
            <div class="box2">
                <input type="checkbox" name="show" id="show" value ="show">
                <label for="show">Show password</label>
            </div>
            <span id="error">
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
</body>
</html>