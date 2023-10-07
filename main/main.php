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
            </section>

            <section class="graphic highcharts-figure">
                <div class="graph" id="graph">
                    We could not load the graph at this time. Check back soon.
                </div>
                  
            </section>

            <button id="add">Add investment</button>
        </section>

        <section class="myaccount">
            <h2>My accounts</h2>
            <h2 id="asset">0%</h2>
            <div  id="portfolio">
            </div>    
        </section>
        <section class="blank"></section>
    </section>
    
    <?php include_once "../template/footer.php" ?>