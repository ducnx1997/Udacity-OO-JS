// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.init();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.init = function() {
    this.x = -100;
    this.y = Math.floor(Math.random() * 3) * 83 + 72;
    this.speed = Math.floor(Math.random() * 200) + 200;
}
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x > 606) {
        this.init();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var resetGame = false;

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 404;
}
var resetGame = function() {
    player.init();
    for (let i = 0; i < allEnemies.length; i++) allEnemies[i].init();
}

var checkCollision = function(x1, x2) {
    if (x1 <= x2 && x2 <= x1 + 100) return true;
    return x2 <= x1 && x1 <= x2 + 100;
}

Player.prototype.update = function() {
    if (this.y < 0) {
        resetGame();
    } else {
        for (let i = 0; i < allEnemies.length; i++) 
            if ((this.y === allEnemies[i].y) && (checkCollision(this.x, allEnemies[i].x))) {
                resetGame();
                break;
            }
    }
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(movement) {
    if (movement === 'left' && this.x > 0) this.x -= 101;
    if (movement === 'right' && this.x < 404) this.x += 101;
    if (movement === 'up' && this.y > 0) this.y -= 83;
    if (movement === 'down' && this.y < 404) this.y += 83;
}
Player.prototype.init = function() {
    this.x = 202;
    this.y = 404;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();


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
