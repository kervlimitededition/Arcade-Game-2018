//
let playAgain = document.querySelector('.playAgain');
// const messageStatus = document.querySelector('.displayMessage');
const ExitGame = document.querySelector('.exitGame');
const modal = document.querySelector('.modal');
// let GWindow = global.window,
//     id; 

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
        this.originalXPosition = xPosition; // **Store the original x position (used to reset an enemy's position)
        this.canMove = true; // **Enemies cannot move until the game starts
    };

    // Draw the enemy on the screen, required method for game
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.xPosition, this.yPosition);
    };

    //let's reset the enemies position
    resetPosition() {
        this.xPosition = this.originalXPosition;
    }

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.xPosition += this.speed * dt;
    if (this.xPosition > 505) { // Reset enemy position once it leaves the visible canvas
        this.resetPosition();
    }
      
    //check for crashes :)
    if (!player.crashes) {
        if(this.xPosition + 70 > player.xPosition && this.xPosition - 70 < player.xPosition &&
            this.yPosition + 70 > player.yPosition && this.yPosition - 70 < player.yPosition){
                player.crashes = true;
                resetPlayer();
        }
    }


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

    // a handleInput() method.
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
            break;
        }
    }

    // This class requires an update(), render()
    update(dt) {
        // this.playerWin();     
        if(this.yPosition <= 69){
            showMessage();
            this.playerWon = true;
            // modal.classList.toggle('show')
        }  
    };

    playerWin() { // condition to check when player win
        
    };

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.xPosition, this.yPosition);
    };

    //reset player position
    resetPosition () {
        this.xPosition = this.originalXPosition;
        // this.hideMessage();
        // allEnemies = [];
    }
}

//give user an option to play the game again
    playAgain.addEventListener('click', function() {
        // resetGame();
        window.location.reload();
        player.resetPosition(); 
    });

//give user an option to exit the game
    ExitGame.addEventListener('click', function() {
        close();
    });
    
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

//reset functions
function resetPlayer() {
    player = new Player(101, 81);
}

function resetGame() {
    window.location.reload(true);

}
//adds and hide message when player win, start and restart the game.
    function showMessage() {
        modal.style.visibility = 'visible';
    }

// function hideMessage() {
//     modal.style.visibility = 'hidden';
// }


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
