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

            <span class="inf">This is a simulation application where you can experiment with a fictitious email and without providing real credit information to understand how the app functions.</span>
            <input type="submit" value="Continue" class="button">    
        </form>
    </div>
</body>
</html>