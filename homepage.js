let homepage = document.querySelector("h1");
let signUpBtn = document.querySelector(".signup");
let logInBtn = document.querySelector(".login");

signUpBtn.addEventListener("click", function() {
  window.location.href = "signup.php";
});
logInBtn.addEventListener("click", function() {
    window.location.href = "login.php";
  });
homepage.addEventListener("click", () => {
    window.location.href = "homepage.php"
})
