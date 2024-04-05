const MARIO_STAND_RIGHT = 0;	//Animaciones en el espacio en que se definen :)
const MARIO_STAND_LEFT = 1;
const MARIO_WALK_LEFT = 2;
const MARIO_WALK_RIGHT = 3;
const MARIO_JUMP_LEFT = 4;
const MARIO_JUMP_RIGHT = 5;

const MARIO_DIE = 6;

const STATE_MINI = 0;
const STATE_MAX = 1;
const STATE_START_MINI =2;
const STATE_START_MAX =3;

var minWalkSpeed = 60;
var walkAccel = 60;
var runAccel = 120;
var releaseDecel = 360;
var maxWalkSpeed = 120;
var maxRunSpeed = 240;

function Player(x, y, map, lives) {
	// Loading spritesheets
	var mario = new Texture("imgs/mario.png");
	this.state = STATE_MINI;

	// Set attributes for VIDAS y activo
	this.lives=lives;
	this.live = true;
	
	this.upBrick = false; //piso brick
	this.downBrick = false; //choque arriba ladrillo
	this.down=false;
	this.leftColision = false;
	this.rigthColision = false;
	//this.active = true;
	// Prepare Bub sprite & its animations
	//LISTA DE SPRIT
	this.listSprit = []
	//mario
	sprite = new Sprite(x, y, 32, 32, 17, mario);

	sprite.addAnimation();
	sprite.addKeyframe(MARIO_STAND_RIGHT, [0, 0, 16, 16]);

	sprite.addAnimation();
	sprite.addKeyframe(MARIO_STAND_LEFT, [64, 32, 16, 16]);

	sprite.addAnimation();
	sprite.addKeyframe(MARIO_WALK_LEFT, [16, 32, 16, 16]);
	sprite.addKeyframe(MARIO_WALK_LEFT, [32, 32, 16, 16]);
	sprite.addKeyframe(MARIO_WALK_LEFT, [48, 32, 16, 16]);

	sprite.addAnimation();
	sprite.addKeyframe(MARIO_WALK_RIGHT, [16, 0, 16, 16]);
	sprite.addKeyframe(MARIO_WALK_RIGHT, [32, 0, 16, 16]);
	sprite.addKeyframe(MARIO_WALK_RIGHT, [48, 0, 16, 16]);

	sprite.addAnimation();
	sprite.addKeyframe(MARIO_JUMP_LEFT, [48, 48, 16, 16]);

	sprite.addAnimation();
	sprite.addKeyframe(MARIO_JUMP_RIGHT, [16, 16, 16, 16]);

	sprite.addAnimation();
	sprite.addKeyframe(MARIO_DIE, [32, 16, 16, 16]);

	//Start
	spriteStart = new Sprite(x, y, 32, 32, 17, mario);

	spriteStart.addAnimation();
	spriteStart.addKeyframe(MARIO_STAND_RIGHT, [0, 0, 16, 16]);
	spriteStart.addKeyframe(MARIO_STAND_RIGHT, [0, 64, 16, 16]);
	spriteStart.addKeyframe(MARIO_STAND_RIGHT, [80, 0, 16, 16]);
	spriteStart.addKeyframe(MARIO_STAND_RIGHT, [80, 64, 16, 16]);

	spriteStart.addAnimation();
	spriteStart.addKeyframe(MARIO_STAND_LEFT, [64, 32, 16, 16]);
	spriteStart.addKeyframe(MARIO_STAND_LEFT, [64, 96, 16, 16]);
	spriteStart.addKeyframe(MARIO_STAND_LEFT, [144, 32, 16, 16]);
	spriteStart.addKeyframe(MARIO_STAND_LEFT, [144, 96, 16, 16]);

	spriteStart.addAnimation();
	spriteStart.addKeyframe(MARIO_WALK_LEFT, [16, 32, 16, 16]);
	spriteStart.addKeyframe(MARIO_WALK_LEFT, [96, 32, 16, 16]);
	spriteStart.addKeyframe(MARIO_WALK_LEFT, [16, 96, 16, 16]);
	spriteStart.addKeyframe(MARIO_WALK_LEFT, [96, 96, 16, 16]);

	spriteStart.addKeyframe(MARIO_WALK_LEFT, [32, 32, 16, 16]);
	spriteStart.addKeyframe(MARIO_WALK_LEFT, [112, 32, 16, 16]);
	spriteStart.addKeyframe(MARIO_WALK_LEFT, [32, 96, 16, 16]);
	spriteStart.addKeyframe(MARIO_WALK_LEFT, [112, 96, 16, 16]);

	spriteStart.addKeyframe(MARIO_WALK_LEFT, [48, 32, 16, 16]);
	spriteStart.addKeyframe(MARIO_WALK_LEFT, [128, 32, 16, 16]);
	spriteStart.addKeyframe(MARIO_WALK_LEFT, [48, 96, 16, 16]);
	spriteStart.addKeyframe(MARIO_WALK_LEFT, [128, 96, 16, 16]);

	spriteStart.addAnimation();
	spriteStart.addKeyframe(MARIO_WALK_RIGHT, [16, 0, 16, 16]);
	spriteStart.addKeyframe(MARIO_WALK_RIGHT, [96, 0, 16, 16]);
	spriteStart.addKeyframe(MARIO_WALK_RIGHT, [16, 64, 16, 16]);
	spriteStart.addKeyframe(MARIO_WALK_RIGHT, [96, 64, 16, 16]);
 
	spriteStart.addKeyframe(MARIO_WALK_RIGHT, [32, 0, 16, 16]);
	spriteStart.addKeyframe(MARIO_WALK_RIGHT, [112, 0, 16, 16]);
	spriteStart.addKeyframe(MARIO_WALK_RIGHT, [32, 64, 16, 16]);
	spriteStart.addKeyframe(MARIO_WALK_RIGHT, [112, 64, 16, 16]);
	
	spriteStart.addKeyframe(MARIO_WALK_RIGHT, [48, 0, 16, 16]);
	spriteStart.addKeyframe(MARIO_WALK_RIGHT, [128, 0, 16, 16]);
	spriteStart.addKeyframe(MARIO_WALK_RIGHT, [48, 64, 16, 16]);
	spriteStart.addKeyframe(MARIO_WALK_RIGHT, [128, 64, 16, 16]);

	spriteStart.addAnimation();
	spriteStart.addKeyframe(MARIO_JUMP_LEFT, [48, 48, 16, 16]);
	spriteStart.addKeyframe(MARIO_JUMP_LEFT, [128, 48, 16, 16]);
	spriteStart.addKeyframe(MARIO_JUMP_LEFT, [48, 112, 16, 16]);
	spriteStart.addKeyframe(MARIO_JUMP_LEFT, [128, 112, 16, 16]);

	spriteStart.addAnimation();
	spriteStart.addKeyframe(MARIO_JUMP_RIGHT, [16, 16, 16, 16]);
	spriteStart.addKeyframe(MARIO_JUMP_RIGHT, [96, 16, 16, 16]);
	spriteStart.addKeyframe(MARIO_JUMP_RIGHT, [16, 80, 16, 16]);
	spriteStart.addKeyframe(MARIO_JUMP_RIGHT, [96, 80, 16, 16]);

	//big
	var marioBig = new Texture("imgs/marioBig.png");
	spriteBig = new Sprite(x, y, 32, 64, 17, marioBig);

	spriteBig.addAnimation();
	spriteBig.addKeyframe(MARIO_STAND_RIGHT, [0, 0, 16, 32]);

	spriteBig.addAnimation();
	spriteBig.addKeyframe(MARIO_STAND_LEFT, [96, 32, 16, 32]);

	spriteBig.addAnimation();
	spriteBig.addKeyframe(MARIO_WALK_LEFT, [96, 32, 16, 32]);
	spriteBig.addKeyframe(MARIO_WALK_LEFT, [80, 32, 16, 32]);
	spriteBig.addKeyframe(MARIO_WALK_LEFT, [64, 32, 16, 32]);

	spriteBig.addAnimation();
	spriteBig.addKeyframe(MARIO_WALK_RIGHT, [16, 0, 16, 32]);
	spriteBig.addKeyframe(MARIO_WALK_RIGHT, [32, 0, 16, 32]);
	spriteBig.addKeyframe(MARIO_WALK_RIGHT, [48, 0, 16, 32]);

	spriteBig.addAnimation();
	spriteBig.addKeyframe(MARIO_JUMP_LEFT, [16, 32, 16, 32]);

	spriteBig.addAnimation();
	spriteBig.addKeyframe(MARIO_JUMP_RIGHT, [80, 0, 16, 32]);

	//Start
	spriteStartBig = new Sprite(x, y, 32, 64, 17, marioBig);

	spriteStartBig.addAnimation();
	spriteStartBig.addKeyframe(MARIO_STAND_RIGHT, [0, 0, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_STAND_RIGHT, [0, 64, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_STAND_RIGHT, [112, 0, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_STAND_RIGHT, [112, 64, 16, 32]);

	spriteStartBig.addAnimation();
	spriteStartBig.addKeyframe(MARIO_STAND_LEFT, [96, 32, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_STAND_LEFT, [96, 96, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_STAND_LEFT, [208, 32, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_STAND_LEFT, [208, 96, 16, 32]);

	spriteStartBig.addAnimation();
	spriteStartBig.addKeyframe(MARIO_WALK_LEFT, [96, 32, 16, 32])
	spriteStartBig.addKeyframe(MARIO_WALK_LEFT, [208, 32, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_WALK_LEFT, [96, 96, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_WALK_LEFT, [208, 96, 16, 32]);

	spriteStartBig.addKeyframe(MARIO_WALK_LEFT, [80, 32, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_WALK_LEFT, [192, 32, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_WALK_LEFT, [80, 96, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_WALK_LEFT, [192, 96, 16, 32]);

	spriteStartBig.addKeyframe(MARIO_WALK_LEFT, [64, 32, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_WALK_LEFT, [176, 32, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_WALK_LEFT, [64, 96, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_WALK_LEFT, [176, 96, 16, 32]);

	spriteStartBig.addAnimation();
	spriteStartBig.addKeyframe(MARIO_WALK_RIGHT, [16, 0, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_WALK_RIGHT, [128, 0, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_WALK_RIGHT, [16, 64, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_WALK_RIGHT, [128, 64, 16, 32]);
 
	spriteStartBig.addKeyframe(MARIO_WALK_RIGHT, [32, 0, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_WALK_RIGHT, [112, 0, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_WALK_RIGHT, [32, 64, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_WALK_RIGHT, [112, 64, 16, 32]);
	
	spriteStartBig.addKeyframe(MARIO_WALK_RIGHT, [48, 0, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_WALK_RIGHT, [48, 0, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_WALK_RIGHT, [160, 64, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_WALK_RIGHT, [160, 64, 16, 32]);

	spriteStartBig.addAnimation();
	spriteStartBig.addKeyframe(MARIO_JUMP_LEFT, [16, 32, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_JUMP_LEFT, [128, 32, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_JUMP_LEFT, [16, 96, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_JUMP_LEFT, [128, 96, 16, 32]);

	spriteStartBig.addAnimation();
	spriteStartBig.addKeyframe(MARIO_JUMP_RIGHT, [80, 0, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_JUMP_RIGHT, [192, 0, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_JUMP_RIGHT, [80, 64, 16, 32]);
	spriteStartBig.addKeyframe(MARIO_JUMP_RIGHT, [192, 64, 16, 32]);


	sprite.setAnimation(MARIO_STAND_RIGHT);
	spriteStart.setAnimation(MARIO_STAND_RIGHT);
	spriteBig.setAnimation(MARIO_STAND_RIGHT);
	spriteStartBig.setAnimation(MARIO_STAND_RIGHT);


	this.listSprit[STATE_MINI] = sprite;
	this.listSprit[STATE_START_MINI] = spriteStart;
	this.listSprit[STATE_MAX] = spriteBig;
	this.listSprit[STATE_START_MAX] = spriteStartBig;

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
			if (this.listSprit[this.state].currentAnimation != MARIO_WALK_LEFT)
				this.listSprit[this.state].setAnimation(MARIO_WALK_LEFT);
			if (this.bJumping) {
				if (this.listSprit[this.state].currentAnimation != MARIO_JUMP_LEFT) {
					this.listSprit[this.state].setAnimation(MARIO_JUMP_LEFT);
				}
			}
		}
		else if (keyboard[39]) // KEY_RIGHT
		{
			if (this.listSprit[this.state].currentAnimation != MARIO_WALK_RIGHT){
				this.listSprit[this.state].setAnimation(MARIO_WALK_RIGHT);
			}
			if (this.bJumping) {
				if (this.listSprit[this.state].currentAnimation != MARIO_JUMP_RIGHT) {
					this.listSprit[this.state].setAnimation(MARIO_JUMP_RIGHT);
				}
			}
		}
		else {//MARIO PARADO
			if (this.listSprit[this.state].currentAnimation == MARIO_WALK_LEFT || this.listSprit[this.state].currentAnimation == MARIO_JUMP_LEFT) {
				if (!this.bJumping) this.listSprit[this.state].setAnimation(MARIO_STAND_LEFT);
			}
			if (this.listSprit[this.state].currentAnimation == MARIO_WALK_RIGHT || this.listSprit[this.state].currentAnimation == MARIO_JUMP_RIGHT) {
				if (!this.bJumping) this.listSprit[this.state].setAnimation(MARIO_STAND_RIGHT);
			}
		}

		if (this.bJumping) {
			this.jumpAngle += 4;
			if (this.jumpAngle == 180) {
				this.bJumping = false;
				this.listSprit[this.state].y = this.startY;
			}
			else {
				this.listSprit[this.state].y = this.startY - 96 * Math.sin(3.14159 * this.jumpAngle / 180); //salta

				if (this.jumpAngle > 90)
					this.bJumping = (!this.map.collisionMoveDown(this.listSprit[this.state]) && !this.upBrick); //se queda en la plataforma
				if (this.map.collisionMoveUp(this.listSprit[this.state])) { //Intento de que se salga del mapa por arriba
					this.bJumping = false;
				};
			}
		}
		else {
			// Move Bub so that it is affected by gravity
			this.listSprit[this.state].y += 2;

			if (this.map.collisionMoveDown(this.listSprit[this.state]) || this.upBrick) {
				this.jump();
			}
		}
		this.move(deltaTime);
	}
	else {
		// Die
		if (this.listSprit[this.state].currentAnimation != MARIO_DIE) {
			this.listSprit[this.state].setAnimation(MARIO_DIE);
		}
		//Bounce die
		if (this.bouncing) {
			if (this.goingUp) {
				if (this.listSprit[this.state].y > this.originalY - this.maxBounceHeight) {
					// Move the brick up
					this.listSprit[this.state].y -= 3;
				} else {
					// Start moving the brick down
					this.goingUp = false;
				}
			} else {
				// Move the brick down
				this.listSprit[this.state].y += 3;
				// If the brick has returned to its original this.listSprit[this.state].y >= this.originalYposition, stop bouncing
				if (this.listSprit[this.state].y >= this.originalY) {
					this.listSprit[this.state].y = this.originalY;
					this.bouncing = false;
					this.goingUp = true;
					this.down = true;
				}
			}
		}
		else if(this.down){
			if(this.listSprit[this.state].y < 500)	this.listSprit[this.state].y += 3;
			else{
				this.lives = this.lives-1;
				pauseGame();
				restartGame(this.lives)
			}
		}
	}
	if(keyboard[71]){//g
		this.star();
	}
	if(keyboard[77]){//m
		this.big();
	}
	// Update listSprit[this.state]s
	this.listSprit[this.state].update(deltaTime);
}

Player.prototype.liveUp = function liveUp(){
	this.lives = this.lives + 1;
}

Player.prototype.die = function die() {
	if(this.state== STATE_MINI){
		this.live = false;
		this.bouncing = true;
	}
	if(this.state == STATE_MAX){
		this.small();
	}
}

Player.prototype.star = function start(){
	if(this.state == STATE_MAX){
		this.listSprit[STATE_START_MAX].x = this.listSprit[this.state].x
		this.listSprit[STATE_START_MAX].y = this.listSprit[this.state].y
		this.state = STATE_START_MAX;
		setTimeout(() => {
			this.listSprit[STATE_MAX].x = this.listSprit[this.state].x
			this.listSprit[STATE_MAX].y = this.listSprit[this.state].y
			this.state = STATE_MAX;
		}, 10000);
	}
	if( this.state == STATE_MINI){
		this.listSprit[STATE_START_MINI].x = this.listSprit[this.state].x
		this.listSprit[STATE_START_MINI].y = this.listSprit[this.state].y
		this.state = STATE_START_MINI;
		setTimeout(() => {
			if(this.state == STATE_START_MAX){
				this.listSprit[STATE_MAX].x = this.listSprit[this.state].x
				this.listSprit[STATE_MAX].y = this.listSprit[this.state].y
				this.state = STATE_MAX;
			}else{
				this.listSprit[STATE_MINI].x = this.listSprit[this.state].x
				this.listSprit[STATE_MINI].y = this.listSprit[this.state].y
				this.state = STATE_MINI;
			}
		}, 10000);
	}
}

Player.prototype.big = function big(){
	if(this.state == STATE_START_MINI){
		this.listSprit[STATE_START_MAX].x = this.listSprit[this.state].x
		this.listSprit[STATE_START_MAX].y = this.listSprit[this.state].y
		this.state = STATE_START_MAX;
	}else{
		this.listSprit[STATE_MAX].x = this.listSprit[this.state].x
		this.listSprit[STATE_MAX].y = this.listSprit[this.state].y
		this.state = STATE_MAX;
	}
}

Player.prototype.small = function small(){
	this.listSprit[STATE_MINI].x = this.listSprit[this.state].x
	this.listSprit[STATE_MINI].y = this.listSprit[this.state].y
	this.state = STATE_MINI;
}

Player.prototype.jump = function () {
	this.upBrick = false
	// Check arrow up key. If pressed, jump.
	if (keyboard[32]) {
		this.bJumping = true;
		this.jumpAngle = 0;
		this.startY = this.listSprit[this.state].y;
		if (this.listSprit[this.state].currentAnimation == MARIO_WALK_LEFT || this.listSprit[this.state].currentAnimation == MARIO_STAND_LEFT)
			this.listSprit[this.state].setAnimation(MARIO_JUMP_LEFT);
		if (this.listSprit[this.state].currentAnimation == MARIO_WALK_RIGHT || this.listSprit[this.state].currentAnimation == MARIO_STAND_RIGHT)
			this.listSprit[this.state].setAnimation(MARIO_JUMP_RIGHT);
		
	}
}

Player.prototype.controlFormaBrick = function (ladrillos) {
	for (var i = 0; i < ladrillos.length; i++) {
		var brick = ladrillos[i];
		var col = this.collisionBox().intersectSide(brick.collisionBox());

		if(brick.activeView){
			if (!!col && col[1] === 'arriba') {
				this.bJumping = false;
				this.downBrick = true;
			}
			if (!!col && col[1] === 'abajo') {
				// If the player is colliding with the brick, move the player to the top of the brick
				this.listSprit[this.state].y = brick.sprite.y - this.listSprit[this.state].height;
				// this.bJumping = false;
				this.upBrick = true
			}
			if (!!col && col[0] === 'derecha') {
				if (!!col && col[1] != 'abajo') this.listSprit[this.state].x -= 2;
				// this.bJumping = false;
			}
			if (!!col && col[0] === 'izquierda') {
				if (!!col && col[1] != 'abajo') this.listSprit[this.state].x += 2;
				// this.bJumping = false;
			}
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

	var proxPosX = this.listSprit[this.state].x + this.speed * deltaTime / 1000.0;

	if (this.map.collisionMoveLeft(this.listSprit[this.state]) || this.downBrick || this.leftColision) {//choque con coliciones o salida de pantalla
		this.downBrick = false;
		this.leftColision = false;

		if(proxPosX>this.listSprit[this.state].x) this.listSprit[this.state].x = proxPosX
	}
	else if (this.map.collisionMoveRight(this.listSprit[this.state]) || this.downBric || this.rigthColision){//choque con coliciones o salida de pantalla
		this.downBrick = false;//this.listSprit[this.state].x -= 2;
		this.rigthColision = false;

		if(proxPosX<this.listSprit[this.state].x) this.listSprit[this.state].x = proxPosX
	} 
	else{
		this.listSprit[this.state].x = proxPosX
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

Player.prototype.draw = function () {
	this.listSprit[this.state].draw();
}

Player.prototype.collisionBox = function () {
	var box = new Box(Math.floor(this.listSprit[this.state].x) + 2, Math.floor(this.listSprit[this.state].y), Math.floor(this.listSprit[this.state].x) + this.listSprit[this.state].width - 4, Math.floor(this.listSprit[this.state].y) + this.listSprit[this.state].height);
	return box;
}