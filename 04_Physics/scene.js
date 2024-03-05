

// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/fondo.png");

	// Create tilemap
	this.map = new Tilemap(tilesheet, [32, 32], [4, 6], [0, 0], level01);

	// Create entities
	this.player = new Player(224,352, this.map);

	//max Camara
	this.maxCameraX = 0;
	
	// this.goomba = new Goomba(704,352, this.map);
	// this.goomba = new Goomba(704,416, this.map);
	// this.goomba = new Goomba(704,512, this.map);
	this.enemisGommba = [];
	this.enemisGommba[0] = new Goomba(512,352, this.map);
	this.enemisGommba[1] = new Goomba(704,352, this.map);
	this.enemisGommba[2] = new Goomba(640,352, this.map);
	this.enemisGommba[3] = new Goomba(960,352, this.map);
	this.enemisGommba[4] = new Goomba(1280,352, this.map);
	this.enemisGommba[5] = new Goomba(1600,352, this.map);
	this.enemisGommba[6] = new Goomba(1632,352, this.map);

	// Store current time
	this.currentTime = 0
	
}


Scene.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;
	
	// Update entities
	this.player.update(deltaTime);

	this.enemisGommba.forEach(goomba =>{goomba.update(deltaTime);})

	this.map.bricks.forEach(brick => {brick.update(deltaTime);});
	this.map.interrogation.forEach(interrogation => {interrogation.update(deltaTime);});
	this.map.coin.forEach(coin => {	coin.update(deltaTime);	});

	var cameraWidth = document.getElementById("game-layer").width;

	this.enemisGommba.forEach((goomba)=>{
		var colision  = goomba.collisionBox().intersectSide(this.player.collisionBox());
		if(!!colision ){
			if (colision[1] === 'arriba'){
				goomba.die();
			}else if(goomba.active && goomba.live){
				this.player.die();
			}
		}
		if (goomba.sprite.x >= this.maxCameraX && goomba.sprite.x <= this.maxCameraX + cameraWidth) {
			goomba.move = true;
		}

	})
	

	this.map.bricks.forEach(brick => {
		var colisionBrick  = brick.collisionBox().intersectSide(this.player.collisionBox());
		if(!!colisionBrick ){
			if (colisionBrick[1] === 'abajo'){
				// this.brick.sprite.y -= 0.5; 
				brick.bouncing = true;
				// this.player.sprite.y -= 2
			}
		}
	});

	this.map.interrogation.forEach(interrogation => {
		var colitionInterrogation  = interrogation.collisionBox().intersectSide(this.player.collisionBox());
		if(!!colitionInterrogation && colitionInterrogation[1] === 'abajo'){
			interrogation.die();
			interrogation.bouncing = true;
		}
	});

	this.map.coin.forEach(coin => {
		if( coin.collisionBox().intersect(this.player.collisionBox())){
			coin.active = false;
		}
	})
}

Scene.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Calculate the position of the camera. The camera follows the player, staying a certain distance away.
    var cameraX = this.player.sprite.x - canvas.width / 2;
    cameraX = Math.max(0, cameraX); // Don't go beyond the left edge of the map
    cameraX = Math.min(this.map.map.width*32 - canvas.width, cameraX); // Don't go beyond the right edge of the map

    // Ensure the camera never moves back
    cameraX = Math.max(cameraX, this.maxCameraX);

    this.maxCameraX = cameraX;

    // Apply transformation to context
    context.save();
    context.translate(-cameraX, 0);

	
	// Clear background
	context.fillStyle = "#87CEEB";
	context.fillRect(0, 0, this.map.map.width*32, canvas.height);

	// Draw tilemap
	this.map.draw();

	this.enemisGommba.forEach(goomba => { if(goomba.active) goomba.draw(); })
	
	this.map.bricks.forEach(brick => {	brick.draw();	});
	this.map.interrogation.forEach(interrogation => {	interrogation.draw();	});
	this.map.coin.forEach(coin => {	if(coin.active)	coin.draw();	});
	this.player.draw();

	// Restore the context
	context.restore();


}



