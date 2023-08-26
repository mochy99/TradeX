$(document).ready(function() {
    // Declare variables
    const homepage = $("h1");
    const firstPassWord = $("#password");
    const secondPassWord = $("#repeat");
    const checkBox = $("#show");
    const length = $("#length");
    const upperCase = $("#uppercase");
    const lowerCase = $("#lowercase");
    const digit = $("#digit");
    const special = $("#special");
    const form = $("form");
    const continueBtn = $(".button");
    const errorMsg = $("#error");
    let isEnoughLength = false;
    let isUpperCase = false;
    let isLowercase = false;
    let isDigit = false;
    let isSpecial = false;
    let isValidated = false;
    const regExpUpper = /[A-Z]/g;
    const regExpLower = /[a-z]/g;
    const regExpDigit = /[0-9]/g;
    const regExpSpecial = /[^a-zA-Z0-9 ]+/g;
  
    // Redirect to homepage.php when h1 element is clicked
    homepage.on("click", function() {
      window.location.href = "../index.php";
    });
  
    // Update password strength indicators and validate on keyup
    firstPassWord.on("keyup", function() {
      let value = firstPassWord.val();
      if (!isEnoughLength) {
        if (value.length >= 8) {
          length.removeClass("not-contained").addClass("contained");
          isEnoughLength = true;
        }
      }
      isUpperCase = included(value, regExpUpper, upperCase);
      isLowercase = included(value, regExpLower, lowerCase);
      isDigit = included(value, regExpDigit, digit);
      isSpecial = included(value, regExpSpecial, special);
      
      validatePassword();
      if (isValidated) {
        continueBtn.removeClass("button").addClass("valid");
      } else {
        continueBtn.removeClass("valid").addClass("button");
      }
    });
  
    // Helper function to check if characters match given regular expression
    function included(str, regExp, target) {
      if (str.match(regExp)) {
        target.removeClass("not-contained").addClass("contained");
        return true;
      } else {
        target.removeClass("contained").addClass("not-contained");
        return false;
      }
    }
  
    // Validate password match and complexity on keyup in second password field
    secondPassWord.on("keyup", function() {
      validatePassword();
      if (isValidated) {
        continueBtn.removeClass("button").addClass("valid");
      } else {
        continueBtn.removeClass("valid").addClass("button");
      }
    });
  
    // Validate if passwords match and meet complexity criteria
    function validatePassword() {
      let first = firstPassWord.val();
      let second = secondPassWord.val();
      if (first === second && isEnoughLength && isUpperCase && isLowercase && isDigit && isSpecial) {
        isValidated = true;
      } else {
        isValidated = false;
      }
    }
  
    // Prevent form submission if not validated, show error message
    form.on("submit", function(eve) {
      eve.preventDefault();
      if (isValidated) {
        eve.target.submit();
      } else {
        errorMsg.html("*The passwords you entered do not match. Try again!");
      }
    });
  
    // Show/hide password text when checkbox is clicked
    checkBox.on("click", function() {
      if (checkBox.prop("checked")) {
        firstPassWord.attr("type", "text");
        secondPassWord.attr("type", "text");
      } else {
        firstPassWord.attr("type", "password");
        secondPassWord.attr("type", "password");
      }
    });
  });
  