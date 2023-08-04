const old = document.getElementById('oldPass');
const newPass = document.getElementById('newPass');
const confirmPass = document.getElementById('confirmPass');
const showOld = document.getElementById('showOld');
const showNew = document.getElementById('showNew');
const length = document.querySelector('.length');
const upperCase = document.querySelector('.uppercase');
const lowerCase = document.querySelector('.lowercase');
const digit = document.querySelector('.digit');
const special = document.querySelector('.special');
const errorOld = document.querySelector('errorMsg-old');
const errorNew = document.querySelector('errorMsg-new');
const errorConfirm = document.querySelector('errorMsg-confirm');
const submit = document.getElementById('submit');


let isValidated = false;
const regExpUpper = /[A-Z]/g;
const regExpLower = /[a-z]/g;
const regExpDigit = /[0-9]/g;
const regExpSpecial =/[^a-zA-Z0-9 ]+/g;


$(document).ready(function() {
     //when clicking the exit button
     $('#exit').click(function() {
        window.location.href = 'setting.html';
    })

    // Function to show/hide the current password on button click.
    showOld.addEventListener("click", () => {
        if (showOld.checked) {
            old.type = 'text';
        } else {
            old.type = "password";
        }
    })

    // Function to show/hide the new password on button click.
    showNew.addEventListener('click', () => {
        if (showNew.checked) {
            newPass.type = 'text';
            confirmPass.type = 'text';
        } else {
            newPass.type = 'password';
            confirmPass.type = 'password';
        }
    })

    // Event handler for old password blur: Validates input string, updates error message.
    $('#oldPass').blur(function() {
        $.ajax({
            url: 'validatePass.php',
            type: 'POST',
            data: { data: old.value },
            success: function(response) {
                console.log(response);
                if (response.trim() === '1') {
                    $('.errorMsg-old').text("");
                    $('#newPass').prop('disabled', false);
                    $('#confirmPass').prop('disabled', false);
                } else {
                    $('.errorMsg-old').text("*Incorrect password");
                    $('#newPass').prop('disabled', true);
                    $('#confirmPass').prop('disabled', true);
                }
            },
            error: function(err) {
                console.log(err);
            }
        })
    })
        
    

    // Event handler for new password blur: Validates input string against conditions.
   newPass.addEventListener('keyup', () => {
    console.log(newPass.value);
    isValidated = validateCond(newPass.value);
    
   })
    // Event handler for confirm password blur: Compares passwords, updates submit button color, and securely updates the database.
   confirmPass.addEventListener('keyup', () => {
    if (newPass.value === confirmPass.value 
        && isValidated
        && newPass.value !== old.value) {
        submit.className = 'not-pending';
    } else if (newPass.value === old.value) {
        confirmPass.innerText = "*Please select an alternate password from your current one."
        submit.className = 'pending';
    } else if (newPass.value !== confirmPass.value) {
        confirmPass.innerText = "*Passwords do not match"
        submit.className = 'pending';
    } else {
        submit.className = 'pending';
    }
   })

   // Update the new password into database when clicking submit btn
   $('#submit').click(function() {
    if (newPass.value === confirmPass.value && isValidated && newPass.value !== old.value) {
        $.ajax({
            url: 'updatePass.php',
            type: 'POST',
            data: { data: newPass.value },
            success: function (response) {
                console.log(response);
                $('h1').text(response);
             },
             error: function (err) {
                 console.error(err);
             }
        })
    }
    
})
})

function validateCond(value) {
    let isEnoughLength = false;
    let isUpperCase = false;
    let isLowercase = false;
    let isDigit = false;
    let isSpecial = false;
    if (!isEnoughLength) {
        if (value.length >= 8) {
         length.className = "valid";
         isEnoughLength = true;
        }
     }
     isUpperCase = included(value,regExpUpper,upperCase);
 
     isLowercase = included(value,regExpLower, lowerCase);
 
     isDigit = included(value,regExpDigit, digit);
 
     isSpecial = included(value,regExpSpecial, special);

     if (isEnoughLength && isUpperCase 
        && isLowercase && isDigit 
        && isSpecial) {
        return true;
    } else {
        return false;
    }
}

function included(str, regExp, target) {
    if (str.match(regExp)) {
        target.className = "valid";
        return true;
    } else {
        target.className = "not-contained";
        return false;
    }
}