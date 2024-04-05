
function HomgoLive(x, y, map) {
	// Set tilemap for collisions
	this.map = map;
	//Direccion inicial de HomgoMax
	this.direction = "left"

	// Set attributes for vivo y activo
	this.live = true;
	this.active = true;
	this.move = true;

	// Load HomgoMax texture
	var homgoLive = new Texture("imgs/hongos.png");

	// Prepare coin sprite & its homgoMax
	this.sprite = new Sprite(x, y, 32, 32, 2, homgoLive);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [16, 0, 16, 16]);

	this.sprite.setAnimation(0);

	this.upBrick = false; //piso brick
	this.down = false;
}

HomgoLive.prototype.update = function update(deltaTime) {
	if (this.live) {
		this.controlFormaBrick(this.map.bricks);
		this.controlFormaBrick(this.map.interrogation);
		if (this.move) {
			if (this.direction == "left") {
				this.sprite.x -= 1;
				if (this.map.collisionMoveLeft(this.sprite)) {
					this.sprite.x += 1;
					this.direction = "right";
				}
			} else {
				this.sprite.x += 1;
				if (this.map.collisionMoveRight(this.sprite)) {
					this.sprite.x -= 1;
					this.direction = "left";
				}
			}
		}

		this.sprite.y += 2;
		this.map.collisionMoveDown(this.sprite)

		// if(this.upBrick){
		// 	this.upBrick = false;
		// 	this.sprite.y -= 2;
		// }
	}
	// Update sprites
	this.sprite.update(deltaTime);

}

HomgoLive.prototype.draw = function draw() {
	if(this.active) this.sprite.draw();
}

HomgoLive.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);

	return box;
}


HomgoLive.prototype.controlFormaBrick = function (ladrillos) {
	for (var i = 0; i < ladrillos.length; i++) {
		var brick = ladrillos[i];
		if(brick.activeView){
			var col = this.collisionBox().intersectSide(brick.collisionBox());

			if (!!col && col[1] === 'abajo') {
				// If the player is colliding with the brick, move the player to the top of the brick
				this.sprite.y  = brick.sprite.y - 28; //correcta manera paro reobota :c 
				//this.upBrick = true
			}
			if (!!col && col[0] === 'derecha') {
				//this.sprite.x += 1;
				//this.direction = "right";
				if (!!col && col[1] != 'abajo') this.sprite.x -= 2;
			}
			if (!!col && col[0] === 'izquierda') {
				//this.sprite.x -= 1;
				//this.direction = "left";
				if (!!col && col[1] != 'abajo') this.sprite.x += 2;
			}
		}
	}
}

