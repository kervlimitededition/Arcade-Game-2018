// Enemies our player must avoid
class Enemy {
    constructor (xPosition, yPosition, speed) {
        // Variables applied to each of our instances go here,
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.speed = speed;
    };
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.xPosition += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xPosition, this.yPosition);
    };


// Now write your own player class
class Player {
    constructor (xPosition, yPosition) {
        this.xPosition = xPosition * 2;
        this.yPosition = yPosition * 5;
        this.playerMove = false;
        this.playerWon = false;
        this.sprite = 'images/char-boy.png';
    }
    
    handleInput(input) {
        switch(input) {
            case 'left':
                if(this.xPosition >= 0 && this.xPosition >= 35) {
                    this.xPosition -= 101;
                }
            break;
            case 'right': 
                if(this.xPosition <= 505 && this.xPosition <= 350) {
                    this.xPosition += 101;
                }
            break;
            case 'up':
                if(this.yPosition >= 0) {
                    this.yPosition -= 83;
                }
            break;
            case 'down':
                if(this.yPosition < 606 && this.yPosition <=380) {
                    this.yPosition += 83;
                }
        }
    }
}
// This class requires an update(), render() and
Player.prototype.update = function(dt) {
    
}
// a handleInput() method.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xPosition, this.yPosition);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// allEnemies.push(enemy);
// Place the player object in a variable called player
var player = new Player(101, 81);

//initiate enemies
let littleBugs1 = new Enemy(10, 60, 100);
let littleBugs2 = new Enemy(20, 143, 90);
let littleBugs3 = new Enemy(30, 227, 90);
allEnemies = [littleBugs1, littleBugs2, littleBugs3];


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
