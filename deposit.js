const regExpUpper = /[A-Z]/g;
const regExpLower = /[a-z]/g;
const regExpChar = /[a-zA-Z ]+/g;
const regExpEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const regExpDigit = /[0-9]/g;
const regExpSpecial =/[^a-zA-Z0-9 ]+/g;
const regExpDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
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
let cardNumberCopyDB;
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


$(document).ready(function() {
    // Function fetch information on the html
    fetchInf();

    // Function when clicking the exit btn
    $('#exit').click(function() {
        window.location.href = 'setting.html';
    })

    // Validate the input of the money field.
    money.blur(function() {
        if (sanitizeNumber(money.val()) && money.val() > 0) {
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
        if (sanitizeName(fName.val())) {
            capitalize(fName);
            errorFName.text('');
        } else {
            errorFName.text('*Invalid input');
        }
    })
    lName.blur(function() {
        if (sanitizeName(lName.val())) {
            capitalize(lName);
            errorLName.text('');
        } else {
            errorLName.text('*Invalid input');
        }
    })
    nameCard.blur(function() {
        if (sanitizeName(nameCard.val())) {
            capitalize(nameCard);
            errorName.text('');
        } else {
            errorName.text('*Invalid input');
        }
    })
    recipientName.blur(function() {
        if (sanitizeName(recipientName.val())) {
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
    // Handle the form submission.
    deposit.click(function() {
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
            console.log(dataInf)
            console.log(typeof dataInf);
            depositProcess(dataInf);
            $('.main').addClass('blur');
            $('.notice').removeClass('hidden');
            console.log('done');
        } else {
            checkBlank(money,errorMoney);
            checkBlank(fName,errorFName);
            checkBlank(lName,errorLName);
            checkBlank(nameCard,errorName);
            checkBlank(number,errorNumber);
            checkBlank(cvvNum,errorCvv);
        }
    })

    withdraw.click(function() {

        if (validWithdrawForm()) {
            let dataInf = new Array;
            dataInf.push('withdraw');
            dataInf.push('noInf');
            dataInf.push(parseFloat(money.val()));
            
            depositProcess(dataInf);
            $('.main').addClass('blur');
            $('.notice').removeClass('hidden');
            console.log('done1');
        } else {
            if (money.val() > currentBalance.text()) {
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
        window.location.href = 'mainPage.php';

    })
})
//------------------------HELPER FUNCTIONS -----------------------------------------
// function to fecth information using get request
function fetchInf() {
    $.ajax({
        url: 'userInf.php',
        type: 'GET',
        success: function (data) {
            let dataArray = data.split(',');
            console.log(dataArray);
            fName.val(dataArray[1]); 
            lName.val(dataArray[2]); 
            $('#email').val(dataArray[3]);
            nameCard.val(dataArray[7]);
            let cardNum;
            if(dataArray[8] !== ""){
                cardNumberCopy = dataArray[8];
                cardNum = "**** **** **** " + dataArray[8].slice(12);
            } else {
                cardNum = "";
            }
            
            number.val(cardNum);
            if(dataArray[9] !== ""){
                month.val(dataArray[9]);
            } 
            if(dataArray[10] !== ""){
                year.val(dataArray[10]);
            } 
            cvvNum.val(dataArray[11]); 
            currentBalance.text('$' + dataArray[12]);           
        },
        error: function (err) {
            console.error(err);
        }
    })
}
// Check validation of the amount of money
function sanitizeNumber(number) {
    if (!(number.match(regExpChar)) && !(number.match(regExpSpecial))
    && number.length < 9) {
       return true;
    } else {
        return false;
    }
}
// Check validation of value
function sanitizeName(name) {
    if (name && (name.match(regExpDigit) || name.match(regExpSpecial))) {
        return false;
    } else {
        return true;
    }
}
// Capitalize the first letter
function capitalize(name) {
    let value = name.val().toLowerCase();
    let length = name.val().length;
    for (let i =0; i < length; i++) {
        if (i===0) {
            value = value.slice(0,1).toUpperCase() + value.slice(1);
        }
        if (value[i] === " " && value[i+1] !== " ") {
            value = value.slice(0, i+1) 
                    + value.slice(i+1,i+2).toUpperCase() 
                    + value.slice(i+2);
        }
    }
    name.val(value);
}
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
// Check blank field
function checkBlank(field, errorMsg) {
    if (!field.val()) {
        errorMsg.text('*Required');
    } else {
        errorMsg.text() === '*Required' ? errorMsg.text('') : null;   
    }
}
// check form is valid
function validDepositForm() {
    if (money.val() && money.val() > 0 && fName.val() && lName.val() && nameCard.val()
    && cardNumberCopy && month.val() && year.val() && cvvNum.val() 
    && policy.checked 
    && sanitizeNumber(money.val()) 
    && sanitizeName(fName.val())
    && sanitizeName(lName.val()) 
    && validateCardNum(cardNumberCopy)
    && sanitizeName(nameCard.val())) {
        return true;
    } else {
        return false;
    }
}

function validWithdrawForm(){
    if (money.val() && money.val() > 0 && money.val() <= currentBalance.text()
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
        url: 'processDeposit.php',
        type: 'POST',
        data: { inf: dataInf },
        success: function (response) {
            console.log(response);
            let responseArray = response.split(',');
            let icon = $('#status-icon');
            let statusPay = $('.status');
            let balance = $('#balance');
            let updatedBalance = $('#updatedBalance')
            let transactionNum = $('#transactionNumber');
            let cardNum = $('#usedCardNumber');
            let bankInf = $('#bankInf');
            if ((isNaN(parseInt(responseArray[1])))) {
                statusPay.text('Please try again!');
                icon.text('error');
            } else {
                $('.box3').removeClass('hidden');
                icon.text('done');
                transactionNum.text(responseArray[0]);
                balance.text(responseArray[1]);
                if (dataInf[0] == 'deposit') {
                    statusPay.text('Deposit successfully!');
                    bankInf.text('Card number');
                    cardNum.text(number.val());   
                } else {
                    statusPay.text('Withdraw successfully!');
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
