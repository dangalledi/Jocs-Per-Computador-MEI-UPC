

function Brick(x, y)
{
	var brick = new Texture("imgs/fondo");

	// Prepare coin sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, brick);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [96, 0, 32, 32]);
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




