<?php 
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="https://code.highcharts.com/stock/highstock.js"></script>
    <script src="https://code.highcharts.com/stock/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/stock/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/stock/modules/accessibility.js"></script>
    <script src="item.js"></script>
    <link rel="stylesheet" href="item.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <title><?php echo $_SESSION['symbol']; ?></title>
</head>
<body>
    <section class="header">
        <h1><?php echo $_SESSION['symbol']; ?></h1>
        <div class="left-top-nav material-symbols-outlined" id="back">arrow_left_alt</div>
    </section>
    <section class="main">
        <section class="summary">
            <section class="figure">
                <h2 class="profit">$<?php echo $_SESSION["price"]; ?></h2>
                <h3 class="precent"><?php echo $_SESSION["price"]; ?></h3>
            </section>

            <section class="graphic">
                <div class="graph" id ="graph">
                    We could not load the graph at this time. Check back soon.
                </div>
                <div class="selectors">
                    <button class="time day">D</button>
                    <button class="time month">M</button>
                    <button class="time quarter">Q</button>
                    <button class="time year">Y</button>
                    <button class="time all">All</button>
                </div>   
            </section>

            <button class="add">Buy more</button>

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
    
</body>
</html>