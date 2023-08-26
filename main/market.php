<?php
include_once "../template/error.php";
include_once "../template/session.php";
include_once "../template/head.php"; 
?>
    <script src="../js/market.js"></script>
    <link rel="stylesheet" href="../css/market.css">
    <title>Discover</title>
</head>
<body>
    <section class="header">
        <h1>Discover</h1>
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