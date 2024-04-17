const INTERROGATION_ACTIVE = 0;
const INTERROGATION_ENDS = 1;


function InterrogationBox(x, y)
{
	var interrogation = new Texture("imgs/interrogation.png");

	this.activeView = true;

	this.active = true;
	this.recompensa = true;
	this.originalY = y;
	this.maxBounceHeight = 15; // Change this to the maximum bounce height you want
	this.bouncing = false;

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

InterrogationBox.prototype.update = function update(deltaTime)
{
	if(!this.active){
		if(this.sprite.currentAnimation != INTERROGATION_ENDS){
			this.sprite.setAnimation(INTERROGATION_ENDS);
		}
	}
	if (this.bouncing && this.active) {
		if (this.goingUp) {
			if (this.sprite.y > this.originalY - this.maxBounceHeight) {
				this.sprite.y -= 2;
			} else {
				this.goingUp = false;
			}
		} else {
			//momento en que aparece la recompensa?
			this.sprite.y += 2;
			if (this.sprite.y >= this.originalY) {
				this.sprite.y = this.originalY;
				this.bouncing = false;
				this.goingUp = true;
			}
		}
	}
	this.sprite.update(deltaTime);
}

InterrogationBox.prototype.die = function die(){
	this.recompensa = false;
	setTimeout(() => {
		this.active = false;
	}, 400);
}

InterrogationBox.prototype.draw = function draw()
{
	this.sprite.draw();
}

InterrogationBox.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}




