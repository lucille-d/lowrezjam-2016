"use strict";

const GRID_SIZE = 64;
const game = new Game(GRID_SIZE, 8);
const player = new Player(1, 30, 30,
    onCollisionWithBerry,
    onCollisionWithBadBerry);

game.addGameObject(player);

game.spawnFunction = spawnBerry;
game.displayMenu(false);

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
    player.size += 0.2;
    game.score++;
    game.removeGameObject(berry);
}

function onCollisionWithBadBerry(berry) {
    player.size--;
    if (player.size < 1) {
        game.endGame();
    }
    game.removeGameObject(berry);
}
