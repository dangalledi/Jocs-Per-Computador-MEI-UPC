const WALK_LEFT = 0;
const WALK_RIGHT = 1;
const DIE = 2;

function Goomba(x, y, map) {
	// Set tilemap for collisions
	this.map = map;
	//Direccion inicial de goomba
	this.direction = "left"

	// Set attributes for vivo y activo
	this.live = true;
	this.active = true;
	this.move = false;

	// Load goomba texture
	var goomba = new Texture("imgs/goomba.png");

	// Prepare coin sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 2, goomba);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(WALK_LEFT, [0, 0, 16, 16]);
	this.sprite.addKeyframe(WALK_LEFT, [16, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(WALK_RIGHT, [0, 0, 16, 16]);
	this.sprite.addKeyframe(WALK_RIGHT, [16, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(DIE, [32, 0, 16, 16]);

	this.upBrick = false; //piso brick
	this.downBrick = false; //choque arriba ladrillo
	this.down = false;
	this.leftColision = false;
	this.rigthColision = false;
}

Goomba.prototype.die = function die() {
	this.live = false;
	setTimeout(() => {
		this.active = false;
	}, 1000);
}

Goomba.prototype.update = function update(deltaTime) {
	if (this.live) {
		this.controlFormaBrick(this.map.bricks);
		this.controlFormaBrick(this.map.interrogation);
		if (this.move) {
			if (this.direction == "left") {
				if (this.sprite.currentAnimation != WALK_LEFT) {
					this.sprite.setAnimation(WALK_LEFT);
				}
				this.sprite.x -= 1;
				if (this.map.collisionMoveLeft(this.sprite)) {
					this.sprite.x += 1;
					this.direction = "right";
				}
			} else {
				if (this.sprite.currentAnimation != WALK_RIGHT) {
					this.sprite.setAnimation(WALK_RIGHT);
				}
				this.sprite.x += 1;
				if (this.map.collisionMoveRight(this.sprite)) {
					this.sprite.x -= 1;
					this.direction = "left";
				}
			}
		}

		this.sprite.y += 2;
		if (this.map.collisionMoveDown(this.sprite)) {

		}
	}
	else {
		// Die
		if (this.sprite.currentAnimation != DIE) {
			this.sprite.setAnimation(DIE);
		}
	}
	// Update sprites
	this.sprite.update(deltaTime);

}

Goomba.prototype.draw = function draw() {
	this.sprite.draw();
}

Goomba.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);

	return box;
}


Goomba.prototype.controlFormaBrick = function (ladrillos) {
	for (var i = 0; i < ladrillos.length; i++) {
		var brick = ladrillos[i];
		var col = this.collisionBox().intersectSide(brick.collisionBox());

		if (!!col && col[1] === 'arriba') {
			this.bJumping = false;
			this.downBrick = true
		}
		if (!!col && col[1] === 'abajo') {
			// If the player is colliding with the brick, move the player to the top of the brick
			this.sprite.y = brick.sprite.y - this.sprite.height;
			// this.bJumping = false;
			this.upBrick = true
		}
		if (!!col && col[0] === 'derecha') {
			if (!!col && col[1] != 'abajo') this.sprite.x -= 2;
			// this.bJumping = false;
		}
		if (!!col && col[0] === 'izquierda') {
			if (!!col && col[1] != 'abajo') this.sprite.x += 2;
			// this.bJumping = false;
		}
	}
}

