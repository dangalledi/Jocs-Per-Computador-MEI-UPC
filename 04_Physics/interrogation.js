const INTERROGATION_ACTIVE = 0;
const INTERROGATION_ENDS = 1;

function Interrogation(x, y)
{
	var interrogation = new Texture("imgs/interrogation.png");

	// Prepare interrogation sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, interrogation);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(INTERROGATION_ACTIVE, [0, 0, 16, 16]);
	this.sprite.addKeyframe(INTERROGATION_ACTIVE, [16, 0, 16, 16]);
	this.sprite.addKeyframe(INTERROGATION_ACTIVE, [32, 0, 16, 16]);
	this.sprite.addKeyframe(INTERROGATION_ACTIVE, [48, 0, 16, 16]);
	
	this.sprite.addAnimation();
	this.sprite.addKeyframe(INTERROGATION_ENDS, [64, 0, 16, 16]);

	this.sprite.setAnimation(INTERROGATION_ACTIVE);
}
// ahi esta el tile de despues de haberle pegado 

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




