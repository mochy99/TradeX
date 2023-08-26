<?php
include_once "../template/error.php";
include_once "../template/session.php";
?>
<?php include_once "../template/head.php"; ?>
    <script src="../js/setting.js"></script>
    <link rel="stylesheet" href="../css/setting.css">
    <title>Setting</title>
</head>
<body>
    <section class="header">
        <h1>Profile and settings</h1>
    </section>

    <section class="main">
        

        <div>
            <div class="container" id="inf">
                <h2>Personal Information</h2>
                <span class="material-symbols-outlined">
                    arrow_forward_ios
                </span>
                    
            </div>

            <div class="container" id="sercurity">
                <h2>Change password</h2>
                <span class="material-symbols-outlined">
                    arrow_forward_ios
                </span>
            </div>

            <div class="container" id="deposit">
                <h2>Deposit</h2>
                <span class="material-symbols-outlined">
                    arrow_forward_ios
                </span>
            </div>

            <div class="container" id="withdraw">
                <h2>Withdraw</h2>
                <span class="material-symbols-outlined">
                    arrow_forward_ios
                </span>
            </div>

            <button id="logout">Log out</button>    
        </div>

<?php include_once "../template/footer.php" ?>