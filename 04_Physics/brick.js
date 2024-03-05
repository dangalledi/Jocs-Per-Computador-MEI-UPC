

function Brick(x, y) {
	var brick = new Texture("imgs/fondo.png");

	// Prepare coin sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 1, brick);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [96, 0, 32, 32]);

	this.originalY = y;
	this.maxBounceHeight = 15; // Change this to the maximum bounce height you want
	this.bouncing = false;
}


Brick.prototype.update = function update(deltaTime) {
	if (this.bouncing) {
		if (this.goingUp) {
			if (this.sprite.y > this.originalY - this.maxBounceHeight) {
				// Move the brick up
				this.sprite.y -= 2;
			} else {
				// Start moving the brick down
				this.goingUp = false;
			}
		} else {
			// Move the brick down
			this.sprite.y += 2;
			// If the brick has returned to its original position, stop bouncing
			if (this.sprite.y >= this.originalY) {
				this.sprite.y = this.originalY;
				this.bouncing = false;
				this.goingUp = true;
			}
		}
	}
	this.sprite.update(deltaTime);
}

Brick.prototype.draw = function draw() {
	this.sprite.draw();
}

Brick.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	return box;
}



