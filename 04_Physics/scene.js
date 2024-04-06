

// Scene. Updates and draws a single scene of the game.
function Scene(lives) {
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/fondo.png");
	this.cantMoney = 0;
	this.listStar = [];
	this.listHongoUp = [];
	this.listHongoMax = [];

	// Create a deep copy of level01
	this.level = JSON.parse(JSON.stringify(level01));

	// Create tilemap
	this.map = new Tilemap(tilesheet, [32, 32], [4, 6], [0, 0], this.level);

	// Create entities
	this.player = new Player(224, 352, this.map, lives);


	//max Camara
	this.maxCameraX = 0;
	
	//enemigos
	this.enemiKoopa = new KoopaTroopa(300, 200, this.map);

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
	//poweUp
	this.listStar.forEach(star => { star.update(deltaTime); });
	this.listHongoUp.forEach(hongoUp => { hongoUp.update(deltaTime); });
	this.listHongoMax.forEach(hongoMax => { hongoMax.update(deltaTime); });
	//enemigos
	this.enemiKoopa.update(deltaTime);
	this.enemisGommba.forEach(goomba => { goomba.update(deltaTime); });
	
	//mapa
	this.map.bricks.forEach(brick => { brick.update(deltaTime); });
	this.map.interrogation.forEach(interrogation => { interrogation.update(deltaTime); });
	this.map.coin.forEach(coin => { coin.update(deltaTime); });


	var cameraWidth = document.getElementById("game-layer").width;

	if (this.maxCameraX > this.player.collisionBox().min_x) this.player.leftColision = true;
	if (this.maxCameraX + cameraWidth < this.player.collisionBox().max_x) this.player.rigthColision = true;

	//coliciones
	this.listStar.forEach(star => { 
		if(star.collisionBox().intersect(this.player.collisionBox()) && star.active){
			this.player.star();
			this.puntaje= this.puntaje + 1000;
			star.active = false;
		}
	});

	this.listHongoMax.forEach(hongoM => { 
		if(hongoM.collisionBox().intersect(this.player.collisionBox()) && hongoM.active){
			this.player.big();
			this.puntaje= this.puntaje + 1000;
			hongoM.active = false;
		}
	});

	this.listHongoUp.forEach(hongoUp => { 
		if(hongoUp.collisionBox().intersect(this.player.collisionBox()) && hongoUp.active){
			this.player.liveUp();
			hongoUp.active = false;
		}
	});

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
			if(interrogation.recompensa) {
				this.puntaje= this.puntaje +100;

				var random = getRandomInt(3);
				switch (random) {
					case 0:
						var star = new Star(interrogation.sprite.x,interrogation.sprite.y -32, this.map);
						this.listStar.push(star);
						break;
					case 1:
						var hongo = new HomgoLive(interrogation.sprite.x,interrogation.sprite.y-32, this.map);
						this.listHongoUp.push(hongo);
						break;
					case 2:
						var hongo = new HomgoMax(interrogation.sprite.x,interrogation.sprite.y-32, this.map);
						this.listHongoMax.push(hongo);
						break;
					default:
						break;
				}
			}
			interrogation.die();
			interrogation.bouncing = true;
		}
	});

	this.map.coin.forEach(coin => {
		this.map.bricks.forEach((brick) => {
			if (coin.collisionBox().intersect(brick.collisionBox()) && this.player.live) {
				if(coin.take){
					this.cantMoney = this.cantMoney+1;
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
				this.cantMoney = this.cantMoney+1;
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
		if(this.enemiKoopa.collisionBox().intersect(goomba.collisionBox()) && this.enemiKoopa.state == DIE_KOOPA ){
			goomba.die();
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

	var colision = this.enemiKoopa.collisionBox().intersectSide(this.player.collisionBox());
	if (!!colision && this.player.live) {
		if(this.enemiKoopa.state == LIVE_KOOPA){
			if(this.player.state == STATE_START_MINI || this.player.state == STATE_START_MAX){
				this.enemiKoopa.die();
				this.puntaje= this.puntaje + 100;
			}else{
				if (colision[1] === 'arriba') {
					this.enemiKoopa.die();
					this.puntaje= this.puntaje + 100;
				}else if (this.enemiKoopa.active && this.enemiKoopa.move) {
					this.player.die();
				}
			}
		}else if(!this.enemiKoopa.move){
			this.enemiKoopa.direction = colision[2] == 'derecha'? 'right': 'left';
			this.enemiKoopa.move= true;
			
		}else{
			if (colision[1] === 'arriba' || this.player.state == STATE_START_MINI || this.player.state == STATE_START_MAX)  this.enemiKoopa.move = false;
			else{ this.player.die()}
		}
	}
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
	//powerUp
	this.listStar.forEach(star => { star.draw(); });
	this.listHongoUp.forEach(hongoUp => { hongoUp.draw(); });
	this.listHongoMax.forEach(hongoMax => { hongoMax.draw(); });
	//enemigos
	this.enemiKoopa.draw();
	this.enemisGommba.forEach(goomba => {goomba.draw();})
	//plyer
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

	text = "Puntaje: " + completeNumbre(this.puntaje) + "  Monedas: " +this.cantMoney +"  Vidas: " + this.player.lives;
	context.font = "10px Mario";
	context.fillStyle = "#fff";
	context.fillText(text, 10, 25);
}



