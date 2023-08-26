const regExpUpper = /[A-Z]/g;
const regExpLower = /[a-z]/g;
const regExpChar = /[a-zA-Z ]+/g;
const regExpEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const regExpDigit = /[0-9]/g;
const regExpSpecial =/[^a-zA-Z0-9 ]+/g;
const regExpDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
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

// Check blank field
function checkBlank(field, errorMsg) {
    if (!field.val()) {
        errorMsg.text('*Required');
    } else {
        errorMsg.text() === '*Required' ? errorMsg.text('') : null;   
    }
}
