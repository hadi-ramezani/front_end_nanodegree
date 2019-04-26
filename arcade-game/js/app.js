const rowSize = 83;
const colSize = 101;
const enemyStartX = -100
const bugWidth = 50
const bugHeight = 50
const initialLives = 3;
let minimumBugSpeed = 50;

/**
 * @description The Enemy class to build the enemies that our player must avoid
 */
class Enemy {
    /**
     * @description The Enemy constructor method. The constructor accepts the coordinates and speed of an enemy and
     * sets the sprite internally.
     * @param {number} x - The x coordinate of the enemy
     * @param {number} y - The y coordinate of the enemy
     * @param {number} speed - The speed of the enemy
    */
    constructor(x=50, y=50, speed=2) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    /**
     * @description Make the update to the enemy. To ensure, the game runs at the same speed in different computers,
     * scale down the speed before making moving the enemy along the x direction.
     * @param {number} dt - The value used to scale down the speed.
     * @returns null
    */
    update(dt) {
        this.x = this.speed * dt + this.x;
        if (this.x > 500) {
            this.x = enemyStartX;
            this.speed = generateRandomNumber(minimumBugSpeed, minimumBugSpeed + 50);
        }
        this.handleCollision();
    }

    /**
     * @description Render the enemy using the image and coordinates. Also, render the information related to the game
     * including the number of lives, point, and stage on the screen.
     * @returns null
    */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        ctx.fillStyle = "#FF33E3";
        ctx.font = "22px Arial";
        ctx.fillText(`Point: ${player.point}`, 0, 40);
        ctx.fillText(`Lives: ${player.lives}`, 200, 40);
        ctx.fillText(`Stage: ${player.stage}`, 400, 40);
    }

    /**
     * @description Determine if a collision between the player and a bug has happened or not. If so, reset the game and
     * take one life.
     * @returns null
    */
    handleCollision() {
          if (player.x < this.x + bugWidth && player.x > this.x - bugWidth &&
              player.y < this.y + bugHeight && player.y > this.y - bugHeight) {
              player.lives -= 1;
              player.reset();
          }
    }
}


/**
 * @description The player class to build the player
 */
class Player {

    /**
     * @description The Player constructor method. The constructor accepts the coordinates of the player and
     * sets the sprite internally.
     * @param {number} x - The x coordinate of the player
     * @param {number} y - The y coordinate of the player
    */
    constructor(x=200, y=400) {
        this.sprite = 'images/char-boy.png';
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
        this.point = 0;
        this.lives = initialLives;
        this.stage = 1;
    }

    /**
     * @description Make the update to the player.
     * @returns null
    */
    update(dt) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * @description Render the enemy using the image and coordinates.
     * @returns null
    */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * @description Handle the keypress by updating the coordinates of the player. Make sure the player will not move
     * off-screen. If the player, has reached the water, make the call to handleSuccess method.
     * @returns null
    */
    handleInput(key) {
        switch (key ) {
            case "up":
                if (this.y < rowSize) {
                    this.handleSuccess();
                } else {
                    this.y -= rowSize
                };
                break;
            case "down":
                if (this.y < 400) {
                    this.y += rowSize
                };
                break;
            case "right":
                if (this.x < 400) {
                    this.x += colSize;
                }
                break;
            case "left":
                if (this.x > 0) {
                    this.x -= colSize;
                }
                break;
        }
    }

    /**
     * @description Move the player to the starting point if a collision has happened. Also, reset the game if the player
     * runs out of lives. r of lives, point, and stage on the screen.
     * @returns null
    */
    reset() {
        this.x = this.startX;
        this.y = this.startY;
        if (this.lives < 0) {
            showModal();
            this.point = 0;
            this.lives = initialLives;
            this.stage = 1;
            minimumBugSpeed = 50;
            generateEnemies();
        }
    }

    /**
     * @description When the player reaches the water, increment the stage, points, and bug speed.
     * @returns null
    */
    handleSuccess(){
        this.point += this.stage;
        this.reset();
        this.stage += 1;
        minimumBugSpeed += 10;
        generateEnemies();
    }
}

/**
 * @description Generate an array of enemies and put them in an array.
 * @returns {array} - An array of Enemy objects.
*/
function generateEnemies(){
    let allEnemies = [];
    const enemyYPositions = [60, 60, 145, 145, 230, 230];
//    const numEnemies = Math.floor(Math.random() * enemyYPositions.length) + 1;
    const numEnemies = 6;
    for (let i=0; i < numEnemies; i++){
        allEnemies.push(new Enemy(enemyStartX, enemyYPositions[generateRandomNumber(0, enemyYPositions.length)],
                                       generateRandomNumber(minimumBugSpeed, minimumBugSpeed + 50)));
    }
    return allEnemies
}

/**
 * @description Generate a random number between two boundaries.
 * @param {number} low - The lower limit for the random number.
 * @param {number} high - The upper limit fot the generated random number.
 * @returns null
*/
function generateRandomNumber(low=1, high=100) {
    const randomNumber = Math.floor(Math.random() * high) + low
    return randomNumber;
}

// create the objects
allEnemies = generateEnemies();
player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
