<?php
include_once "../template/error.php";
include_once "../template/session.php";
?>
<?php include_once "../template/head.php"; ?>
    <script src="../js/afterSignUp.js"></script>
    <link rel="stylesheet" href="../css/afterSignUp.css">
    <title>Sign up TradeX</title>
</head>
<body>
    <div class="container">
        <h1>TradeX</h1>
        <h3>
            <?php echo "User: " . $_SESSION["email"] ; ?>
        </h3>
        <form action="../server/updatePassword.php" method="post">
            <div class="box1">
                <input type="password" name="password" id="password" placeholder="Password" required> 
                <input type="password" name="repeat" id="repeat" placeholder="Confirm password" required>   
            </div>
            <div class="box2">
                <input type="checkbox" name="show" id="show" value ="show">
                <label for="show">Show password</label>
            </div>
            <span id="error"></span>
            <span id="length">Must contain at least 8 characters</span>
            <span id="uppercase">Must contain at least 1 uppercase</span>
            <span id="lowercase">Must contain at least 1 lowercase</span>
            <span id="digit">Must contain at least 1 number</span>
            <span id="special">Must contain at least 1 special character ~`!@#$%^&*()-_+={}[]|\;:"<>,./?</span>
            <input type="submit" value="Continue" class="button"> 
        </form>
    </div>
    
    

</body>
</html>