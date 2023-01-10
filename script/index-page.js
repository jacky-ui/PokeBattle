// Website stored in variable
const apiWebsite = "http://pokeapi.co/api/v2/";

// Declare empty array which GET request will be stored
let pokemons = [];

// Render background image when page starts up
let body = document.querySelector("body");
body.classList.add("background--initial");

let button = document.querySelector(".button__start");
let buttonParent = document.querySelector(".button");

// Function to remove button and change background when clicked on
button.addEventListener("click", () => {
    buttonParent.classList.replace("button", "button__none");
    body.classList.replace("background--initial", "background--start");
});

// Axios GET Request
axios
    .get(`${apiWebsite}move/3/`)
    .then((response) => {
        console.log(response);
    });
