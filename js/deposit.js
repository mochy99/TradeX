$(document).ready(function() {
    let money = $('#money');
    let hundredBtn = $('#100');
    let fiveHundredBtn = $('#500');
    let thousandBtn = $('#1000');
    let twoThousandBtn = $('#2000');
    let fiveThousandBtn = $('#5000');
    let fName = $('#fname');
    let lName = $('#lname');
    let nameCard = $('#name');
    let number = $('#number');
    let month = $('#expiryMonth');
    let year = $('#expiryYear');
    let cvvNum = $('#cvv');
    let cardNumberCopy;
    let policy = document.getElementById('policy');
    let save = document.getElementById('save');
    let errorMoney = $('.error-money');
    let errorNumber = $('.error-number');
    let errorFName = $('.error-fName');
    let errorLName = $('.error-lName');
    let errorName = $('.error-name');
    let errorCvv = $('.error-cvv');
    let deposit = $('#deposit');
    let currentBalance = $('#currentBalance');
    let accountNum = $('#accountNum');
    let recipientName = $('#recipientName');
    let institutionNum = $('#institutionNumber');
    let transitNum = $('#transitNum');
    let errorRecipientName = $('#error-name');
    let errorAccount = $('#error-account');
    let errorInstituiton = $('#error-institution');
    let errorTransit = $('#error-transit');
    let withdraw = $('#withdraw');
    
    if(number.val()){
        cardNumberCopy = number.val();
        let cardNum = "**** **** **** " + number.val().slice(12);
        number.val(cardNum);
    } 

    // Function when clicking the exit btn
    $('#exit').click(function() {
        window.location.href = '../main/setting.php';
    })

    // Validate the input of the money field.
    money.blur(function() {
        if (isInteger(money.val()) && money.val() > 0) {
            errorMoney.text('');
        } else {
            errorMoney.text('*Invalid input');
        }
    })

    // Handle the amount money button.
    hundredBtn.click(function(){
        money.val(hundredBtn.val());
        errorMoney.text('');
    })
    fiveHundredBtn.click(function(){
        money.val(fiveHundredBtn.val());
        errorMoney.text('');
    })
    thousandBtn.click(function(){
        money.val(thousandBtn.val());
        errorMoney.text('');
    })
    twoThousandBtn.click(function(){
        money.val(twoThousandBtn.val());
        errorMoney.text('');
    })
    fiveThousandBtn.click(function(){
        money.val(fiveThousandBtn.val());
        errorMoney.text('');
    })
    // Handle the name input
    fName.blur(function() {
        if (validatedName(fName.val())) {
            capitalize(fName);
            errorFName.text('');
        } else {
            errorFName.text('*Invalid input');
        }
    })
    lName.blur(function() {
        if (validatedName(lName.val())) {
            capitalize(lName);
            errorLName.text('');
        } else {
            errorLName.text('*Invalid input');
        }
    })
    nameCard.blur(function() {
        if (validatedName(nameCard.val())) {
            capitalize(nameCard);
            errorName.text('');
        } else {
            errorName.text('*Invalid input');
        }
    })
    recipientName.blur(function() {
        if (validatedName(recipientName.val())) {
            capitalize(recipientName);
            errorRecipientName.text('');
        } else {
            errorRecipientName.text('*Invalid input');
        }
    })
    
    // Display the card number when keyup fires.
    number.keyup(function (eve) {
        let value = number.val();
        let string = value.replace(/\s+/g, "");
        let length = string.length;
        let moment = length % 4;
        let spacedString;
        if (eve.key === "Backspace") {
            let string = number.val().trim();
            number.val(string);
        } else if (moment === 1) {
            spacedString = value.slice(0, (value.length -1)) + " " + value.slice((value.length -1), value.length);
            spacedString = spacedString.trim();
            number.val(spacedString);
        }
    })

    // Event handler when blurring the card number input.
    number.blur(function() {
        if (validateCardNum(number.val()) && number.val()) {
            //Display the card number when it is valid
            cardNumberCopy = number.val().replace(/\s+/g, "");
            let value = "**** **** **** " + cardNumberCopy.slice(12);
            number.val(value);
            errorNumber.text('');
        } else {
            errorNumber.text('*Invalid card number');
        }   
    })

    // Event handler when mouseenter the card number input.
    number.click(function() {
        number.val('');
    })
    
    // Handle to change submit btn color when all fiels are valid
   $('.main').click(function () {
        if (validDepositForm()) {
            deposit.removeClass('pending');
        } else {
            deposit.addClass('pending');
        }
        if (validWithdrawForm()) {
            withdraw.removeClass('pending');
        } else {
            withdraw.addClass('pending');
        }
    })

    // // Function handle deposit btn
    deposit.click(function() {
        console.log(validDepositForm());
        if (validDepositForm()) {
            let dataInf = new Array;
            dataInf.push('deposit');
            dataInf.push(save.checked);
            dataInf.push(parseFloat(money.val()));
            dataInf.push(fName.val());
            dataInf.push(lName.val());
            dataInf.push(nameCard.val());
            dataInf.push(cardNumberCopy);
            dataInf.push(parseInt(month.val()));
            dataInf.push(parseInt(year.val()));
            dataInf.push(cvvNum.val());
            depositProcess(dataInf);
            $('.main').addClass('blur');
            $('#notice').removeClass('hidden');
        } else {
            checkBlank(money,errorMoney);
            checkBlank(nameCard,errorName);
            checkBlank(number,errorNumber);
            checkBlank(cvvNum,errorCvv);
        }
    })

    // Function handle withdraw btn
    withdraw.click(function() {
        if (validWithdrawForm()) {
            let dataInf = new Array;
            dataInf.push('withdraw');
            dataInf.push('noInf');
            dataInf.push(parseFloat(money.val()));            
            depositProcess(dataInf);
            $('.main').addClass('blur');
            $('#notice').removeClass('hidden');
           
        } else {
            if (money.val() > parseFloat(currentBalance.text())) {
                errorMoney.text('Your balance is not enough!');
            } else {
                errorMoney.text('');
            }
            checkBlank(money,errorMoney);
            checkBlank(recipientName,errorRecipientName);
            checkBlank(accountNum,errorAccount);
            checkBlank(institutionNum,errorInstituiton);
            checkBlank(transitNum,errorTransit);
            console.log('done');
        }
    })

    // Function close btn
    $('.close').click(function() {
        window.location.href = '../main/main.php';
    })

    
/* -------------------HELPER FUNCTIONS ----------------------------*/
    // Validate the card number
    function validateCardNum(num) {
        let cardNumberCopy = num.replace(/\s+/g, "");
        let sum = 0;
        for (let i=0; i < cardNumberCopy.length; i++) {
            if (i % 2 === 0) {
                let double = parseInt(cardNumberCopy[i] * 2);
    
                if (double >= 10) {
                    sum += double - 9;
                } else {
                    sum += double;
                }
            } else {
                sum += parseInt(cardNumberCopy[i]);
            }
        }
        if (sum % 10 === 0) {
            return true;
        } else {
            return false;
        }
    }

    // Check form is valid
    function validDepositForm() {
        console.log(isInteger(money.val()));
        if (money.val() > 0  && nameCard.val()
        && cardNumberCopy && month.val() && year.val() && cvvNum.val() 
        && policy.checked 
        && isInteger(money.val())  
        && validateCardNum(cardNumberCopy)
        && validatedName(nameCard.val())) {
            return true;
        } else {
            return false;
        }
    }
    
    function validWithdrawForm(){
        if (money.val() && money.val() > 0 && money.val() <= parseFloat(currentBalance.text())
        && recipientName.val() && accountNum.val() 
        && institutionNum.val() && transitNum.val()) {
            return true;
        } else {
            return false;
        }
    }
    // Function send data to server
    function depositProcess(dataInf) {
        $.ajax({
            url: '../server/processPayment.php',
            type: 'POST',
            data: { inf: dataInf },
            success: function (response) {
                console.log(response);
                let responseArray = response.split(',');
                let statusPay = $('#status');
                let balance = $('#balance');
                let cardNum = $('#usedCardNumber');
                let bankInf = $('#bankInf');
                if ((isNaN(parseInt(responseArray[1])))) {
                    statusPay.text('Please try again!');
                    icon.text('error');
                } else {
                    $('.box3').removeClass('hidden');
                    $('#status-icon').text('done');
                    $('#transactionNumber').text(responseArray[0]);
                    balance.text(responseArray[1]);
                    if (dataInf[0] == 'deposit') {
                        statusPay.text('Deposit successfully!');
                        bankInf.parent().removeClass('hidden');
                        bankInf.text('Card number');
                        cardNum.text(number.val());   
                    } else {
                        statusPay.text('Withdraw successfully!');
                        bankInf.parent().removeClass('hidden');
                        bankInf.text('Account number');
                        cardNum.text(accountNum.val()); 
                    }
                }
    
            },
            error: function (err) {
                statusPay.text('Please try again!');
                icon.text('error');
                console.error(err);
            }
        }); 
    } 
})



