const grid = document.querySelector('.grid');
const resultsDisplay = document.querySelector('.results')
let width = 15
let pokeSpriteLocation = 202; //starting position upon load
let destroyedPokeballs = []; //where pokeballs go to die after being shot

//* -------------------------------!Generate Grid!-----------------------------------
for (let i = 0; i < 225; i++) { //generate grid
  const gridDivs = document.createElement('div');
  grid.appendChild(gridDivs)
}
const divs = Array.from(document.querySelectorAll('.grid div'));

//* ------------------------------!Place Pokeball Enemies!---------------------------
const pokeballPlacement = [
  //place enemy pokeballs
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39
];

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
//* ----------------------------!Place PokeSprite!-------------------------------------
//add sprite to initial starting position
//rewrite as concice arrow func!! 
divs[pokeSpriteLocation].classList.add('pokeSprite');

//* ----------------------------!Sprite movement!--------------------------------------
//make sprite reappear in new location dependent on keypress
function moveUser(e) {
  divs[pokeSpriteLocation].classList.remove('pokeSprite') //removes sprite
  switch(e.keyCode) {
    case 37:
      if (pokeSpriteLocation % width !== 0) pokeSpriteLocation -=1;
      break;
    case 39:
      if (pokeSpriteLocation % width < width -1) pokeSpriteLocation +=1;
      break;
      //add up(38) down(40) cases! 
      //add case for shooting?
  }
  divs[pokeSpriteLocation].classList.add('pokeSprite')
}
document.addEventListener('keydown', moveUser)

//* -------------------------!Enemy Pokeball movement!--------------------------------
//func needed to move pokeballs down
//needs to detect when 0 index pokeball hits left side?
//same for the right side of the screen?
let goingRight = true;
let travel = 1;
let pokeballId;

function pokeballAttack() {
  //if first ball is on far left column leftScreen is true. 
  const leftScreen = pokeballPlacement[0] % width === 0;
  //if last pokeball in array is far right column rightScreen is true.
  const rightScreen = pokeballPlacement[pokeballPlacement.length - 1] % width === width -1;
  // remove();

  if (rightScreen && goingRight) {
    // console.log('rightscreen true & going right')
    for (let i = 0; i < pokeballPlacement.length; i++) {
      pokeballPlacement[i] += width +1;
      travel = -1;
      goingRight = false;
    }
  }

  if (leftScreen && !goingRight) {
    // console.log('leftscreen true & not going right')
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
  // if (destroyedPokeballs.length === placePokeBalls.length) {
  //   resultsDisplay.innerHTML = "You remain free another day."
  //   clearInterval(pokeballId);
  // }
}
pokeballId = setInterval(pokeballAttack, 1000)

//shoot vines at pokeballs
function shoot(e) {
  let vineShotId;
  let currentVineShotIndex = pokeSpriteLocation;
  function shootVine() { //function to move the vine from one div to next
    divs[currentVineShotIndex].classList.remove('vine');
    currentVineShotIndex -= width;
    divs[currentVineShotIndex].classList.add('vine');
    console.log('hello')
    console.log(currentVineShotIndex, divs[currentVineShotIndex]);
    pokeballPlacement.includes(currentVineShotIndex);
    if (pokeballPlacement.includes(currentVineShotIndex)) {
        divs[currentVineShotIndex].classList.remove('vine');
        divs[currentVineShotIndex].classList.remove('pokeball');
        divs[currentVineShotIndex].classList.add('shot');

       setTimeout(() => divs[currentVineShotIndex].classList.remove('shot'), 100);
       clearInterval(vineShotId);
      //points = points + 10;
      //innerhtml = points

      const removePokeballs = pokeballPlacement.indexOf(currentVineShotIndex);
      destroyedPokeballs.push(removePokeballs);
    }
 }
  //spacebar to fire vines
  switch(e.keyCode) {
    case 32: {
    vineShotId = setInterval(shootVine, 100);
    console.log("vineshot");
    }  
    } 
}

document.addEventListener('keydown', shoot);
//* ------------------------------------------------------------------
//start / stop
//multiple levels
//audio
//mute button 
//readME