$(document).ready(function() {
    // Declare variables
    const homepage = $("h1");
    const form = $("form");
    const email = $("#email");
    const password = $("#password");
    const checkBox = $("#show");
    const continueBtn = $(".button");
    const errorMsg = $("#error");
  
    let isValidEmail = false;
    let isEnoughLength = false;
    let isUpperCase = false;
    let isLowercase = false;
    let isDigit = false;
    let isSpecial = false;
    let isValidForm = false;
    const regExpEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const regExpUpper = /[A-Z]/g;
    const regExpLower = /[a-z]/g;
    const regExpDigit = /[0-9]/g;
    const regExpSpecial = /[^a-zA-Z0-9 ]+/g;
  
    // Redirect to homepage.php when h1 element is clicked
    homepage.on("click", function() {
      window.location.href = "../index.php";
    });
  
    // Event handler for email input: Validate email, update form validation
    email.on("keyup", function() {
      let value = email.val().trim();
      isValidEmail = included(value, regExpEmail);
      validateForm();
    });
  
    // Event handler for password input: Validate password, update form validation
    password.on("keyup", function() {
      let value = password.val().trim();
  
      if (value.length >= 8) {
        isEnoughLength = true;
      }
      isUpperCase = included(value, regExpUpper);
      isLowercase = included(value, regExpLower);
      isDigit = included(value, regExpDigit);
      isSpecial = included(value, regExpSpecial);
  
      validateForm();
    });
  
    // Function to check if characters match given regular expression
    function included(str, regExp) {
      if (str.match(regExp)) {
        return true;
      } else {
        return false;
      }
    }
  
    // Update form validation based on email and password checks
    function validateForm() {
      if (isValidEmail && isEnoughLength && isUpperCase && isLowercase && isDigit && isSpecial) {
        continueBtn.removeClass("button").addClass("valid");
        isValidForm = true;
      } else {
        continueBtn.removeClass("valid").addClass("button");
      }
    }
  
    // Prevent form submission if not validated, show error message
    form.on("submit", function(eve) {
      eve.preventDefault();
      if (isValidForm) {
        eve.target.submit();
      } else {
        errorMsg.html("*Incorrect username or password");
      }
    });
  
    // Show/hide password text when checkbox is clicked
    checkBox.on("click", function() {
      if (checkBox.prop("checked")) {
        password.attr("type", "text");
      } else {
        password.attr("type", "password");
      }
    });
  });
  