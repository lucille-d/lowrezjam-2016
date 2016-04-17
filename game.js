"use strict";

/**
 * TODO:
 * - restart mechanic
 * - not grow so fast
 * - display score inside game canvas
 * - submit
 * - update readme
 */
 /**
  * NTH:
  * - electron
  * - readme
  * - sound
  * - music
  */


const GRID_SIZE = 64;
const game = new Game(GRID_SIZE, 8);
const player = new Player(1, 30, 30,
    onCollisionWithBerry,
    onCollisionWithBadBerry);

game.addGameObject(player);

game.startPlaying(spawnBerry);
game.win();
game.displayEndScreen();

function spawnBerry() {
    let newBerry;
    let difficulty = game.score / 100;
    if (difficulty < 0.1) {
        difficulty = 0.1;
    } else if (difficulty > 0.9) {
        difficulty = 0.9;
    }
    let isBad = Math.random() > (1 - difficulty);
    if (Math.random() > 0.4) { //1 out of 10 chance to spawn
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

function onCollisionWithBerry(berry) {
    player.size++;
    game.score++;
    game.removeGameObject(berry);
}

function onCollisionWithBadBerry(berry) {
    if (player.size > 1) {
        player.size--;
    } else {
        game.lose();
    }
    game.removeGameObject(berry);
}
