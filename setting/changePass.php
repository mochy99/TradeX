<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <link rel="stylesheet" href="personalInf.css">
    <title>Discover</title>
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
            <span class="length">Must contain at least 8 characters</span>
            <span class="uppercase">Must contain at least 1 uppercase</span>
            <span class="lowercase">Must contain at least 1 lowercase</span>
            <span class="digit">Must contain at least 1 number</span>
            <span class="special">Must contain at least 1 special character ~`!@#$%^&*()-_+={}[]|\;:"<>,./?</span>
        </div>
        <button class="submit pending" id="submit">Submit</button>
       
        
    </section>
    <script src="changePass.js"></script>
</body>
</html>