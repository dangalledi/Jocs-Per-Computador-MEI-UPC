


function Flag(x,y) {

    var flag = new Texture("imgs/fondo.png");

	this.active = true;

	this.originalY = y;

	// Prepare interrogation sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, flag);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 192, 32, 32]);

	this.sprite.setAnimation(0);
}

Flag.prototype.update = function update(deltaTime){
    this.sprite.update(deltaTime);
}

Flag.prototype.collisionBox = function(){
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	return box;
}

Flag.prototype.draw = function draw(){
    this.sprite.draw();
}