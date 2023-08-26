<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="market.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <link rel="stylesheet" href="market.css">
    <title>Market</title>
</head>
<body>
    <section class="header">
        <h1>Discover</h1>
        <div class="right-top-nav">TradeX</div>
    </section>

    <section class="main">
      
        <div class="box">
            <input type="text" name="search" id="keyword" placeholder="Search">
            <span class="material-symbols-outlined" id="search">search</span>
        </div>

        <div id="result" class="hidden">
            <span class="material-symbols-outlined  close">expand_less</span>
            <div class="container">
                <h2>ENS</h2>
                <div class="right">Equity</div>
                <div class="neg">Ethereum Name Service</div>
            </div>
            <div class="container">
                <h2>ENS</h2>
                <div class="neg">Ethereum Name Service</div>
            </div>
            <div class="container">
                <h2>ENS</h2>
                <div class="neg">Ethereum Name Service</div>
            </div>
            <div class="container">
                <h2>ENS</h2>
                <div class="neg">Ethereum Name Service</div>
            </div>
            <div class="container">
                <h2>ENS</h2>
                <div class="neg">Ethereum Name Service</div>
            </div>
        </div>

        <div id ="topList" class="visible"> 
    
            <div class="container">
                <h3>Most actively traded</h3>
                <div class="box" id='0'></div>
                
                <p id="mostActivelyTraded">More options <span class="material-symbols-outlined" >arrow_forward</span></p>
            </div>
            <div class="container">
                <h3>Top Gainers</h3>
                <div class="box" id ='1'></div>
                
                <p id="topGainers">More options <span class="material-symbols-outlined" >arrow_forward</span></p>
            </div>
            <div class="container">
                <h3>Top Losers</h3>
                <div class="box" id='2'></div>
                
                <p id="topLosers">More options <span class="material-symbols-outlined" >arrow_forward</span></p> 
            </div>   
    </section>
    
    <?php include_once "../template/footer.php" ?>