<?php
include_once "../server/userInf+.php";
include_once "../template/head.php"; 
?>
    <script src="../js/personalInf.js"></script>
    <script src="../js/helper.js"></script>
    <link rel="stylesheet" href="../css/personalInf.css">
    <title>Information</title>
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
                <label for="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" disabled
                value= <?php echo isset($user['fname']) ? $user['fname'] : ""; ?> >
                <div class="errorMsg-fName neg"></div>
            </div>
            <div class="box">
                <label for="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" disabled
                value= <?php echo isset($user['lname']) ? $user['lname'] : ""; ?>>
                <div class="errorMsg-lName neg"></div>
            </div>
            <div class="box">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" disabled
                value= <?php echo $_SESSION['email']; ?>>
                <div></div>
            </div>
            
        </div>

        <div class="container">
            <h2>Additional information</h2>
            <div class="box">
                <label for="gender">Gender</label>
                <select name="gender" id="gender" disabled>
                    <option value=""></option>
                    <option value="male" <?php echo isset($user['gender']) && $user['gender'] === 'male' ? 'selected' : ''; ?>>Male</option>
                    <option value="female" <?php echo isset($user['gender']) && $user['gender'] === 'female' ? 'selected' : ''; ?>>Female</option>
                    <option value="others" <?php echo isset($user['gender']) && $user['gender'] === 'others' ? 'selected' : ''; ?>>Others</option>
                </select>
                <div></div>
            </div>

            <div class="box">
                <label for="phoneNumber">Phone Number</label>
                <input type="tel" name="phoneNumber" id="phoneNumber" disabled
                value= <?php echo isset($user['phoneNum']) ? $user['phoneNum'] : ""; ?>>
                <div class="errorMsg-phone neg"></div>
            </div>
            <div class="box">
                <label for="dob">Date of Birth</label>
                <input type="text" name="dob" id="dob" placeholder="YYYY-MM-DD" disabled
                value= <?php echo (isset($user['dob']) && !($user['dob'] === "0000-00-00")) ? $user['dob'] : ""; ?> >
                <div class="errorMsg-dob neg"></div>
            </div>
            
        </div>   
    </section>
</body>
</html>