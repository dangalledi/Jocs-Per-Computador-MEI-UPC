

function Interrogation(x, y)
{
	var interrogation = new Texture("imgs/interrogation.png");

	// Prepare interrogation sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, interrogation);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 0, 16, 16]);
	this.sprite.addKeyframe(0, [16, 0, 16, 16]);
	this.sprite.addKeyframe(0, [32, 0, 16, 16]);
	this.sprite.addKeyframe(0, [48, 0, 16, 16]);
}
// ahi esta el tile de despues de haberle pegado 
// this.sprite.addKeyframe(0, [64, 0, 16, 16]);

Interrogation.prototype.update = function update(deltaTime)
{
	this.sprite.update(deltaTime);
}

Interrogation.prototype.draw = function draw()
{
	this.sprite.draw();
}

Interrogation.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}




