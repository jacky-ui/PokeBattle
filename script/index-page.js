// Website stored in variable
const apiWebsite = "https://api.pokemontcg.io/v2/cards";

// Function to generate random number. Will use this to grab random Pokemon from array
// Generate my Pokemon
let generateRandomNumber = () => {
    let randomNumber = Math.floor(Math.random() * 99);
    return randomNumber;
}

// Generate opponent Pokemon
let generateRandomNumber2 = () => {
    let randomNumber = Math.floor(Math.random() * 99);
    return randomNumber;
}
let myPokemonNum = generateRandomNumber();
let oppPokemonNum = generateRandomNumber2();

// Declare empty array which GET request will be stored
let pokemons
let myPokemons = [];
let oppPokemons = [];
// Axios GET Request
// axios
//     .get(apiWebsite)
//     .then((response) => {
//         pokemons = response.data.data;
//         myPokemons = pokemons[myPokemonNum];
//         oppPokemons = pokemons[oppPokemonNum];
//         console.log(myPokemons, oppPokemons);
//     })
//     .catch((error) => {
//         console.error(error)
//     });

// Render background image when page starts up
let body = document.querySelector("body");
body.classList.add("background--initial");

let button = document.querySelector(".button__start");
let buttonParent = document.querySelector(".button");
let cards = document.querySelector(".cards");

// Function to remove button and change background when clicked on
button.addEventListener("click", () => {
    buttonParent.classList.replace("button", "display__none");
    body.classList.replace("background--initial", "background--start");
    cards.classList.remove("display__none");
});