
const MARIO_STAND_LEFT = 0;
const MARIO_STAND_RIGHT = 1;
const MARIO_WALK_LEFT = 2;
const MARIO_WALK_RIGHT = 3;
const MARIO_STAND_DIE = 4;

function Player(x, y, map) {
	// // Loading spritesheets
	// Loading spritesheets
	var mario = new Texture("imgs/mario.png");
	// Set attributes for vivo y activo
	this.live = true;
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

	this.sprite.setAnimation(MARIO_STAND_RIGHT);

	// Set tilemap for collisions
	this.map = map;

	// Set attributes for jump
	this.bJumping = false;
	this.jumpAngle = 0;
}


Player.prototype.update = function (deltaTime) {
	var canvas = document.getElementById("game-layer");

	if (this.live) {
		// Move Mario sprite left/right
		if (keyboard[37]) // KEY_LEFT
		{
			if (this.sprite.currentAnimation != MARIO_WALK_LEFT)
				this.sprite.setAnimation(MARIO_WALK_LEFT);
			this.sprite.x -= 2;
			if (this.map.collisionMoveLeft(this.sprite) || this.sprite.x + 2 < 0) //choque con coliciones o salida de pantalla
				this.sprite.x += 2;

		}
		else if (keyboard[39]) // KEY_RIGHT
		{
			if (this.sprite.currentAnimation != MARIO_WALK_RIGHT)
				this.sprite.setAnimation(MARIO_WALK_RIGHT);
			this.sprite.x += 2;
			if (this.map.collisionMoveRight(this.sprite) || this.sprite.x + this.sprite.width - 4 > canvas.width) //choque con coliciones o salida de pantalla
				this.sprite.x -= 2;
		}
		else {
			if (this.sprite.currentAnimation == MARIO_WALK_LEFT)
				this.sprite.setAnimation(MARIO_STAND_LEFT);
			if (this.sprite.currentAnimation == MARIO_WALK_RIGHT)
				this.sprite.setAnimation(MARIO_STAND_RIGHT);
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
					this.bJumping = !this.map.collisionMoveDown(this.sprite); //se queda en la plataforma
				if(this.map.collisionMoveUp(this.sprite)) { //Intento de que se salga del mapa por arriba
					this.bJumping = false;
					// this.sprite.y = this.startY;
				}; //como que lo evita pero no jajaja
				// if(this.sprite.x + this.sprite.width - 4> canvas.height) {
				// 	this.bJumping = false;
				// 	// this.sprite.y = this.startY + 1;
				// }
			}
		}
		else {
			// Move Bub so that it is affected by gravity
			this.sprite.y += 2;
			
			if (this.map.collisionMoveDown(this.sprite)) {

				// Check arrow up key. If pressed, jump.
				if (keyboard[32]) {
					this.bJumping = true;
					this.jumpAngle = 0;
					this.startY = this.sprite.y;
				}
			}
		}
	}
	else {
		// Die
		if (this.sprite.currentAnimation != MARIO_STAND_DIE) {
			this.sprite.setAnimation(MARIO_STAND_DIE);
		}
	}
	// Update sprites
	this.sprite.update(deltaTime);
}

Player.prototype.die = function die () {
	this.live = false;
}

Player.prototype.draw = function () {
	this.sprite.draw();
}

Player.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x + 2, this.sprite.y, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height);
	return box;
}




