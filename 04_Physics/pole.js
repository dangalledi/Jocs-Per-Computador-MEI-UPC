



function Pole(x,y) {
    var pole = new Texture("imgs/fondo.png");

	this.active = true;

	this.originalY = y;

	// Prepare interrogation sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, pole);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [96, 160, 32, 32]);

	this.sprite.setAnimation(0);
}

Pole.prototype.update = function update(deltaTime){
    this.sprite.update(deltaTime);
}

Pole.prototype.draw = function draw(){
    this.sprite.draw();
}