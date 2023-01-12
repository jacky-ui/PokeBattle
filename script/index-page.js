// Website stored in variable
const apiWebsite = "https://api.pokemontcg.io/v2/cards";

// Declare empty array which GET request will be stored
let pokemons = [];
// Axios GET Request
axios
    .get(apiWebsite)
    .then((response) => {
        pokemons = response.data.data;
        console.log(pokemons);
    });

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

// Function to generate random number. Will use this to grab random Pokemon from array
let generateRandomNumber = () => {
    let randomNumber = Math.floor(Math.random() * 99);
    return randomNumber;
}
let myPokemonNum = generateRandomNumber();
console.log(myPokemonNum);