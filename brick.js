

function Brick(x, y) {
	var brick = new Texture("imgs/brick.png");
	// Prepare coin sprite & its animation
	this.activeView = true;
	this.active = true;
	this.sprite = new Sprite(x, y, 32, 32, 1, brick);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(1, [0, 16, 16, 16]);

	this.originalY = y;
	this.maxBounceHeight = 15; // Change this to the maximum bounce height you want
	this.bouncing = false;
	this.live = true;
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
	if(this.activeView) this.sprite.draw();
}

Brick.prototype.clean = function clean() {
	this.sprite.setAnimation(1);
	this.live = false;
	setTimeout(() => {
		this.activeView = false;
	}, 125);
}


Brick.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	return box;
}



