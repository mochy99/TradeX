<?php
include_once "../server/userInf+.php";
include_once "../template/head.php"; 
?>
    <script src="../js/helper.js"></script>
    <script src="../js/changePass.js"></script>
    <link rel="stylesheet" href="../css/personalInf.css">
    <title>Security</title>
</head>
<body>
    <section class="header">
        <div class="material-symbols-outlined" id="exit">arrow_left_alt</div>
        <h1>Change Password</h1>
        <div></div>
    </section>

    <section class="main">      
        

        <div class="container">
            <h2>Current Password</h2>
            <div class="box">
                <label for="oldPass">Old Password</label>
                <input type="password" name="oldPass" id="oldPass" placeholder="********">
                <div class="errorMsg-old neg"></div>
            </div>
            <div class="box2">
                <input type="checkbox" name="showOld" id="showOld" value ="show">
                <label for="showOld">Show password</label>
            </div>
            
        </div>

        <div class="container">
            <h2>Update your password</h2>
            
            <div class="box">
                <label for="newPass">New password</label>
                <input type="password" name="newPass" id="newPass" placeholder="********" disabled>
                <div class="errorMsg-new neg"></div>
            </div>
            <div class="box">
                <label for="confirmPass">Confirm password</label>
                <input type="password" name="confirmPass" id="confirmPass" placeholder="********" disabled>
                <div class="errorMsg-confirm neg"></div>
            </div>
            <div class="box2">
                <input type="checkbox" name="showNew" id="showNew" value ="show">
                <label for="showNew">Show password</label>
            </div>
            <span id="length">Must contain at least 8 characters</span>
            <span id="uppercase">Must contain at least 1 uppercase</span>
            <span id="lowercase">Must contain at least 1 lowercase</span>
            <span id="digit">Must contain at least 1 number</span>
            <span id="special">Must contain at least 1 special character ~`!@#$%^&*()-_+={}[]|\;:"<>,./?</span>
        </div>
        <button class="submit pending" id="submit">Submit</button>
       
        
    </section>
    
</body>
</html>