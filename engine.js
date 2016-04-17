"use strict";

const types = {
    PLAYER: 'player',
    ITEM: 'item',
    ENEMY: 'enemy'
};

class GameObject {
    constructor(type, size, xPos, yPos, xMovement = 0, yMovement = 0, speed = 0.5) {
        this.position = {
            x: xPos,
            y: yPos
        };
        this.movement = {
            x: xMovement,
            y: yMovement
        };
        this.speed = speed;
        this.size = size;
        this.type = type;
    }

    setId(value) {
        this.id = value;
    }

    move() {
        this.position.x += this.movement.x * this.speed;
        this.position.y += this.movement.y * this.speed;
    }
}

class Player extends GameObject {
    constructor(size, xPos, yPos, onCollisionWithItem, onCollisionWithEnemy) {
        super(types.PLAYER, size, xPos, yPos, 0, 0);
        this.onCollisionWithItem = onCollisionWithItem;
        this.onCollisionWithEnemy = onCollisionWithEnemy;
    }

    move(newPosition) {
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
}

class Game {
    constructor(GRID_SIZE, pixel_size) {
        this.GRID_SIZE = GRID_SIZE;
        this.PIXEL_SIZE = pixel_size;
        this.maxObjectId = 0;

        const game = document.querySelector('#game');
        this.c = game.getContext('2d');

        game.width = this.GRID_SIZE * this.PIXEL_SIZE;
        game.height = this.GRID_SIZE * this.PIXEL_SIZE;

        this.grid = [];
        this.gameObjects = [];
        this.score = 0;

        this.initGameGrid();

        //detect mouse position for player movement
        this.mousePosition = {};
        game.addEventListener('mousemove', (e) => {
            if (e.offsetX) {
                this.mousePosition.x = e.offsetX;
                this.mousePosition.y = e.offsetY;
            } else if (e.layerX) {
                this.mousePosition.x = e.layerX;
                this.mousePosition.y = e.layerY;
            }
        });

        //detect mouse enter/leave for pausing the game
        game.addEventListener('mouseenter', (e) => {
            if (this.player.alive) {
                this.isPlaying = true
            }
        });
        game.addEventListener('mouseleave', (e) => this.isPlaying = false);
        game.addEventListener('click', (e) => {
            if (!this.player.alive) {
                this.startPlaying();
            }
        });
    }

    initGameGrid() {
        for (let i = 0; i < this.GRID_SIZE; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.GRID_SIZE; j++) {
                this.grid[i][j] = null;
            }
        }
    }

    addGameObject(gameObject) {
        gameObject.setId(++this.maxObjectId);
        if (gameObject.type === types.PLAYER) {
            this.player = gameObject;
        } else {
            this.gameObjects.push(gameObject);
        }
        return this.gameObjects;
    }

    removeGameObject(gameObject) {
        let indexOfItem = null;
        this.gameObjects.forEach((object, index) => {
            if (object.id === gameObject.id) {
                indexOfItem = index;
                return;
            }
        });
        if (indexOfItem !== null) {
            return this.gameObjects.splice(indexOfItem, 1);
        }
        return null;
    }

    startPlaying(spawnFunction) {
        console.log("start playing");
        if (spawnFunction) {
            this.spawnFunction = spawnFunction;
        }
        this.score = 0;
        this.player.alive = true;
        this.isPlaying = true;
        this.play();
    }

    play() {
        if (this.isPlaying === true) {
            if (this.score > 100) {
                this.win();
            }
            this.moveItems();
            this.detectCollisions();
            this.renderGame();
            let newGameObject = this.spawnFunction();
            if (newGameObject) {
                this.addGameObject(newGameObject);
            }
        }
        requestAnimationFrame(() => this.play());
    }

    moveItems() {
        this.player.move(this.getNewPlayerPosition());
        this.gameObjects.forEach((gameObject) => {
            gameObject.move();
            if (this.isOutsideOfGameArea(gameObject)) {
                this.removeGameObject(gameObject)
            }
        });
    }

