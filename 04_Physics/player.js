
const MARIO_STAND_LEFT = 0;
const MARIO_STAND_RIGHT = 1;
const MARIO_WALK_LEFT = 2;
const MARIO_WALK_RIGHT = 3;
const MARIO_STAND_DIE = 4;
const MARIO_JUMP_LEFT = 5;
const MARIO_JUMP_RIGHT = 6;

const STATE_MINI =1;
const STATE_MAX = 2;

var minWalkSpeed = 60;
var walkAccel = 60;
var runAccel = 120;
var releaseDecel = 360;
var maxWalkSpeed = 120;
var maxRunSpeed = 240;

function Player(x, y, map, lives) {
	// // Loading spritesheets
	// Loading spritesheets
	var mario = new Texture("imgs/mario.png");
	this.state = STATE_MINI;
	// Set attributes for vivo y activo
	this.lives=lives;
	this.live = true;
	
	this.upBrick = false; //piso brick
	this.downBrick = false; //choque arriba ladrillo
	this.down=false;
	this.leftColision = false;
	this.rigthColision = false;
	//this.active = true;
	// Prepare Bub sprite & its animations
	this.sprite = new Sprite(x, y, 32, 32, 17, mario);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_STAND_LEFT, [64, 32, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_STAND_RIGHT, [0, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_WALK_LEFT, [16, 32, 16, 16]);
	this.sprite.addKeyframe(MARIO_WALK_LEFT, [32, 32, 16, 16]);
	this.sprite.addKeyframe(MARIO_WALK_LEFT, [48, 32, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_WALK_RIGHT, [16, 0, 16, 16]);
	this.sprite.addKeyframe(MARIO_WALK_RIGHT, [32, 0, 16, 16]);
	this.sprite.addKeyframe(MARIO_WALK_RIGHT, [48, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_STAND_DIE, [32, 16, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_JUMP_LEFT, [48, 48, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_JUMP_RIGHT, [16, 16, 16, 16]);

	this.sprite.setAnimation(MARIO_STAND_RIGHT);

	// Set tilemap for collisions
	this.map = map;

	// Set attributes for jump
	this.bJumping = false;
	this.jumpAngle = 0;

	this.speed = 0;

	this.originalY = y;
	this.maxBounceHeight = 64; // Change this to the maximum bounce height you want
	this.bouncing = false;
	this.goingUp = true;

}


Player.prototype.update = function (deltaTime) {

	if (this.live) {
		this.controlFormaBrick(this.map.bricks);
		this.controlFormaBrick(this.map.interrogation);

		if (keyboard[37]) // KEY_LEFT
		{
			if (this.state == STATE_MINI) {
				if (this.sprite.currentAnimation != MARIO_WALK_LEFT)
					this.sprite.setAnimation(MARIO_WALK_LEFT);
				if (this.bJumping) {
					if (this.sprite.currentAnimation != MARIO_JUMP_LEFT) {
						this.sprite.setAnimation(MARIO_JUMP_LEFT);
					}
				}
			}
		}
		else if (keyboard[39]) // KEY_RIGHT
		{
			if (this.state == STATE_MINI) {
				if (this.sprite.currentAnimation != MARIO_WALK_RIGHT)
					this.sprite.setAnimation(MARIO_WALK_RIGHT);
				// this.sprite.x += 2;
				// if (this.map.collisionMoveRight(this.sprite) || this.downBrick) //choque con coliciones o salida de pantalla
				// 	this.downBrick = false;this.speed=0;//this.sprite.x -= 2; 

				if (this.bJumping) {
					if (this.sprite.currentAnimation != MARIO_JUMP_RIGHT) {
						this.sprite.setAnimation(MARIO_JUMP_RIGHT);
					}
				}
			}
		}
		else {
			if (this.state == STATE_MINI) {
				if (this.sprite.currentAnimation == MARIO_WALK_LEFT || this.sprite.currentAnimation == MARIO_JUMP_LEFT) {
					if (!this.bJumping)
						this.sprite.setAnimation(MARIO_STAND_LEFT);
				}
				if (this.sprite.currentAnimation == MARIO_WALK_RIGHT || this.sprite.currentAnimation == MARIO_JUMP_RIGHT) {
					if (!this.bJumping)
						this.sprite.setAnimation(MARIO_STAND_RIGHT);
				}
			}
		}

		if (this.bJumping) {
			this.jumpAngle += 4;
			if (this.jumpAngle == 180) {
				this.bJumping = false;
				this.sprite.y = this.startY;
			}
			else {
				this.sprite.y = this.startY - 96 * Math.sin(3.14159 * this.jumpAngle / 180); //salta

				if (this.jumpAngle > 90)
					this.bJumping = (!this.map.collisionMoveDown(this.sprite) && !this.upBrick); //se queda en la plataforma
				if (this.map.collisionMoveUp(this.sprite)) { //Intento de que se salga del mapa por arriba
					this.bJumping = false;
				};
			}
		}
		else {
			// Move Bub so that it is affected by gravity
			this.sprite.y += 2;

			if (this.map.collisionMoveDown(this.sprite) || this.upBrick) {
				this.jump();
			}
		}
	
		this.move(deltaTime);

	}
	else {
		// Die
		if (this.sprite.currentAnimation != MARIO_STAND_DIE) {
			this.sprite.setAnimation(MARIO_STAND_DIE);
		}
		//Bounce die
		if (this.bouncing) {
			if (this.goingUp) {
				if (this.sprite.y > this.originalY - this.maxBounceHeight) {
					// Move the brick up
					this.sprite.y -= 3;
				} else {
					// Start moving the brick down
					this.goingUp = false;
				}
			} else {
				// Move the brick down
				this.sprite.y += 3;
				// If the brick has returned to its original this.sprite.y >= this.originalYposition, stop bouncing
				if (this.sprite.y >= this.originalY) {
					this.sprite.y = this.originalY;
					this.bouncing = false;
					this.goingUp = true;
					this.down = true;
				}
			}
		}
		else if(this.down){
			if(this.sprite.y < 500)	this.sprite.y += 3;
			else{
				this.lives = this.lives-1;
				pauseGame();
				restartGame(this.lives)
			}
		}
	}
	// Update sprites
	this.sprite.update(deltaTime);
}

Player.prototype.die = function die() {
	if(this.state== STATE_MINI){
		this.live = false;
		this.bouncing = true;
	}
}

Player.prototype.draw = function () {
	this.sprite.draw();
}

Player.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x + 2, this.sprite.y, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height);
	return box;
}

Player.prototype.jump = function () {
	this.upBrick = false
	// Check arrow up key. If pressed, jump.
	if (keyboard[32]) {
		this.bJumping = true;
		this.jumpAngle = 0;
		this.startY = this.sprite.y;
		if (this.state == STATE_MINI) {
			if (this.sprite.currentAnimation == MARIO_WALK_LEFT || this.sprite.currentAnimation == MARIO_STAND_LEFT)
				this.sprite.setAnimation(MARIO_JUMP_LEFT);
			if (this.sprite.currentAnimation == MARIO_WALK_RIGHT || this.sprite.currentAnimation == MARIO_STAND_RIGHT)
				this.sprite.setAnimation(MARIO_JUMP_RIGHT);
		}
	}
}

Player.prototype.controlFormaBrick = function (ladrillos) {
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

Player.prototype.move = function (deltaTime) {

	var accel = 0;

	if (keyboard[37] || keyboard[39]) {
		// Pressing move buttons
		if (keyboard[37] && (this.speed > -minWalkSpeed))
			this.speed = -minWalkSpeed;
		else if (keyboard[39] && (this.speed < minWalkSpeed))
			this.speed = minWalkSpeed;
		// Prepare acceleration according to action (walk or run)
		if (keyboard[16]) {
			if (keyboard[37])
				accel = -runAccel;
			else
				accel = runAccel;
		}
		else {
			if (keyboard[37])
				accel = -walkAccel;
			else
				accel = walkAccel;
		}
	}
	else {
		if (this.speed > 0)
			accel = -releaseDecel;
		else if (this.speed < 0)
			accel = releaseDecel;
		else
			accel = 0;
	}

	var proxPosX = this.sprite.x + this.speed * deltaTime / 1000.0;

	if (this.map.collisionMoveLeft(this.sprite) || this.downBrick || this.leftColision) {//choque con coliciones o salida de pantalla
		this.downBrick = false;
		this.leftColision = false;

		if(proxPosX>this.sprite.x) this.sprite.x = proxPosX
	}
	else if (this.map.collisionMoveRight(this.sprite) || this.downBric || this.rigthColision){//choque con coliciones o salida de pantalla
		this.downBrick = false;//this.sprite.x -= 2;
		this.rigthColision = false;

		if(proxPosX<this.sprite.x) this.sprite.x = proxPosX
	} 
	else{
		this.sprite.x = proxPosX
	}
	// Apply acceleration to current speed
	if (keyboard[37] || keyboard[39]) {
		this.speed = this.speed + accel * deltaTime / 1000.0;

		// Respect maximum speeds
		if (keyboard[16]) {
			if (Math.abs(this.speed) > maxRunSpeed) {
				if (this.speed > 0)
					this.speed = maxRunSpeed;
				else
					this.speed = -maxRunSpeed;
			}
		}
		else {
			if (Math.abs(this.speed) > maxWalkSpeed) {
				if (this.speed > 0)
					this.speed = maxWalkSpeed;
				else
					this.speed = -maxWalkSpeed;
			}
		}
	}
	else {
		// Be careful to stop when current acceleration gets close to zero
		if (this.speed > 0) {
			this.speed = this.speed + accel * deltaTime / 1000.0;
			if (this.speed < minWalkSpeed)
				this.speed = 0;
		}
		else if (this.speed < 0) {
			this.speed = this.speed + accel * deltaTime / 1000.0;
			if (this.speed > -minWalkSpeed)
				this.speed = 0;
		}
	}

}