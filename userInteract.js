let main = document.querySelector(".main");
let summary = document.querySelector(".summary");

summary.addEventListener("scroll", (eve) => {
    console.log(eve);
    console.log(summary.getBoundingClientRect.top);
})
