<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="js/helper.js"></script>
    <script src="js/deposit.js"></script>
    <link rel="stylesheet" href="deposit.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <title>Discover</title>
</head>
<body>
    <section class="header">
        <div class="material-symbols-outlined" id="exit">arrow_left_alt</div>
        <h1>Deposit</h1>
        <div></div>
    </section>

    <section class="main">      
        

        <div class="container">
       
            <div>Select amount to deposit</div>
            <input type="text" name="money" id="money">
            <div class="error-money neg"></div>
    
            
            <div class="box2">
               <input type="button" value="100" id="100">
               <input type="button" value="500" id="500">
               <input type="button" value="1000" id="1000">
               <input type="button" value="2000" id="2000">
               <input type="button" value="5000" id="5000">
            </div>
            
        </div>

        <div class="container">
            <h2>Account Information</h2>
            
            <div class="box">
                <div class="box2">
                    <input type="text" name="fname" placeholder="First Name" id="fname">
                    <input type="text" name="lname" placeholder="Last Name" id="lname">
                </div>
                <div class="box2">
                    <div class="error-fName neg"></div>
                    <div class="error-lName neg"></div>
                </div>
                <input type="email" name="email" id="email" disabled>
            </div>

            <div class="box">
                <input type="text" type="button"  required="required" name="name" id="name"
                    placeholder="Cardholder's name">
                <div class="error-name neg"></div>
                <input type="text" inputmode="numeric"  type="button" 
                    placeholder="**** **** **** ****" required="required" id="number" name="number">
                <div class="error-number neg"></div>
                <div class="box2">
                    <select name="month" id="expiryMonth" placeholder="MM">
                        <option value="1">01</option>
                        <option value="2">02</option>
                        <option value="3">03</option>
                        <option value="4">04</option>
                        <option value="5">05</option>
                        <option value="6">06</option>
                        <option value="7">07</option>
                        <option value="8">08</option>
                        <option value="9">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    <select name="year" id="expiryYear">
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                        <option value="2031">2031</option>
                        <option value="2032">2032</option>
                        <option value="2033">2033</option>
                        <option value="2034">2034</option>
                        <option value="2035">2035</option>
                        <option value="2036">2036</option>
                        <option value="2037">2037</option>
                        <option value="2038">2038</option>
                        <option value="2039">2039</option>
                        <option value="2040">2040</option>
                        <option value="2041">2041</option>
                        <option value="2042">2042</option>
                        <option value="2043">2043</option>
                    </select>
                    <input type="text" inputmode="numeric"  pattern="\d*" 
                        required="required" id="cvv" name="cvv" placeholder="***">
                </div>
                <div class="box2 error">
                    <div></div>
                    <div></div>
                    <div class="error-cvv neg"></div>
                </div>

            </div>

  
            <div class="box2">
                <input type="checkbox" name="save" id="save">
                <label for="save">Save card details for my next payment</label>
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

    <section class="container notice hidden">
            
        <h1 class="status dark-font">Processing</h1>
        <div class="material-symbols-outlined" id="status-icon">more_horiz</div>
      
        <div class="box3 hidden"> 
            <h2 class="bold">Your balance</h2>
            <div class="bold" id="balance"></div>
        </div>
        <div class="box3 hidden"> 
            <div class="dark-font">Transaction Number</div> 
            <div class="darker-font" id="transactionNumber"></div> 
        </div>
        
        <div class="box3 hidden"> 
            <div class="dark-font">Your card</div>
            <div class ='darker-font'id="usedCardNumber"></div>
        </div>
       
        
        <button class="material-symbols-outlined close">close</button>
    </section>
    
</body>
</html>