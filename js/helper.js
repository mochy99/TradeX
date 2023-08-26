const regExpUpper = /[A-Z]/g;
const regExpLower = /[a-z]/g;
const regExpChar = /[a-zA-Z ]+/g;
const regExpEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const regExpDigit = /[0-9]/g;
const regExpSpecial =/[^a-zA-Z0-9 ]+/g;
const regExpDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;


// Check validation of the input type number
// String -> Boolean
// Return true i if it is interger
function isInteger(number) {
    return Boolean(Number.isInteger(parseInt(number)) && number.length < 12) ;
}

// Check validation of the input type number
// String -> Boolean
// Return true i if it is float
function isFloat(number) {
    return Boolean(!Number.isNaN(parseFloat(number)) && number.length < 12) ;
}

// Check validation of string value
// String -> Boolean
// Return true if it is valid (not include digit or special characters)
function validatedName(name) {
    if (name && (name.match(regExpDigit) || name.match(regExpSpecial))) {
        return false;
    } else {
        return true;
    }
}

// Check validation of the date value
// Date -> Boolean
// Return true if it is valid
function validatedDate(date) {
    if (date && date.match(regExpDate) || !date || date === "0000-00-00") {
        return true;
    } else {
        return false;
    }
}


// Capitalize the first letter
// Input -> Capitalize the first letter of each word 
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

// Check blank field
function checkBlank(field, errorMsg) {
    if (!field.val()) {
        errorMsg.text('*Required');
    } else {
        errorMsg.text() === '*Required' ? errorMsg.text('') : null;   
    }
}

// Hanlde select money 
function selectMoney() {
    
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
}
