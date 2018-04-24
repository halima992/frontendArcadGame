/**
* @description Represented the enemies , thier position and what happend if there collion 
* @constructor
* @param {number} x - The starter position of the enemy of x-axis on canvas
* @param {number} y - The starter position of the enemy of y-axis on canvas
*/
var Enemy = function(x, y) {

    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position to repeat the out of enemies always  
Enemy.prototype.update = function(dt) {

    if (this.x < 505) {
        this.x = this.x + ((Math.floor(350 * Math.random()) + 250) * dt);
    } else {
        this.x = 0;
        this.y = 60 + Math.floor(Math.random() * 184);
    }

    if (player.x < this.x + 65 && player.y < this.y + 43 && player.x > this.x - 27 && player.y > this.y - 56) {
        player.x = 200;
        player.y = 400;
        numOfLose++;
        collitionHappend = true;
    }

};
// Draw the enemy on the screen,add some style as the color of canvas,  number of pass and lose
Enemy.prototype.render = function() {
    ctx.font = '30px Arial';
    ctx.fillStyle = '#59b300';
    ctx.shadowColor = '#F8F8F8';
    ctx.shadowBlur = 200;
    ctx.fillText("pass: " + numOfPass, 10, 40);
    ctx.fillText("lose: " + numOfLose, 400, 40);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/**
* @description Represented the player , thier position accroding to press key 
* @constructor
* @param {number} x - The starter position of the player of x-axis on canvas
* @param {number} y - The starter position of the player of y-axis on canvas
*/

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-cat.png';

    }
	
    // Update the player's position and don't let her out from her space   
    update() {

        if (this.y > 400)
            this.y = 400;

        if (this.x > 400)
            this.x = 400;
        if (this.x < 0)
            this.x = 0;

        if (this.y < -40) {
            numOfPass++;
            this.x = 200;
            this.y = 400;
        }
    }
	// Draw the player on the screen,add some style when collion happend 
    render() {
        if (collitionHappend) {
            ctx.shadowColor = 'red';
            ctx.shadowBlur = 200;
            collitionHappend = false;
        }
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
	// for hanlding the key press and determining where the player must go after a click 
    handleInput(keyPress) {

        if (keyPress === 'left')
            this.x -= 90;

        if (keyPress === 'up')
            this.y -= 90;
        if (keyPress === 'right')
            this.x += 90;
        if (keyPress === 'down')
            this.y += 90;
    }

}

//define the needed variable
let collitionHappend = false,
    numOfPass = 0,
    numOfLose = 0,
    allEnemies = [],
    player = new Player(200,400),
    enemy;
// for assign the values of x-axis and y-axis for enamy	
for (let i = 0; i < 4; i++) {
    enemy = new Enemy(0, 60 + Math.floor(Math.random() * 180))
    allEnemies.push(enemy);
}
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