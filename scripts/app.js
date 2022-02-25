const grid = document.querySelector('.grid');
const resultsDisplay = document.querySelector('.results');
const muteAudio = document.querySelector('#mute');
const audio = document.querySelector('audio');
let width = 15;
let pokeSpriteLocation = 202; //starting position upon load
let destroyedPokeballs = []; //where pokeballs go to die after being shot
let goingRight = true;
let travel = 1;
let pokeballId;
let vineShotId;
let divs;

const defaultPositions = [
  //place enemy pokeballs
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

//*-------------------------------!Initialise the game!---------------------------------
document.addEventListener('DOMContentLoaded', init);

function start() { //plays battle music upon pressing start button
  pokeballId = setInterval(pokeballAttack, 1000);
  toggleMusic();
}

//*-------------------------------!mute toggle!----------------------------------------
function toggleMusic () {
  if (audio.paused === true) {
    audio.play();
    muteAudio.innerHTML = 'Mute'
  } else {
    audio.pause();
    muteAudio.innerHTML = "Unmute";
  }
}

function init() {
  //* -------!Generate Grid!----------
  for (let i = 0; i < 225; i++) {
    //generate grid
    const gridDivs = document.createElement("div");
    grid.appendChild(gridDivs);
  }
  divs = Array.from(document.querySelectorAll(".grid div"));
  //* ------!Place PokeSprite!--------
  //add sprite to initial starting position
  divs[pokeSpriteLocation].classList.add("pokeSprite");
  //* ------!Movement!--------
  document.addEventListener("keydown", moveUser);
  document.addEventListener("keydown", shoot);
  document.querySelector("#start-game").addEventListener("click", start);
  document.querySelector("#reset-game").addEventListener("click", resetGame);
  //* ------!mute button!--------
  muteAudio.addEventListener('click', toggleMusic);
}

//* ------------------------------!Place Pokeball Enemies!---------------------------
let pokeballPlacement = [...defaultPositions];
  

function placePokeBalls() { //place the enemy pokeballs
  //need to loop over pokeballs array?
  // console.log('balls are being placed?', pokeballPlacement)
  for (let i = 0; i < pokeballPlacement.length; i++) {
    if (!destroyedPokeballs.includes(i)) {
      divs[pokeballPlacement[i]].classList.add("pokeball");
    }
  }
}

//* -------------!Function to remove pokeballs when one is shot!----------------------
// remove pokeballs
function remove() {
  // console.log('removing pokeballs?', pokeballPlacement)
  divs.forEach(div => div.classList.remove('pokeball'));
}

//* ----------------------------!Sprite movement!--------------------------------------
function moveUserSprite(current, newPosition) {
  pokeSpriteLocation = newPosition;
  divs[current].classList.remove("pokeSprite"); //removes sprite
  divs[newPosition].classList.add("pokeSprite");
}

//make sprite reappear in new location dependent on keypress
function moveUser(e) {
  switch(e.keyCode) {
    case 37:
      if (pokeSpriteLocation % width !== 0) moveUserSprite(pokeSpriteLocation, pokeSpriteLocation -= 1);
      break;
    case 39:
      if (pokeSpriteLocation % width < width -1) moveUserSprite(pokeSpriteLocation, (pokeSpriteLocation += 1));
      break;
  }
}

//* -------------------------!Enemy Pokeball movement!--------------------------------
//func needed to move pokeballs down
//needs to detect when 0 index pokeball hits left side?
//same for the right side of the screen?

function pokeballAttack() {
  //if first ball is on far left column leftScreen is true. 
  const leftScreen = pokeballPlacement[0] % width === 0;
  //if last pokeball in array is far right column rightScreen is true.
  const rightScreen = pokeballPlacement[pokeballPlacement.length - 1] % width === width -1;
  // remove();

  if (rightScreen && goingRight) {
    for (let i = 0; i < pokeballPlacement.length; i++) {
      pokeballPlacement[i] += width +1;
      travel = -1;
      goingRight = false;
    }
  }

  if (leftScreen && !goingRight) {
    for (let i = 0; i < pokeballPlacement.length; i++) {
      pokeballPlacement[i] += width -1;
      travel = 1;
      goingRight = true;
    }
  }

  for (let i = 0; i < pokeballPlacement.length; i++) {
    pokeballPlacement[i] += travel;
  }
  remove();
  placePokeBalls();

  if (pokeballPlacement.some((pokeball) => pokeball >= 210)) {
    // resultsDisplay.innerHTML = "You got caught by a trainer!";
    clearInterval(pokeballId);
  }

  //game over (modified pokeballs dodged num)
  if (divs[pokeSpriteLocation].classList.contains('pokeball', 'pokeSprite')) {
    resultsDisplay.innerHTML = "Bulbasaur was caught!!";
    clearInterval(pokeballId);
  }

  //game over when pokeballs hit bottom
  for (let i = 0; i < pokeballPlacement.length; i++) {
    if(pokeballPlacement[i] > divs.length) {
      resultsDisplay.innerHTML = 'Bulbasaur was caught!!';
      clearInterval(pokeballId);
    }
  }
  if (destroyedPokeballs.length === pokeballPlacement.length) {
    resultsDisplay.innerHTML = "You remain free another day."
    clearInterval(pokeballId);
  }
}

//* -------------------------!SHOOT!--------------------------------
//shoot vines at pokeballs
function shoot(e) {
  let currentVineShotIndex = pokeSpriteLocation;
  function shootVine() { //function to move the vine from one div to next
    if (currentVineShotIndex > 0) {
      divs[currentVineShotIndex].classList.remove("vine");
      currentVineShotIndex -= width;
      divs[currentVineShotIndex].classList.add("vine");
      if (
        pokeballPlacement.includes(currentVineShotIndex) &&
        divs[currentVineShotIndex].classList.contains("pokeball")
      ) {
        divs[currentVineShotIndex].classList.remove("vine");
        divs[currentVineShotIndex].classList.remove("pokeball");
        divs[currentVineShotIndex].classList.add("shot");

        setTimeout(
          () => divs[currentVineShotIndex].classList.remove("shot"),
          100
        );
        clearInterval(vineShotId);

        const removePokeballs = pokeballPlacement.indexOf(currentVineShotIndex);
        destroyedPokeballs.push(removePokeballs);
        resultsDisplay.innerHTML = destroyedPokeballs.length;
      }
    }
 }

  //spacebar to fire vines
  switch(e.keyCode) {
    case 38: {
    vineShotId = setInterval(shootVine, 100);
    }  
    } 
}

// * reset variables
function resetGame() {
  clearInterval(vineShotId);
  clearInterval(pokeballId);
  pokeballPlacement = [...defaultPositions];
  destroyedPokeballs = [];
  resultsDisplay.innerHTML = 0;
  moveUserSprite(pokeSpriteLocation, 202);
  document.querySelectorAll('.grid div').forEach(el => {
    el.classList.remove('vine');
    el.classList.remove('pokeball');
  });
  audio.pause();
}
//* ------------------------------------------------------------------
//start / stop
//multiple levels
//audio
//mute button 
// score counter
//readME