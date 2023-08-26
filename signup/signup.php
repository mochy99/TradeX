<?php
include_once "../template/error.php";

// start new session
session_start();
?>


<?php include_once "../template/head.php"?>
    <script src="../js/signup.js"></script>
    <link rel="stylesheet" href="../css/signup.css">
    <title>Sign up TradeX</title>
</head>
<body>
    <div class="container">
        <h1>TradeX</h1>
        <h3>What's your mail address?</h3>
        <form action="../server/checkRegisteredEmail.php" method="post">

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
</body>
</html>