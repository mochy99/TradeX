<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="js/deposit.js"></script>
    <script src="js/helper.js"></script>
    <link rel="stylesheet" href="deposit.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <title>Discover</title>
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

    <section class="container notice hidden">
            
        <h1 class="status dark-font">Processing</h1>
        <div class="material-symbols-outlined" id="status-icon">more_horiz</div>
      
        <div class="box3 hidden"> 
            <span class="bold">Your balance</span>
            <span class="bold" id="balance"></span>
        </div>
        <div class="box3 hidden"> 
            <span class="dark-font">Transaction Number</span> 
            <span class="darker-font" id="transactionNumber"></span> 
        </div>
        
        <div class="box3 hidden"> 
            <span class="dark-font" id="bankInf">Card number</span>
            <span class ='darker-font'id="usedCardNumber"></span>
        </div>
       
        
        <button class="material-symbols-outlined close">close</button>
    </section>
    
</body>
</html>