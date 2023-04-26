// Website stored in variable
const apiWebsite = "https://api.pokemontcg.io/v2/cards";

// Render background image when page starts up
let body = document.querySelector("body");
body.classList.add("background--loading");

let button = document.querySelector(".button__start");
let buttonParent = document.querySelector(".button");
let cards = document.querySelector(".cards");
let yourCardImage = document.querySelector("#yourPoke");
let oppCardImage = document.querySelector("#oppPoke");
let buttonBattle = document.querySelector(".button__battle");
let modalContainer = document.querySelector(".modal");
let modalMessage = document.querySelector(".modal__container--message");
let loadingText = document.querySelector(".bouncing-text");
const closeModal = document.querySelector(".modal__container--close");

button.classList.add("display__none");

// Function will remove loading background, put back button and take out loading text
function hideLoading() {
    body.classList.remove("background--loading");
    body.classList.add("background--initial");
    button.classList.remove("display__none");
    button.classList.add("button__start");
    loadingText.classList.remove("bouncing-text");
    loadingText.classList.add("display__none");
};

// Function to remove button and change background when clicked on
button.addEventListener("click", () => {
    buttonParent.classList.replace("button", "display__none");
    body.classList.replace("background--initial", "background--start");
    cards.classList.remove("display__none");
    buttonBattle.classList.remove("display__none");
});

// Confetti animation. Credits to https://codepen.io/jonathanbell/pen/OvYVYw
let W = window.innerWidth;
let H = window.innerHeight;
let canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxConfettis = 150;
const particles = [];

canvas.classList.add("display__none");

const possibleColors = [
  "DodgerBlue",
  "OliveDrab",
  "Gold",
  "Pink",
  "SlateBlue",
  "LightBlue",
  "Gold",
  "Violet",
  "PaleGreen",
  "SteelBlue",
  "SandyBrown",
  "Chocolate",
  "Crimson"
];

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
  this.x = Math.random() * W; // x
  this.y = Math.random() * H - H; // y
  this.r = randomFromTo(11, 33); // radius
  this.d = Math.random() * maxConfettis + 11;
  this.color =
    possibleColors[Math.floor(Math.random() * possibleColors.length)];
  this.tilt = Math.floor(Math.random() * 33) - 11;
  this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
  this.tiltAngle = 0;

  this.draw = function() {
    context.beginPath();
    context.lineWidth = this.r / 2;
    context.strokeStyle = this.color;
    context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
    return context.stroke();
  };
}

function Draw() {
  const results = [];

  // Magical recursive functional love
  requestAnimationFrame(Draw);

  context.clearRect(0, 0, W, window.innerHeight);

  for (var i = 0; i < maxConfettis; i++) {
    results.push(particles[i].draw());
  }

  let particle = {};
  let remainingFlakes = 0;
  for (var i = 0; i < maxConfettis; i++) {
    particle = particles[i];

    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
    particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

    if (particle.y <= H) remainingFlakes++;

    // If a confetti has fluttered out of view,
    // bring it back to above the viewport and let if re-fall.
    if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
      particle.x = Math.random() * W;
      particle.y = -30;
      particle.tilt = Math.floor(Math.random() * 10) - 20;
    }
  }

  return results;
}

window.addEventListener(
  "resize",
  function() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },
  false
);

// Push new confetti objects to `particles[]`
for (var i = 0; i < maxConfettis; i++) {
  particles.push(new confettiParticle());
}

// Initialize
canvas.width = W;
canvas.height = H;
Draw();

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
        hideLoading();

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
    if(modalMessage.innerText === "WIN!") {
        canvas.classList.remove("display__none");
    }
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
    canvas.classList.add("display__none");
    generateNewBattle();
});