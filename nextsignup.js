// declare variables
const homepage = document.querySelector("h1");
const firstPassWord = document.getElementById("password");
const secondPassWord = document.getElementById("repeat");
const checkBox = document.getElementById("show");
const length = document.querySelector(".length");
const upperCase = document.querySelector(".uppercase");
const lowerCase = document.querySelector(".lowercase");
const digit = document.querySelector(".digit");
const special = document.querySelector(".special");
const form = document.querySelector("form");
const continueBtn = document.querySelector(".button");
const errorMsg = document.querySelector(".error");
let isEnoughLength = false;
let isUpperCase = false;
let isLowercase = false;
let isDigit = false;
let isSpecial = false;
let isValidated = false;
const regExpUpper = /[A-Z]/g;
const regExpLower = /[a-z]/g;
const regExpDigit = /[0-9]/g;
const regExpSpecial =/[^a-zA-Z0-9 ]+/g;

homepage.addEventListener("click", () => {
    window.location.href = "homepage.php"
})
firstPassWord.addEventListener("keyup", (eve) => {
    let value = firstPassWord.value;
    if (!isEnoughLength) {
       if (value.length >= 8) {
        length.className = "contained";
        isEnoughLength = true;
       }
    }

        isUpperCase = included(value,regExpUpper,upperCase);
    
        isLowercase = included(value,regExpLower, lowerCase);

        isDigit = included(value,regExpDigit, digit);


        isSpecial = included(value,regExpSpecial, special);
    
    
    validatePassword();
    if (isValidated) {
        continueBtn.className ="valid";
    } else {
        continueBtn.className ="button";
    }
})

function included(str, regExp, target) {
    if (str.match(regExp)) {
        target.className = "contained";
        return true;
    } else {
        target.className = "not-contained";
        return false;
    }

}

secondPassWord.addEventListener("keyup", () => {
    validatePassword();
    if (isValidated) {
        continueBtn.className ="valid";
    } else {
        continueBtn.className ="button";
    }
});

function validatePassword () {
    let first = firstPassWord.value;
    let second = secondPassWord.value;
    if (first === second && isEnoughLength
        && isUpperCase && isLowercase && isDigit && isSpecial) {
        isValidated = true;
    } else {
        isValidated = false;
    }
}

form.addEventListener("submit", (eve) => {
    eve.preventDefault();  
    if (isValidated) {
        eve.target.submit();
    } else {
        errorMsg.innerHTML = "*The passwords you entered do not match. Try again!";
    }
})

checkBox.addEventListener("click", (eve) => {
    if (checkBox.checked) {
        firstPassWord.type = "text";
        secondPassWord.type = "text";
    } else {
        firstPassWord.type = "password";
        secondPassWord.type = "password";
    }
})
