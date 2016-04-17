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

game.play(spawnBerry);

function spawnBerry() {
    //good or bad berry
    let newBerry;
    let isBad = Math.random() > 0.9; //make dynamic with game difficulty (score)
    if (Math.random() > 0.6) { //1 out of 10 chance to spawn
        let newBerryPosition = {
            x: Math.floor((Math.random() * (GRID_SIZE - 1)) + 1),
            y: Math.floor((Math.random() * (GRID_SIZE - 1)) + 1)
        };


        let newBerryMovement = {
            x: Math.floor((Math.random() * 3) - 1),
            y: Math.floor((Math.random() * 3) - 1)
        };
        if (Math.random() > 0.5) {
            newBerryPosition.x = 0;
            newBerryMovement.x = 1;
        } else {
            newBerryPosition.y = 0;
            newBerryMovement.y = 1;
        }
        let newBerrySpeed = Math.random();
        let newBerryType = 'item';
        if (isBad) {
            newBerryType = 'enemy';
        }
        newBerry = new GameObject(newBerryType, 1,
            newBerryPosition.x, newBerryPosition.y,
            newBerryMovement.x, newBerryMovement.y,
            newBerrySpeed
        );
    }
    return newBerry;
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
