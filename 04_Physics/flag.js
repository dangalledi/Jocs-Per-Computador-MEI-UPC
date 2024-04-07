


function Flag() {
    var flag = new Texture("imgs/fondo.png");

	this.active = true;

	this.originalY = y;

	// Prepare interrogation sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, flag);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 96, 16, 16]);

	this.sprite.setAnimation(0);
}

Star.prototype.update = function update(deltaTime){
    this.sprite.update(deltaTime);
}

Star.prototype.draw = function draw(){
    this.sprite.draw();
}