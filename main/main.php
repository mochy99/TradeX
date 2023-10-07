<?php
include_once "../template/error.php";
include_once "../template/session.php";
?>
<?php include_once "../template/head+.php"; ?>
    <script src="../js/main.js"></script>
    <link rel="stylesheet" href="../css/main.css">
    <title>Trade Now</title>
</head>
<body>
    <section class="header">
        <h1>Profile</h1>
        <div class="right-top-nav">
            <?php echo $_SESSION["email"];?>
        </div>
    </section>
    <section class="main">
        <section class="summary">
            <section class="figure">
                <h2 id="balance">$0.00</h2>
                <h3 id="asset">0%</h3>
            </section>

            <section class="graphic highcharts-figure">
                <div class="graph" id="graph">
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

            <button class="add">Add investment</button>
        </section>

        <section class="myaccount">
            <h2>My accounts</h2>
            <div  id="portfolio">   
            </div>    
        </section>
        <section class="blank"></section>
    </section>
    
    <?php include_once "../template/footer.php" ?>