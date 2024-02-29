const WALK = 0;
const DIE = 1;

function Goomba(x, y)
{
	this.live = true;
	this.active = true;

	var goomba = new Texture("imgs/goomba.png");

	// Prepare coin sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 2, goomba);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(WALK, [0, 0, 16, 16]);
	this.sprite.addKeyframe(WALK, [16, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(DIE, [32, 0, 16, 16]);

}

Goomba.prototype.die = function die(){
	this.live = false;
	setTimeout(() => {
		this.active = false;
	}, 1000);
}

Goomba.prototype.update = function update(deltaTime)
{   
    if(this.live){
        if(this.sprite.currentAnimation != WALK) {
            this.sprite.setAnimation(WALK);
        }
    } else {
        if(this.sprite.currentAnimation != DIE) {
            this.sprite.setAnimation(DIE);
        }
    }
    // Update sprites
    this.sprite.update(deltaTime);
}

Goomba.prototype.draw = function draw()
{
	this.sprite.draw();
}

Goomba.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}




