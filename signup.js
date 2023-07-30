const homepage = document.querySelector("h1");
let email = document.getElementById("email");
let error = document.querySelector("span.error");
let form = document.querySelector("form");
let continueBtn = document.querySelector(".button");

const regExpEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

homepage.addEventListener("click", () => {
  window.location.href = "homepage.php"
})

email.addEventListener("input", () => {
    if (email.value.match(regExpEmail)) {  
        continueBtn.className = "valid";
    } else {
        continueBtn.className = "button";
    }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!email.value.match(regExpEmail)|| !email.value) {
    error.innerHTML = "*Please enter a valid email address.";
    continueBtn.className = "button";;
  } else {
    event.target.submit();
    };
});
  
