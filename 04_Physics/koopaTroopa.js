

function KoopaTroopa(x, y, map) {
	// Set tilemap for collisions
	this.map = map;
	//Direccion inicial de KoopaTroopa
	this.direction = "right"

	// Set attributes for vivo y activo
	this.live = true;
	this.active = true;
	this.move = true;

	// Load KoopaTroopa texture
	var koopa = new Texture("imgs/KoopaTroopas.png");

	// Prepare coin sprite & its animation
	this.sprite = new Sprite(x, y, 32, 48, 2, koopa);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(WALK_LEFT, [0, 0, 16, 24]);
	this.sprite.addKeyframe(WALK_LEFT, [16, 0, 16, 24]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(WALK_RIGHT, [32, 24, 16, 24]);
	this.sprite.addKeyframe(WALK_RIGHT, [48, 24, 16, 24]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(DIE, [32, 0, 16, 16]);

	this.upBrick = false; //piso brick
	this.down = false;
}

KoopaTroopa.prototype.die = function die() {
	this.live = false;
	setTimeout(() => {
		this.active = false;
	}, 1000);
}

KoopaTroopa.prototype.update = function update(deltaTime) {
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
		this.map.collisionMoveDown(this.sprite)

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

KoopaTroopa.prototype.draw = function draw() {
	if(this.active) this.sprite.draw();
}

KoopaTroopa.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);

	return box;
}


KoopaTroopa.prototype.controlFormaBrick = function (ladrillos) {
	for (var i = 0; i < ladrillos.length; i++) {
		var brick = ladrillos[i];
		if(brick.activeView){
			var col = this.collisionBox().intersectSide(brick.collisionBox());

			if (!!col && col[1] === 'abajo') {//koopa
				this.sprite.y  = brick.sprite.y - this.sprite.height+4;
			}
			if (!!col && col[0] === 'derecha') {
				if (!!col && col[1] != 'abajo') this.sprite.x -= 2;
			}
			if (!!col && col[0] === 'izquierda') {
				if (!!col && col[1] != 'abajo') this.sprite.x += 2;
			}
		}
	}
}

