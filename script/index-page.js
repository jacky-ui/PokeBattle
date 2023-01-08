// Render background image when page starts up
let body = document.querySelector("body");
body.classList.add("background--initial");

let button = document.querySelector(".button__start");
let buttonParent = document.querySelector(".button");

button.addEventListener("click", () => {
    buttonParent.classList.add("button__none");
});