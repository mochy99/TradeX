<?php
include_once "../server/userInf+.php";
include_once "../template/head+.php"; 
?>
    <script src="../js/helper.js"></script>
    <script src="../js/item.js"></script>
    <link rel="stylesheet" href="../css/item.css">
    <title><?php echo $_SESSION['symbol']; 
    ?></title>
</head>
<body>
    <section class="header">
        <h1 id="symbol"><?php echo $_SESSION['symbol']; ?></h1>
        <div class="left-top-nav material-symbols-outlined" id="back">arrow_left_alt</div>
    </section>
    <section class="main">
        <section class="summary">
            <section class="figure">
                <h2 id='price'><?php echo $_SESSION["price"]; ?></h2>
                <h3><?php echo $_SESSION["percentage"]; ?></h3>
            </section>

            <section class="graphic highcharts-figure">
                <div class="graph" id ="graph">
                    
                </div>
                <div class="selectors">
                    <button class="time clicked" id ="day">D</button>
                    <button class="time unclicked" id ="month">M</button>
                    <button class="time unclicked"id ="year">Y</button>
                    <button class="time unclicked"id ="full">All</button>
                </div>   
            </section>

            <button class="add" id="add">Buy more</button>

        </section>

        <section class="myaccount">
            <h2>Stats</h2>
            <h3>Data is displayed by</h3>
            <div class="container">
                <div class="ratio">
                    <span>Bid</span>
                    <span class="pos">254.35</span>
                </div>
                <div class="ratio">
                    <span>Ask</span>
                    <span class="neg">254.35</span>
                </div>
                <div class="ratio">
                    <span>Last Sale</span>
                    <span class="pos">254.35</span>
                </div>
                <div class="ratio">
                    <span>Open</span>
                    <span class="neg">254.35</span>
                </div>
                <div class="ratio">
                    <span>High</span>
                    <span class="neg">254.35</span>
                </div>
                <div class="ratio">
                    <span>Low</span>
                    <span class="pos">254.35</span>
                </div>
                <div class="ratio">
                    <span>Exchange</span>
                    <span class="neg">254.35</span>
                </div>
                <div class="ratio">
                    <span>Mkt cap</span>
                    <span class="pos">254.35</span>
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