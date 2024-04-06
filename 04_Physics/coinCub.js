
function CoinCub(x, y)
{
	var coin = new Texture("imgs/coinCub.png");

	this.active = true;
	this.take  = true;

	// Prepare coin sprite & its animation
	this.sprite = new Sprite(x, y, 16, 32, 20, coin);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(COIN_ACTIVE, [0, 0, 8, 16]);
	this.sprite.addKeyframe(COIN_ACTIVE, [8, 0, 8, 16]);
	this.sprite.addKeyframe(COIN_ACTIVE, [16, 0, 8, 16]);
	this.sprite.addKeyframe(COIN_ACTIVE, [24, 0, 8, 16]);

	this.sprite.setAnimation(COIN_ACTIVE);

	//bounce
	this.originalY = y;
	this.maxBounceHeight = 48; // Change this to the maximum bounce height you want
	this.bouncing = true;
	this.goingUp = true;

	setTimeout(() => {
		this.active = false;
	}, 400);
}


CoinCub.prototype.update = function update(deltaTime)
{
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

CoinCub.prototype.draw = function draw()
{
	if(this.active) this.sprite.draw();
}

CoinCub.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}




