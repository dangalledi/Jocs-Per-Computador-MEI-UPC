DIE_KOOPA = 1
LIVE_KOOPA = 0

function KoopaTroopa(x, y, map) {
	// Set tilemap for collisions
	this.map = map;
	//Direccion inicial de KoopaTroopa
	this.direction = "right"

	// Set attributes for vivo y activo
	this.live = true;
	this.active = true;
	this.move = true;

	this.state = LIVE_KOOPA;
	this.listSprit = []

	// Load KoopaTroopa texture
	var koopa = new Texture("imgs/KoopaTroopas.png");

	// Prepare coin sprite & its animation
	spriteKoopa = new Sprite(x, y, 32, 48, 2, koopa);

	spriteKoopa.addAnimation();
	spriteKoopa.addKeyframe(WALK_LEFT, [0, 0, 16, 24]);
	spriteKoopa.addKeyframe(WALK_LEFT, [16, 0, 16, 24]);

	spriteKoopa.addAnimation();
	spriteKoopa.addKeyframe(WALK_RIGHT, [32, 24, 16, 24]);
	spriteKoopa.addKeyframe(WALK_RIGHT, [48, 24, 16, 24]);

	spriteKoopa.setAnimation(WALK_RIGHT);

	spriteKoopaC = new Sprite(x, y, 32, 32, 2, koopa);

	spriteKoopaC.addAnimation();
	spriteKoopaC.addKeyframe(0, [32, 8, 16, 16]);

	spriteKoopa.setAnimation(0);

	this.listSprit[LIVE_KOOPA] = spriteKoopa;
	this.listSprit[DIE_KOOPA] = spriteKoopaC;

	this.upBrick = false; //piso brick
	this.down = false;
}

KoopaTroopa.prototype.die = function die() {
	this.caparazon();
	this.move = false;

	setTimeout(() => {
		if(!this.move){
			this.returnKoopa();
			this.move = true;
		}
	}, 8000);
}

KoopaTroopa.prototype.caparazon = function caparazon() {
	this.listSprit[DIE_KOOPA].x = this.listSprit[this.state].x
	this.listSprit[DIE_KOOPA].y = this.listSprit[this.state].y
	this.state = DIE_KOOPA;
}

KoopaTroopa.prototype.returnKoopa = function returnKoopa() {
	this.listSprit[LIVE_KOOPA].x = this.listSprit[this.state].x
	this.listSprit[LIVE_KOOPA].y = this.listSprit[this.state].y
	this.state = LIVE_KOOPA;
}

KoopaTroopa.prototype.update = function update(deltaTime) {
	if (this.live) {
		this.controlFormaBrick(this.map.bricks);
		this.controlFormaBrick(this.map.interrogation);
		if (this.move) {
			if (this.direction == "left") {
				if (this.listSprit[this.state].currentAnimation != WALK_LEFT) {
					this.listSprit[this.state].setAnimation(WALK_LEFT);
				}
				this.listSprit[this.state].x -= (this.state== DIE_KOOPA? 3: 1);
				if (this.map.collisionMoveLeft(this.listSprit[this.state])) {
					this.listSprit[this.state].x += (this.state== DIE_KOOPA? 3: 1);
					this.direction = "right";
				}
			} else {
				if (this.listSprit[this.state].currentAnimation != WALK_RIGHT) {
					this.listSprit[this.state].setAnimation(WALK_RIGHT);
				}
				this.listSprit[this.state].x += (this.state== DIE_KOOPA? 3: 1);
				if (this.map.collisionMoveRight(this.listSprit[this.state])) {
					this.listSprit[this.state].x -= (this.state== DIE_KOOPA? 3: 1);
					this.direction = "left";
				}
			}
		}
		this.listSprit[this.state].y += 2;

		this.map.collisionMoveDown(this.listSprit[this.state])
	}
	else {
		// Die
		if (this.listSprit[this.state].currentAnimation != DIE) {
			this.listSprit[this.state].setAnimation(DIE);
		}
	}

	if(this.listSprit[this.state].y > 398) this.active= false;

	// Update sprites
	this.listSprit[this.state].update(deltaTime);

}

KoopaTroopa.prototype.draw = function draw() {
	if(this.active) this.listSprit[this.state].draw();
}

KoopaTroopa.prototype.collisionBox = function () {
	var box = new Box(this.listSprit[this.state].x + 2, this.listSprit[this.state].y + 2, this.listSprit[this.state].x + this.listSprit[this.state].width - 4, this.listSprit[this.state].y + this.listSprit[this.state].height - 4);

	return box;
}


KoopaTroopa.prototype.controlFormaBrick = function (ladrillos) {
	for (var i = 0; i < ladrillos.length; i++) {
		var brick = ladrillos[i];
		if(brick.activeView){
			var col = this.collisionBox().intersectSide(brick.collisionBox());

			if (!!col && col[1] === 'abajo') {//koopa
				this.listSprit[this.state].y  = brick.sprite.y - this.listSprit[this.state].height+4;
			}
			if (!!col && col[0] === 'derecha') {
				if (!!col && col[1] != 'abajo') this.listSprit[this.state].x -= 2;
			}
			if (!!col && col[0] === 'izquierda') {
				if (!!col && col[1] != 'abajo') this.listSprit[this.state].x += 2;
			}
		}
	}
}

