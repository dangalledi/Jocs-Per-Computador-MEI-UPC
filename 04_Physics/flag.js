


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

Flag.prototype.draw = function draw(){
    this.sprite.draw();
}