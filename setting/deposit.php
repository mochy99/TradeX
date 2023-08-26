<?php
include_once "../server/userInf+.php";
include_once "../template/head.php"; 
?>
    <script src="../js/helper.js"></script>
    <script src="../js/deposit.js"></script>
    <link rel="stylesheet" href="../css/deposit.css">
    <title>Deposit</title>
</head>
<body>
    <section class="header">
        <div class="material-symbols-outlined" id="exit">arrow_left_alt</div>
        <h1>Deposit</h1>
        <div></div>
    </section>

    <section class="main">      
        <?php 
        include_once '../template/currentBalance.php';
        include_once '../template/selectMoney.php';
        ?>

        <div class="container">
            <h2>Account Information</h2>

            <div class="box">
                <input type="text" type="button"  required="required" name="name" id="name"
                    placeholder="Cardholder's name" value= <?php echo isset($user['cardName']) ? $user['cardName'] : ""; ?> >
                <div class="error-name neg"></div>
                <input type="text" inputmode="numeric"  type="button" 
                    placeholder="**** **** **** ****" required="required" id="number" name="number"
                    value= <?php echo isset($user['cardNum']) ? $user['cardNum'] : ""; ?> >
                <div class="error-number neg"></div>
                <div class="box2">
                    <select name="month" id="expiryMonth" placeholder="MM">
                        <option value="1"<?php echo isset($user['mExp']) && $user['mExp'] === '1' ? ' selected' : ''; ?>>01</option>
                        <option value="2"<?php echo isset($user['mExp']) && $user['mExp'] === '2' ? ' selected' : ''; ?>>02</option>
                        <option value="3"<?php echo isset($user['mExp']) && $user['mExp'] === '3' ? ' selected' : ''; ?>>03</option>
                        <option value="4"<?php echo isset($user['mExp']) && $user['mExp'] === '4' ? ' selected' : ''; ?>>04</option>
                        <option value="5"<?php echo isset($user['mExp']) && $user['mExp'] === '5' ? ' selected' : ''; ?>>05</option>
                        <option value="6"<?php echo isset($user['mExp']) && $user['mExp'] === '6' ? ' selected' : ''; ?>>06</option>
                        <option value="7"<?php echo isset($user['mExp']) && $user['mExp'] === '7' ? ' selected' : ''; ?>>07</option>
                        <option value="8"<?php echo isset($user['mExp']) && $user['mExp'] === '8' ? ' selected' : ''; ?>>08</option>
                        <option value="9"<?php echo isset($user['mExp']) && $user['mExp'] === '9' ? ' selected' : ''; ?>>09</option>
                        <option value="10"<?php echo isset($user['mExp']) && $user['mExp'] === '10' ? ' selected' : ''; ?>>10</option>
                        <option value="11"<?php echo isset($user['mExp']) && $user['mExp'] === '11' ? ' selected' : ''; ?>>11</option>
                        <option value="12"<?php echo isset($user['mExp']) && $user['mExp'] === '12' ? ' selected' : ''; ?>>12</option>
                    </select>
                    <select name="year" id="expiryYear">
                        <option value="2023"<?php echo isset($user['yExp']) && $user['yExp'] === '2023' ? ' selected' : ''; ?>>2023</option>
                        <option value="2024"<?php echo isset($user['yExp']) && $user['yExp'] === '2024' ? ' selected' : ''; ?>>2024</option>
                        <option value="2025"<?php echo isset($user['yExp']) && $user['yExp'] === '2025' ? ' selected' : ''; ?>>2025</option>
                        <option value="2026"<?php echo isset($user['yExp']) && $user['yExp'] === '2026' ? ' selected' : ''; ?>>2026</option>
                        <option value="2027"<?php echo isset($user['yExp']) && $user['yExp'] === '2027' ? ' selected' : ''; ?>>2027</option>
                        <option value="2028"<?php echo isset($user['yExp']) && $user['yExp'] === '2028' ? ' selected' : ''; ?>>2028</option>
                        <option value="2029"<?php echo isset($user['yExp']) && $user['yExp'] === '2029' ? ' selected' : ''; ?>>2029</option>
                        <option value="2030"<?php echo isset($user['yExp']) && $user['yExp'] === '2030' ? ' selected' : ''; ?>>2030</option>
                        <option value="2031"<?php echo isset($user['yExp']) && $user['yExp'] === '2031' ? ' selected' : ''; ?>>2031</option>
                        <option value="2032"<?php echo isset($user['yExp']) && $user['yExp'] === '2032' ? ' selected' : ''; ?>>2032</option>
                        <option value="2033"<?php echo isset($user['yExp']) && $user['yExp'] === '2033' ? ' selected' : ''; ?>>2033</option>
                        <option value="2034"<?php echo isset($user['yExp']) && $user['yExp'] === '2034' ? ' selected' : ''; ?>>2034</option>
                        <option value="2035"<?php echo isset($user['yExp']) && $user['yExp'] === '2035' ? ' selected' : ''; ?>>2035</option>
                        <option value="2036"<?php echo isset($user['yExp']) && $user['yExp'] === '2036' ? ' selected' : ''; ?>>2036</option>
                        <option value="2037"<?php echo isset($user['yExp']) && $user['yExp'] === '2037' ? ' selected' : ''; ?>>2037</option>
                        <option value="2038"<?php echo isset($user['yExp']) && $user['yExp'] === '2038' ? ' selected' : ''; ?>>2038</option>
                        <option value="2039"<?php echo isset($user['yExp']) && $user['yExp'] === '2039' ? ' selected' : ''; ?>>2039</option>
                        <option value="2040"<?php echo isset($user['yExp']) && $user['yExp'] === '2040' ? ' selected' : ''; ?>>2040</option>
                        <option value="2041"<?php echo isset($user['yExp']) && $user['yExp'] === '2041' ? ' selected' : ''; ?>>2041</option>
                        <option value="2042"<?php echo isset($user['yExp']) && $user['yExp'] === '2042' ? ' selected' : ''; ?>>2042</option>
                        <option value="2043"<?php echo isset($user['yExp']) && $user['yExp'] === '2043' ? ' selected' : ''; ?>>2043</option>
                    </select>
                    <input type="text" inputmode="numeric"  pattern="\d*" 
                        required="required" id="cvv" name="cvv" placeholder="***"
                        value= <?php echo isset($user['cvv']) ? $user['cvv'] : ""; ?>>
                </div>
                <div class="box2 error">
                    <div></div>
                    <div></div>
                    <div class="error-cvv neg"></div>
                </div>

            </div>

  
            <div class="box2">
                <input type="checkbox" name="save" id="save">
                <label for="save">Save card details</label>
            </div>

            <div class="box2">
                <input type="checkbox" name="policy" id="policy" required="required">
                <label for="policy">I agree to the 
                    <a href="#">Terms & Conditions</a>
                    and the 
                    <a href="#">Privacy Policy.</a>
                </label>
            </div>         
        </div>

        <button class="submit pending" id="deposit">Deposit</button>
    </section>

    <?php include_once '../template/notice.php'; ?>
    
</body>
</html>