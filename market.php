<?php include_once "loadingListing.php" ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="market.js"></script>
    <link rel="stylesheet" href="market.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <title>Market</title>
</head>
<body>
    <section class="header">
        <h1>Discover</h1>
        <div class="right-top-nav">TradeX</div>
    </section>

    <section class="main">
      
        <div class="search">
            <input type="text" name="search" id ="search" placeholder="Search">
            <span class="material-symbols-outlined" id="icon-search">search</span>
        </div>

        <div id="result" class="hidden">
            <span class="material-symbols-outlined  close">expand_less</span>
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
            <div class="container">
                <h2>ENS</h2>
                <div class="neg">Ethereum Name Service</div>
            </div>
        </div>

        <div class="visible">
            <div class="container">
                <h2>Top lists</h2>
                <section class="selectors">
                    <button class="options">Most actively traded</button>
                    <button class="options">Top gainers</button>
                    <button class="options">Top loosers</button>
                    <button class="options">Your favarite</button>
                </section>
                
            </div>   
    
            <div class="container">
                <h3>Most actively traded</h3>
                <div class="box" id='0'>
                    <?php
                    loading($mostActivelyTraded,4);
                    ?>    
                </div>
                
                <p>More options <span class="material-symbols-outlined" id="mostActivelyTraded">arrow_forward</span></p>
            </div>
            <div class="container">
                <h3>Top Gainers</h3>
                <div class="box" id ='1'>
                    <?php
                    loading($topGainers,4);
                    ?>    
                </div>
                
                <p>More options <span class="material-symbols-outlined" id="topGainers">arrow_forward</span></p>
            </div>
            <div class="container">
                <h3>Top Losers</h3>
                <div class="box" id='2'>
                    <?php
                    loading($topLosers,4);
                    ?>    
                </div>
                
                <p>More options <span class="material-symbols-outlined" id="topLosers">arrow_forward</span></p>
            </div>
        
    
    
          
        
    </section>
    
    <section class="nav">
        <span class="profile material-symbols-outlined inactive">person</span>
        <span class="trend material-symbols-outlined">query_stats</span>
        <span class="setting material-symbols-outlined inactive">settings</span>
    </section>
    
</body>
</html>