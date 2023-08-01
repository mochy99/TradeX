<?php
// error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
if (!isset($_SESSION["email"])) {
    header("Location: login.php");
     exit;
} 
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="mainPage.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
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
                <h2 class="profit">$0.00</h2>
                <h3 class="precent">0%</h3>
            </section>

            <section class="graphic">
                <div class="graph">
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
            <ul>
                <li>TSLA</li>
                <li>AAPL</li>
                <li>VFV</li>
                <li>AMC</li>
                <li>AC</li>
                <li>TSLA</li>
                <li>AAPL</li>
                <li>VFV</li>
                <li>AMC</li>

              </ul>
        </section>
        <section class="blank"></section>
    </section>
    
    <section class="nav">
        <span class="profile material-symbols-outlined">person</span>
        <span class="trend material-symbols-outlined inactive">query_stats</span>
        <span class="setting material-symbols-outlined inactive">settings</span>
    </section>
</body>
</html>