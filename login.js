// declare variables
const homepage = document.querySelector("h1");
const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const checkBox = document.getElementById("show");
const continueBtn = document.querySelector(".button");
const errorMsg = document.querySelector(".error");

let isValidEmail = false;
let isEnoughLength = false;
let isUpperCase = false;
let isLowercase = false;
let isDigit = false;
let isSpecial = false;
let isValidForm = false
const regExpEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const regExpUpper = /[A-Z]/g;
const regExpLower = /[a-z]/g;
const regExpDigit = /[0-9]/g;
const regExpSpecial =/[^a-zA-Z ]+/g;

homepage.addEventListener("click", () => {
    window.location.href = "homepage.html"
})
email.addEventListener("keyup", () => {
    let value = email.value.trim();
    isValidEmail = included(value, regExpEmail);
    validateForm();
});

password.addEventListener("keyup", (eve) => {
    let value = password.value.trim();

    if (value.length > 8) {
    isEnoughLength = true;
    }
    isUpperCase = included(value,regExpUpper);
    isLowercase = included(value,regExpLower);
    isDigit = included(value,regExpDigit);
    isSpecial = included(value,regExpSpecial);
        
    validateForm();
})

function included(str, regExp) {
    if (str.match(regExp)) {
        return true;
    } else {
        return false;
    }
}

function validateForm() {
    if (isValidEmail && isEnoughLength
        && isUpperCase && isLowercase && isDigit && isSpecial) {
        continueBtn.className ="valid";
        isValidForm = true;
    } else {
        continueBtn.className ="button";
    }
}

form.addEventListener("submit", (eve) => {
    eve.preventDefault();
    if (isValidForm) {
        eve.target.submit();        
    } else {
        errorMsg.innerHTML = "*Incorrect username or password";
    };
})

checkBox.addEventListener("click", (eve) => {
    if (checkBox.checked) {
        password.type = "text";
    } else {
        password.type = "password";
    }
})
