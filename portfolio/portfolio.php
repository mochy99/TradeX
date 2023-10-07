<?php
include_once "../server/userInf+.php";
include_once "../template/head+.php"; 
?>  
    <script src="../js/helper.js"></script>
    <script src="../js/portfolio.js"></script>
    <link rel="stylesheet" href="../css/item.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <title> <?php echo $_SESSION['symbol']; ?></title>
</head>
<body>
    <section class="header">
        <h1 id='symbol'><?php echo $_SESSION['symbol']; ?></h1>
        <div class="left-top-nav material-symbols-outlined" id="backMain">arrow_left_alt</div>
    </section>
    <section class="main">
        <section class="summary">
            <section class="figure">
                <h2 class="asset">$0.00</h2>
                <h3 class="quantity">0%</h3>
            </section>
                 <?php include_once "../template/chart.php"; ?>
            <button class="add" id ="add" >Buy more</button>
            <button class="add" id ="sell">Sell</button>

        </section>

        <section class="myaccount">
            <h2>Activity</h2>
            <div id="history">

            </div>
            
        </section>   
    </section>

    <section class="container hidden" id="buy">
        <h1>Account Information</h1>
        <?php include_once '../template/currentBalance.php'; ?>
        <div class="error neg"></div>
        <?php include_once '../template/selectMoney.php'; ?>

        <div>
            <div>Quantity</div>
            <input type="text" name="quantity" id="quantity">
            <div class="errorQuantity neg"></div>    
        </div>

        <button class="submit pending" id="submit">Buy</button>
        <button class="submit pending" id="cancel">Cancel</button>

    </section>
    <?php include_once '../template/notice.php'; ?>
    
</body>
</html>