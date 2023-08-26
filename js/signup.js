$(document).ready(function() {
  const homepage = $("h1");
  let email = $("#email");
  let error = $("span.error");
  let form = $("form");
  let continueBtn = $(".button");

  const regExpEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  homepage.on("click", function() {
    window.location.href = "../index.php";
  });

  email.on("input", function() {
    error.html("");
    if (email.val().match(regExpEmail)) {
      continueBtn.removeClass("button").addClass("valid");
    } else {
      continueBtn.removeClass("valid").addClass("button");
    }
  });

  form.on("submit", function(event) {
    event.preventDefault();
    if (!email.val().match(regExpEmail) || !email.val()) {
      error.text("*Please enter a valid email address.");
      continueBtn.removeClass("valid").addClass("button");
    } else {
      event.target.submit();
    }
  });
});
