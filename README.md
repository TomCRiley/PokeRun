
# Poké Run!

<img src="./assets/readme/pokedodgegameplay.gif" alt=" Project GIF" width="600" height="600">

## Concept and Overview
My first project on the General Assembly Software Engineering Immersive. Given my very limited experience in JavaScript up until this point, I chose to build a game based on Space Invaders so that there was a clear set of functions that I needed to build, rather than attempting to invent a game concept from scratch. 

The first game I remember falling in love with was Pokemon LeafGreen Version. It originally launched on the GameBoy Advance - but I played it on the Nintendo DS. With such a strong theme, styling wouldn’t be a major difficulty. 

I wanted to focus my time and energy on establishing my JavaScript skills. 


## Brief
Design a simple, grid-based game with HTML, CSS and JavaScript. It needs to include game logic like winning and losing. 7 days, and solo!

## Technologies
* JavaScript
* HTML5
* CSS
* VSCode
* Git
* GitHub
* Chrome Developer Edition

## Game functions
Space Invaders has had many variations through the years. If you distil it to its most pure form you get the following: 
* A user ship that shoots.
* Incoming enemies.
* A score board.
* Play / stop buttons.

To build toward an MVP I needed: 
* Create a grid inside HTML
* Create all interacting elements (invaders, shooting, sprite)
* Player element (position, speed, size)
* Make key listener (left, right, up)
* Enemy movement
* Scoreboard

## Design
Turns out, by choosing Pokémon I had a wealth of assets available to use on the internet. By basing it on a particular game, I even got a colour palette to work with. Soft blues and greens are typical in the Pokemon universe and have been largely unchanged for the 25 years the franchise has been around. 

![](https://i.pinimg.com/originals/d3/a8/1f/d3a81fefaa257e162b6c025c964f5422.png)

## Creating a grid

![JS Code snippet](https://imgur.com/a/rJNrHFP)

This section of code was for initialising all the basic elements of the game. I used a for loop to generate a grid inside a div. Along with setting the initial location of the player with the variable `let pokeSpriteLocation = 202`; this has to be a mutable variable because the player will inevitably change the position of the sprite.

I included classic Pokemon battle music, but we all know that music on a website can be extremely irritating so I made sure to include a mute switch. 

## CSS

As well as JavaScript, this was the first time I implemented CSS Flexbox. I used `display: flex` on the outer container/section and could then justify the content where I needed it to be relative to the viewport.


![css code snippet](https://imgur.com/j9HR9ZP)

## Stretch goals
In my version of the game, there is a row of Pokemon at the bottom with what seems to be the Bulbasaur highlighted and chosen for battle in the main game.

With more time for the project, I would have developed a Pokemon picker that would let you choose your pokemon and then reveal the information about that Pokemon in the Pokédex. 
![Pokedex example](https://th.bing.com/th/id/R.0b735a03b878f77afbf7debc65d39968?rik=LJ8rbs68BEYrxA&riu=http%3a%2f%2ffc00.deviantart.net%2ffs70%2ff%2f2012%2f117%2f2%2f8%2fpokedex_entry_001_bulbasaur_by_kburnsf-d4xsm7o.png&ehk=bIZ3bQON9uschHOubpzQ2fboU3CoBSWcyaSS3fMDCeQ%3d&risl=&pid=ImgRaw&r=0)

## Wins & Challenges
This was an amazing learning experience. A bit like jumping off the ledge and into the deep end, but it fully immersed me in vanilla JavaScript and understanding the fundamentals of how a website works and renders content. 

As it was my first time writing logic in JavaScript, there were of course some challenges. 
* It was a struggle to know when it was best to use switch statements or if/else statements. It took some trial and error to find the clearest way of writing logic for the sprite movement.
* This was a good way to wrap my head around CSS flexbox, but it was quite difficult to implement some of the styling. I found Chrome developer tools extremely helpful to iterate on CSS properties and get instant feedback.


## More about me
You can find me at www.tomriley.dev where I maintain all my live portfolio projects. You can also email me ➡️[📧(click me!)](mailto:hello@tomriley.dev)⬅️  

I’m a junior software engineer with a whole lot of love for tech and learning. Connect with me on [LinkedIn](https://www.linkedin.com/in/tomcriley/)!
