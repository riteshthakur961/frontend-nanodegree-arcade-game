var score = 0;//global variable to hold the player's score.
var lives = 5;//global variable to hold the no. of player's lives left.

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * (300 - 100)) + 100;
    this.width = 100;// to set the width of the bounding boxes helpful in collision detection.
    this.height = 67;// to set the height of the bounding boxes helpful in collision detection.

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x < 505) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //drawBox(this.x, this.y + 77, 100, 67, "yellow"); used to outline the box for the purpose of fine -tuning the collision-detection.
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    Enemy.call(this, 0, 400);
    this.speed = 100;
    this.sprite = "images/char-boy.png";
    this.width = 70;// to set the width of the bounding boxes helpful in collision detection.
    this.height = 75;// to set the height of the bounding boxes helpful in collision detection.
};

Player.prototype = Object.create(Enemy.prototype);

//drawBox(this.x + 17, this.y + 65, 70, 75, "yellow"); used to outline the box for the purpose of fine -tuning the collision-detection.

Player.prototype.update = function(dt) {

    if(this.y < 0) { //when the player reaches to the water(blue-colored tiles)
        this.reset();//bring the player back to the initial position
        score = score + 10;
        document.getElementById("score").innerHTML = "Score: " + score;//increment the score board.
    }

    this.checkCollisions();//check for any collision of the player with the bugs.
};

Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > 0) {
        this.x -= 101;
    } else if (key === 'right' && this.x < 400) {
        this.x += 101;
    } else if (key === 'up' && this.y > 0) {
        this.y -= 83;
    } else if (key === 'down' && this.y < 400) {
        this.y += 83;
    }
};

//bring the player back to the original position
Player.prototype.reset = function() {
    this.x = 0;
    this.y = 400;
};

// Now instantiate your objects.
var enemy1 = new Enemy(0,60);
var enemy2 = new Enemy(0,145);
var enemy3 = new Enemy(0,230);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
var player = new Player();

//check for the collision of player with the bug.
Player.prototype.checkCollisions = function() {
    //collision of player with enemies
    allEnemies.forEach(function(enemy) {
        if (this.x < enemy.x + enemy.width &&
            enemy.x < this.x + this.width &&
            this.y < enemy.y + enemy.height &&
            enemy.y < this.y + this.height
            ) {
            //Collision Detected. Decrement the lives of the player and update it on the scoreboard.
            this.reset();
            lives -=1;
            document.getElementById("lives").innerHTML = "Lives left: " + lives;
            //Game is over!!! Restart the Game.
            if (lives === 0) {
                document.write("<h1>Game Over</h1><h3>Refresh to play again</h3>");
            }
        }
    }.bind(this);

}

//It creates solid boxes around the player and Enemy and facilitates the fine tuning of the collision detection.
/*function drawBox(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}*/

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