    isOutsideOfGameArea(gameObject) {
        return gameObject.position.x < 0 || gameObject.position.x > this.GRID_SIZE || gameObject.position.y < 0 || gameObject.position.y > this.GRID_SIZE;
    }

    detectCollisions() {
        this.gameObjects.forEach((gameObject) => {
            if (this.isCollidingWithPlayer(gameObject)) {
                if (gameObject.type === types.ITEM) {
                    this.player.onCollisionWithItem(gameObject);
                } else if (gameObject.type === types.ENEMY) {
                    this.player.onCollisionWithEnemy(gameObject);
                }
            }
        });
    }

    isCollidingWithPlayer(gameObject) {
        return this.player.position.x < gameObject.position.x + gameObject.size &&
            this.player.position.x + this.player.size > gameObject.position.x &&
            this.player.position.y < gameObject.position.y + gameObject.size &&
            this.player.size + this.player.position.y > gameObject.position.y;
    }

    renderGame() {
        this.c.clearRect(0, 0, this.GRID_SIZE * this.PIXEL_SIZE, this.GRID_SIZE * this.PIXEL_SIZE);

        this.grid.forEach((line, lineIdx) => {
            line.forEach((square, sqIdx) => {
                //draw player
                this.c.fillStyle = 'white';
                if (sqIdx === this.player.position.x &&
                    lineIdx === this.player.position.y) {
                    this.c.fillRect(sqIdx * this.PIXEL_SIZE,
                        lineIdx * this.PIXEL_SIZE,
                        this.PIXEL_SIZE * this.player.size,
                        this.PIXEL_SIZE * this.player.size);
                }

                //draw game objects
                this.gameObjects.forEach((gameObject) => {
                    if (gameObject.type === types.ITEM) {
                        this.c.fillStyle = 'blue';
                    } else if (gameObject.type === types.ENEMY) {
                        this.c.fillStyle = 'red';
                    }
                    if (sqIdx === Math.floor(gameObject.position.x) &&
                        lineIdx === Math.floor(gameObject.position.y)) {
                        this.c.fillRect(sqIdx * this.PIXEL_SIZE,
                            lineIdx * this.PIXEL_SIZE,
                            this.PIXEL_SIZE * gameObject.size,
                            this.PIXEL_SIZE * gameObject.size);
                    }
                });
            });
        });
        this.updateScoreDisplay();
    }

    getNewPlayerPosition() {
        let newPosition = {
            x: this.player.position.x,
            y: this.player.position.y,
        };
        if (this.mousePosition.x && this.mousePosition.y) {
            newPosition.x = Math.floor(this.mousePosition.x / this.PIXEL_SIZE);
            newPosition.y = Math.floor(this.mousePosition.y / this.PIXEL_SIZE);
        }
        return newPosition;
    }

    updateScoreDisplay() {
        document.querySelector('#score')
            .innerHTML = this.score + ' pts';
    }

    win() {
        this.endGame(true);
    }

    lose() {
        this.endGame(false);
    }

    endGame(victory) {
        this.isPlaying = false;
        this.gameObjects = [];
        this.displayEndScreen(this.score);
        this.score = 0;
        this.player.alive = false;
    }

    displayEndScreen(score) {
        this.c.save();
        this.c.clearRect(0, 0, this.GRID_SIZE * this.PIXEL_SIZE, this.GRID_SIZE * this.PIXEL_SIZE);
        this.c.fillStyle = 'white';
        let pixelsInGameOver = [{
            x: 10,
            y: 10
        }];
        pixelsInGameOver.forEach((pixel) => {
            this.drawPixel(pixel.x, pixel.y);
        });
        this.c.restore();
    }

    drawPixel(x, y, color) {
        this.c.save();
        if (color) {
            this.fillStyle = color;
        } else {
            this.fillStyle = 'white';
        }
        this.c.fillRect(x * this.PIXEL_SIZE,
            y * this.PIXEL_SIZE,
            this.PIXEL_SIZE,
            this.PIXEL_SIZE);
        this.c.restore();
    }
}
