<?php
include_once "../server/userInf+.php";
include_once "../template/head.php"; 
?>
    <script src="../js/deposit.js"></script>
    <script src="../js/helper.js"></script>
    <link rel="stylesheet" href="../css/deposit.css">
    <title>Withdraw</title>
</head>
<body>
    <section class="header">
        <div class="material-symbols-outlined" id="exit">arrow_left_alt</div>
        <h1>Withdraw</h1>
        <div></div>
    </section>

    <section class="main">      
        <div class="container">
            <h1>Account Information</h1>
            <?php include_once '../template/currentBalance.php'; ?>
            
            <div>Select amount to withdraw</div>
            <input type="text" name="money" id="money">
            <div class="error-money neg"></div>
    
            <div class="box2">
               <input type="button" value="100" id="100">
               <input type="button" value="500" id="500">
               <input type="button" value="1000" id="1000">
               <input type="button" value="2000" id="2000">
               <input type="button" value="5000" id="5000">
            </div>

            <div class="box">
                <input type="text"  required="required" name="recipientName" id="recipientName"
                    placeholder="Recipient's name">
                <div class="neg" id="error-name"></div>

                <input type="text" inputmode="numeric"  type="button" 
                    placeholder="Account number" required="required" id="accountNum" name="accountNum">
                <div class="neg" id="error-account"></div>
                
                <div class="box2">
                    <input type="text" inputmode="numeric"  type="button" 
                    placeholder="Institution number" required="required" id="institutionNumber" name="InstitutionNumber">
                    <input type="text" inputmode="numeric"  pattern="\d*" 
                    placeholder="Transit number" required="required" id="transitNum" name="transitNum">
                </div>

                <div class="box2 error">
                    <div class="neg" id="error-institution"></div>
                    <div class="neg" id="error-transit"></div>
                </div>

            </div>
        </div>

        <button class="submit pending" id="withdraw">Withdraw</button>
    </section>

    <?php include_once "../template/notice.php"?>
    
</body>
</html>