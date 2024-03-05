

// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/fondo.png");

	// Create tilemap
	this.map = new Tilemap(tilesheet, [32, 32], [4, 6], [0, 0], level01);

	
	// this.brick = new Brick(160,224);
	// Create entities
	this.player = new Player(224,352, this.map);

	this.bubble = new Bubble(360, 112);
	
	this.bubbleActive = true;
	
	this.goomba = new Goomba(704,352, this.map);
	// Store current time
	this.currentTime = 0
}


Scene.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;
	
	// Update entities
	this.player.update(deltaTime);

	this.bubble.update(deltaTime);

	this.goomba.update(deltaTime);

	this.map.bricks.forEach(brick => {
		brick.update(deltaTime);
	});
	this.map.interrogation.forEach(interrogation => {
		interrogation.update(deltaTime);
	});
	this.map.coin.forEach(coin => {
		coin.update(deltaTime);
	});

	// this.brick.update(deltaTime);

	// Check for collision between entities
	if(this.player.collisionBox().intersect(this.bubble.collisionBox()))
		this.bubbleActive = false;
	
	// this.player.collisionBox().intersectSide(this.brick.collisionBox())
	var colision  = this.goomba.collisionBox().intersectSide(this.player.collisionBox());
	if(!!colision ){
		if (colision[1] === 'arriba'){
			this.goomba.die();
		}else if(this.goomba.active && this.goomba.live){
			this.player.die();
		}
	}

	this.map.bricks.forEach(brick => {
		// console.log(brick.collisionMoveDown(this.player))

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

	// console.log(this.player.sprite.x + this.player.sprite.width - 4 > canvas.width , 'this.player.sprite.x + this.player.sprite.width - 4 > canvas.width ')
	// console.log(-this.player.sprite.x + canvas.width)
	// console.log(this.player.sprite.x > this.player.playerLastX, '')
	// Check if the player is near the right edge of the canvas
	// if(this.player.sprite.x + this.player.sprite.width - 4 > 2 *canvas.width/3 && this.player.sprite.x > this.player.playerLastX){
    //     // Apply transformation to context
    //     context.save();
    //     context.translate(-this.player.sprite.x + 2 *canvas.width/3, 0);
    // }
	
	// Clear background
	context.fillStyle = "#87CEEB";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw tilemap
	this.map.draw();

	if(this.goomba.active) this.goomba.draw();
	
	// this.brick.draw();

	this.map.bricks.forEach(brick => {
		brick.draw();
	});
	this.map.interrogation.forEach(interrogation => {
			interrogation.draw();
	});
	this.map.coin.forEach(coin => {
		if(coin.active)
			coin.draw();
	});

	this.player.draw();

	// // If the transformation was applied, restore the context
    // if (this.player.sprite.x + this.player.sprite.width - 4 > 2 *canvas.width/3 && this.player.sprite.x > this.player.playerLastX) {
    //     context.restore();
    // }

}



