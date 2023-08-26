$(document).ready(function() {
  // Navigate to another page
  $('#signup').on("click", function() {
    window.location.href = "signup/signup.php";
  });
  $('#login').on("click", function() {
      window.location.href = "signup/login.php";
    });
  $('h1').on("click", () => {
      window.location.href = "index.php"
  })
})


