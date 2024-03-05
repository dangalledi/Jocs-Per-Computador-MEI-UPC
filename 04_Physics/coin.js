const COIN_ACTIVE = 0;

function Coin(x, y)
{
	var coin = new Texture("imgs/coin.png");

	// Prepare coin sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, coin);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(COIN_ACTIVE, [0, 0, 16, 16]);
	this.sprite.addKeyframe(COIN_ACTIVE, [16, 0, 16, 16]);
	this.sprite.addKeyframe(COIN_ACTIVE, [32, 0, 16, 16]);
	this.sprite.addKeyframe(COIN_ACTIVE, [48, 0, 16, 16]);

	this.sprite.setAnimation(COIN_ACTIVE);
}


Coin.prototype.update = function update(deltaTime)
{
	this.sprite.update(deltaTime);
}

Coin.prototype.draw = function draw()
{
	this.sprite.draw();
}

Coin.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}




