// Website stored in variable
const apiWebsite = "https://api.pokemontcg.io/v2/cards";

// Render background image when page starts up
let body = document.querySelector("body");
body.classList.add("background--initial");

let button = document.querySelector(".button__start");
let buttonParent = document.querySelector(".button");
let cards = document.querySelector(".cards");
let yourCardImage = document.querySelector("#yourPoke");
let oppCardImage = document.querySelector("#oppPoke");
let buttonBattle = document.querySelector(".button__battle");
let modalContainer = document.querySelector(".modal");
let modalMessage = document.querySelector(".modal__container--message");
const closeModal = document.querySelector(".modal__container--close");

// Function to remove button and change background when clicked on
button.addEventListener("click", () => {
    buttonParent.classList.replace("button", "display__none");
    body.classList.replace("background--initial", "background--start");
    cards.classList.remove("display__none");
    buttonBattle.classList.remove("display__none");
});

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
axios
    .get(apiWebsite)
    .then((response) => {
        pokemons = response.data.data;
        myPokemons = pokemons[myPokemonNum];
        oppPokemons = pokemons[oppPokemonNum];
        console.log(myPokemons, oppPokemons);

        grabImage(myPokemons, oppPokemons);
    })
    .catch((error) => {
        console.error(error)
    });

let grabImage = (yourImage, oppImage) => {
    yourCardImage.setAttribute("src", yourImage.images.large);
    oppCardImage.setAttribute("src", oppImage.images.large);
};

// Function to remove display_none and write status of battle
let writeModalMessage = (result) => {
    modalContainer.classList.remove("display__none");
    modalMessage.innerText = result;
};

buttonBattle.addEventListener("click", () => {
    let firstPokemonAttack = myPokemons.attacks[0].damage * 1;
    let secondPokemonAttack = oppPokemons.attacks[0].damage * 1;

    let winner = (firstPokemonAttack === secondPokemonAttack) ? "DRAW"
    : (firstPokemonAttack > secondPokemonAttack) ? "WIN!"
    : "LOSE!";
    writeModalMessage(winner);
});

// Generate new battles 
let generateNewBattle = () => {
    myPokemonNum = generateRandomNumber();
    oppPokemonNum = generateRandomNumber2();

    myPokemons = pokemons[myPokemonNum];
    oppPokemons = pokemons[oppPokemonNum];
    grabImage(myPokemons, oppPokemons);
}

closeModal.addEventListener("click", () => {
    modalContainer.classList.add("display__none");
    generateNewBattle();
});