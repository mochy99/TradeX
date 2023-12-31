<?php
include_once "template/error.php"; 
session_start();
session_destroy();
?>
<?php include_once "template/head.php" ?>
<script src="js/index.js"></script>
<link rel="stylesheet" href="css/index.css">
<title>TradeX</title>
</head>
<body>
    <div class="container">
        <h1>TradeX</h1>
        <section class="animation">
            <div class="description">Welcome to our cutting-edge trading platform, 
                where you can unlock endless possibilities in the financial markets.
            </div>
            <div class="note">
                This is a simulation application where you can experiment with a fictitious email 
                and without providing real credit information to understand how the app functions.
            </div>
            <div class="note">
                For trial purpose, you can trial tester@gmail.com with password @Tester123
            </div>
        </section>
        <section class="btns">
            <button id="signup">Sign up</button>
            <button id="login">Log in</button>
        </section>
        
    </div>
    
</body>
</html>