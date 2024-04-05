

// Scene. Updates and draws a single scene of the game.
function Scene(lives) {
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/fondo.png");

	// Create a deep copy of level01
	this.level = JSON.parse(JSON.stringify(level01));

	// Create tilemap
	this.map = new Tilemap(tilesheet, [32, 32], [4, 6], [0, 0], this.level);

	// Create entities
	this.player = new Player(224, 352, this.map, lives);

	this.estrella = new Star(300, 200, this.map);
	this.maxPlayer = new HomgoMax(300, 220, this.map);
	this.liveUpPlayer = new HomgoLive(260, 220, this.map);

	//max Camara
	this.maxCameraX = 0;

	this.enemisGommba = [];
	this.enemisGommba[0] = new Goomba(512, 352, this.map);
	this.enemisGommba[1] = new Goomba(704, 352, this.map);
	this.enemisGommba[2] = new Goomba(640, 352, this.map);
	this.enemisGommba[3] = new Goomba(960, 352, this.map);
	this.enemisGommba[4] = new Goomba(1280, 352, this.map);
	this.enemisGommba[5] = new Goomba(1600, 352, this.map);
	this.enemisGommba[6] = new Goomba(1632, 352, this.map);
	this.enemisGommba[7] = new Goomba(512, 20, this.map);

	// Prepare sounds
	this.music = AudioFX('sounds/01.Ground_Theme.mp3', { loop: true });
	this.jumpSound = AudioFX('sounds/smb_jump-small.wav');
	this.coinSound = AudioFX('sounds/smb_coin.wav');
	this.brickSound = AudioFX('sounds/smb_bump.wav');

	// Store current time
	this.currentTime = 0

	this.puntaje = 0;
}


Scene.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	// Update entities
	this.player.update(deltaTime);

	this.estrella.update(deltaTime);
	this.maxPlayer.update(deltaTime);
	this.liveUpPlayer.update(deltaTime);

	this.enemisGommba.forEach(goomba => { goomba.update(deltaTime); })
	this.map.bricks.forEach(brick => { brick.update(deltaTime); });
	this.map.interrogation.forEach(interrogation => { interrogation.update(deltaTime); });
	this.map.coin.forEach(coin => { coin.update(deltaTime); });


	var cameraWidth = document.getElementById("game-layer").width;

	if (this.maxCameraX > this.player.collisionBox().min_x) this.player.leftColision = true;

	if (this.maxCameraX + cameraWidth < this.player.collisionBox().max_x) this.player.rigthColision = true;

	if(this.estrella.collisionBox().intersect(this.player.collisionBox()) && this.estrella.active){
		this.player.star();
		this.puntaje= this.puntaje + 1000;
		this.estrella.active = false;
	}

	if(this.maxPlayer.collisionBox().intersect(this.player.collisionBox()) && this.maxPlayer.active){
		this.player.big();
		this.puntaje= this.puntaje + 1000;
		this.maxPlayer.active = false;
	}

	if(this.liveUpPlayer.collisionBox().intersect(this.player.collisionBox()) && this.liveUpPlayer.active){
		//this.player.big();
		this.player.liveUp();
		this.liveUpPlayer.active = false;
	}

	this.map.bricks.forEach(brick => {
		var colisionBrick = brick.collisionBox().intersectSide(this.player.collisionBox());
		if (!!colisionBrick) {
			if (colisionBrick[1] === 'abajo' && this.player.live) {
				if(this.player.state == STATE_MAX || this.player.state == STATE_START_MAX ){
					brick.clean();
				}
				// this.brick.sprite.y -= 0.5; 
				brick.bouncing = true;
				// this.player.sprite.y -= 2
				if (interacted)
					this.brickSound.play();
			}
		}
	});

	this.map.interrogation.forEach(interrogation => {
		var colitionInterrogation = interrogation.collisionBox().intersectSide(this.player.collisionBox());
		if (!!colitionInterrogation && colitionInterrogation[1] === 'abajo' && this.player.live) {
			if(interrogation.recompensa) this.puntaje= this.puntaje +100;
			interrogation.die();
			interrogation.bouncing = true;
		}
	});

	this.map.coin.forEach(coin => {
		this.map.bricks.forEach((brick) => {
			if (coin.collisionBox().intersect(brick.collisionBox()) && this.player.live) {
				if(coin.take){
					this.puntaje=this.puntaje+100;
					coin.take = false
				}
				if (interacted && coin.active){
					this.coinSound.play();
				}
				setTimeout(() => {
					coin.active = false;
				}, 200);
			}
		})
		if (coin.collisionBox().intersect(this.player.collisionBox()) && this.player.live) {
			if (interacted && coin.active){
				this.coinSound.play();
			}
			if(coin.take){
				this.puntaje=this.puntaje+100;
				coin.take = false
			}
			setTimeout(() => {
				coin.active = false;
			}, 200);
		}
	})

	this.enemisGommba.forEach((goomba) => {
		var colision = goomba.collisionBox().intersectSide(this.player.collisionBox());
		if (!!colision && this.player.live) {
			if(this.player.state == STATE_START_MINI || this.player.state == STATE_START_MAX){
				goomba.die();
				this.puntaje= this.puntaje + 100;
			}else{
				if (colision[1] === 'arriba') {
					goomba.die();
					this.puntaje= this.puntaje + 100;
				} else if (goomba.active && goomba.live) {
					this.player.die();
				}
			}
		}
		if (goomba.sprite.x >= this.maxCameraX && goomba.sprite.x <= this.maxCameraX + cameraWidth) {
			goomba.move = true;
		}

		// Init music once user has interacted
		if (interacted)
			this.music.play();

		// Play jumpSound sound when spacebar pressed
		if (keyboard[32] && interacted)
			this.jumpSound.play();

	})

}

Scene.prototype.draw = function () {
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Calculate the position of the camera. The camera follows the player, staying a certain distance away.
	var cameraX = this.player.listSprit[this.player.state].x - canvas.width / 2;
	cameraX = Math.max(0, cameraX); // Don't go beyond the left edge of the map
	cameraX = Math.min(this.map.map.width * 32 - canvas.width, cameraX); // Don't go beyond the right edge of the map

	// Ensure the camera never moves back
	cameraX = Math.max(cameraX, this.maxCameraX);

	this.maxCameraX = cameraX;

	// Apply transformation to context
	context.save();
	context.translate(-Math.floor(cameraX), 0);


	// Clear background
	context.fillStyle = "#87CEEB";
	context.fillRect(0, 0, this.map.map.width * 32, canvas.height);

	// Draw tilemap
	this.map.draw();
	this.estrella.draw();
	this.maxPlayer.draw();
	this.liveUpPlayer.draw()

	this.enemisGommba.forEach(goomba => {goomba.draw();})

	this.player.draw();

	// Draw text
	if (!this.player.live) {
		var text = "Muerte";
		context.font = "50px Mario";
		var textSize = context.measureText(text);
		context.fillStyle = "#000";
		context.fillText(text, 256 - textSize.width / 2, 224 + 12);
	}
	// Restore the context
	context.restore();

	text = "Puntaje: " + completeNumbre(this.puntaje) + "  Vidas: " + this.player.lives;
	context.font = "10px Mario";
	context.fillStyle = "#fff";
	context.fillText(text, 10, 25);
}



