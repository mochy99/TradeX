const regExpUpper = /[A-Z]/g;
const regExpLower = /[a-z]/g;
const regExpEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const regExpDigit = /[0-9]/g;
const regExpSpecial =/[^a-zA-Z0-9 ]+/g;
const regExpDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const userName = $('#userName');
const fName = $('#firstName');
const lName = $('#lastName');
const gender = $('#gender');
const phone = $('#phoneNumber');
const dob = $('#dob');
let responseValidatedUserName;
let editing = false;


$(document).ready(function() {
    
    fetchInf();
 
    // when clicking the edit button
    $('.edit').click(function() {
        if (editing) {
            isValid();     
        } else {
            $('h1').text("Personal Information");
            $('select').prop('disabled', false);
            $('input[type!="email"]').prop('disabled', false);
            $('.icon ').text('save');
            editing = true;
        }    
    });

    //when clicking the exit button
    $('#exit').click(function() {
        window.location.href = 'setting.html';
    })
        
})



// function checks the uniqueness of the provided user name.
function isValid() {
    $.ajax({
        url: 'uniqueName.php',
        type: 'GET',
        data: { userName: userName.val() },
        success: function(response) {
            if (response.trim() === '1') {
                validate();
                $('.errorMsg-userName').text('');
                return true;
            } else {
                $('.errorMsg-userName').text('*This one is already in use.');
                return false;
            }
        },
        error: function (error) {
            console.error(error);
        }
    });
}

function validate() {

    let isValidatedFistName = sanitizeName(fName.val());
    let isValidatedLastName = sanitizeName(lName.val());
    let isValidatedPhoneNum = sanitizePhone(phone.val());
    let isValidatedDate = sanitizeDate(dob.val());
    if (isValidatedFistName &&isValidatedLastName 
        && isValidatedPhoneNum && isValidatedDate) {
        // handle html elements
        $('select').prop('disabled', true);
        $('input[type!="email"]').prop('disabled', true);
        $('.icon').text('edit');
        editing = false;

        //capitalize the fName and lName
        capitalize(fName);
        capitalize(lName);

        //format dob if val is null
        formatDate(dob);

        // update information into database
        postInf();
    } else{
        eachEle();
    } 
}

// function checking each of element
function eachEle() {
    
    if (!isValidatedFistName) {
        $('.errorMsg-fName').text('*Invalid input');
    } else {
        $('.errorMsg-fName').text('');
    }
    if (!isValidatedLastName) {
        $('.errorMsg-lName').text('*Invalid input');
    }  else {
        $('.errorMsg-lName').text('');
    }
    if (!isValidatedPhoneNum) {
        $('.errorMsg-phone').text('*Invalid input');
    } else {
        $('.errorMsg-phone').text('');
    }
    if(!isValidatedDate) {
        $('.errorMsg-dob').text('*Invalid input');
    } else {
        $('.errorMsg-dob').text('');
    }
}

//function sanitize the fname lname
 function sanitizeName(name) {
    if (name && (name.match(regExpDigit) || name.match(regExpSpecial))) {
        return false;
    } else {
        return true;
    }
}

// function sanitize the phone Number
function sanitizePhone(phone) {
    if (phone && 
        (phone.match(regExpLower) || phone.match(regExpUpper) || phone.match(regExpSpecial))) {
        return false;
    } else {
        return true;
        
    }
}

// function sanitize the date
function sanitizeDate(date) {
    if (date && date.match(regExpDate) || !date) {
        return true;
    } else {
        return false;
    }
}

// function capitalize the name
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

// function format the date value
function formatDate(date) {
    if (!date.val()) {
        date.val('0000-00-00');
    }
}

// function to fecth information using get request
function fetchInf() {
    $.ajax({
        url: 'userInf.php',
        type: 'GET',
        success: function (data) {
            const refArray = ['#userName', '#firstName', '#lastName', '#email', '#gender', '#phoneNumber', '#dob'];
            let dataArray = data.split(',');
            for (let i = 0; i < dataArray.length; i++) {
                if (i === (dataArray.length - 1)) {
                    if (dataArray[i] != "0000-00-00") {
                        $(refArray[i]).val(dataArray[i]);
                    }
                } else {
                    $(refArray[i]).val(dataArray[i]);
                };    
            }                
        },
        error: function (err) {
            console.error(err);
        }
    })
}

// function to post information 
function postInf() {
    let dataInf = [];
    dataInf.push($('#userName').val());
    dataInf.push($('#firstName').val());
    dataInf.push($('#lastName').val());
    dataInf.push($('#gender').val());
    dataInf.push($('#phoneNumber').val());
    dataInf.push($('#dob').val());

    $.ajax({
        url: 'updateUserInf.php',
        type: 'POST',
        data: { inf: dataInf},
        success: function (reply) {
           $('h1').text(reply);
        },
        error: function (err) {
            console.error(err);
        }
    });
}

