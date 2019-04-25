const rowSize = 83;
const colSize = 101;
const enemyStartX = -100
const bugWidth = 50
const bugHeight = 50

// Enemies our player must avoid
class Enemy {
    constructor(x=50, y=50, speed=2) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    update(dt) {
        this.x = this.speed * dt + this.x;
        if (this.x > 500) {
            this.x = enemyStartX;
            this.speed = generateRandomNumber(50, 100);
        }
        this.handleCollision();

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleCollision() {
          if (player.x < this.x + bugWidth && player.x > this.x - bugWidth &&
              player.y < this.y + bugHeight && player.y > this.y - bugHeight) {
              player.reset();
          }
//        console.log(player.x);
    }
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(x=200, y=400) {
        this.sprite = 'images/char-boy.png';
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
    }

    update(dt) {
        // implement update here
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

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

    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }

    handleSuccess(){
        alert("You won");
        this.reset();
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
function generateEnemies(){
    let allEnemies = [];
    const enemyYPositions = [60, 60, 145, 145, 230, 230];
//    const numEnemies = Math.floor(Math.random() * enemyYPositions.length) + 1;
    const numEnemies = 6;
    for (let i=0; i < numEnemies; i++){
        allEnemies.push(new Enemy(enemyStartX, enemyYPositions[generateRandomNumber(0, enemyYPositions.length)],
                                       generateRandomNumber(50, 100)));
    }
    return allEnemies
}

function generateRandomNumber(low=1, high=100) {
    const randomNumber = Math.floor(Math.random() * high) + low
    return randomNumber;
}

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
