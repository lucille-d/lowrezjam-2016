"use strict";

/**
 * TODO:
 * - avoid berry leaving the scene -> method isLeavingScene()?
 * - constant generation of berries and enemies (min number of items)
 * - player death
 * - end condition (score / lives)
 * - restart mechanic
 * - bounce() to change direction
 * - electron packaging
 * - update readme
 * - submit
 */

const GRID_SIZE = 64;
const game = new Game(GRID_SIZE, 8);
const player = new Player(1, 30, 30,
    onCollisionWithBerry,
    onCollisionWithBadBerry);

game.addGameObject(player);

let berries = createBerries();
berries.forEach((berry) => game.addGameObject(berry));

game.play();

function createBerries() {
    let numberOfBerries = Math.floor((Math.random() * 10) + 1);
    let numberOfBadBerries = Math.floor((Math.random() * (numberOfBerries / 3)) + 1);
    let berries = [];
    for (let i = 0; i < numberOfBerries + numberOfBadBerries; i++) {
        let newBerry;
        let newBerryPosition = {
            x: Math.floor((Math.random() * (GRID_SIZE - 1)) + 1),
            y: Math.floor((Math.random() * (GRID_SIZE - 1)) + 1)
        };
        let newBerryMovement = {
            x: 0, //Math.floor((Math.random() * 3) - 1),
            y: 0 //Math.floor((Math.random() * 3) - 1)
        };
        let newBerryType = 'item';
        if (i > numberOfBerries) { //bad berry territory
            newBerryType = 'enemy';
        }
        newBerry = new GameObject(newBerryType, 1,
            newBerryPosition.x, newBerryPosition.y,
            newBerryMovement.x, newBerryMovement.y
        );
        berries.push(newBerry);
    }
    return berries;
}


//DEFINE PLAYER BEHAVIOUR ON COLLISION HERE WITH CALLBACKS
function onCollisionWithBerry(berry) {
    player.size++;
    game.score++;
    game.removeGameObject(berry);
}

function onCollisionWithBadBerry(berry) {
    if (player.size > 1) {
        player.size--;
    } else {
        player.die();
    }
    game.removeGameObject(berry);
}
