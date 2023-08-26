<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <link rel="stylesheet" href="personalInf.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <title>Discover</title>
</head>
<body>
    <section class="header">
        <div class="material-symbols-outlined" id="exit">arrow_left_alt</div>
        <h1>Personal Information</h1>
        <button class="edit">
            <div class="material-symbols-outlined icon">
                edit
            </div> 
        </button>
    </section>

    <section class="main">      
        

        <div class="container">
            <h2>Personal Information</h2>
            <div class="box">
                <label for="userName">User Name</label>
                <i class="pos">The username can be used for logging in</i>
                <input type="text" name="userName" id="userName" disabled>
                <div class="errorMsg-userName neg"></div>
            </div>
            <div class="box">
                <label for="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" disabled>
                <div class="errorMsg-fName neg"></div>
            </div>
            <div class="box">
                <label for="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" disabled>
                <div class="errorMsg-lName neg"></div>
            </div>
            <div class="box">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" disabled>
                <div></div>
            </div>
            
        </div>

        <div class="container">
            <h2>Additional information</h2>
            <div class="box">
                <label for="gender">Gender</label>
                <select name="gender" id="gender" disabled>
                    <option value="male"></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                </select>
                <div></div>
            </div>
            <div class="box">
                <label for="phoneNumber">Phone Number</label>
                <input type="tel" name="phoneNumber" id="phoneNumber" disabled>
                <div class="errorMsg-phone neg"></div>
            </div>
            <div class="box">
                <label for="dob">Date of Birth</label>
                <input type="text" name="dob" id="dob" placeholder="YYYY-MM-DD" disabled>
                <div class="errorMsg-dob neg"></div>
            </div>
            
        </div>

       
        
    </section>
    <script src="personalInf.js"></script>
</body>
</html>