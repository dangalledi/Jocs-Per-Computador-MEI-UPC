

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

	this.coin = new Coin(500, 154);
	this.coin2 = new Coin(470, 154);
	this.coin3 = new Coin(440, 154);
	this.coin4 = new Coin(260, 154);
	this.coin5 = new Coin(480, 249);
	this.coin6 = new Coin(410, 249);
	this.coin7 = new Coin(160, 249);
	
	this.interrogation = new Interrogation(224,288);

	this.bubbleActive = true;
	this.coinActive = true;
	this.coin2Active = true;
	this.coin3Active = true;
	this.coin4Active = true;
	this.coin5Active = true;
	this.coin6Active = true;
	this.coin7Active = true;
	
	this.interrogationActive = true;
	
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

	this.coin.update(deltaTime);
	this.coin2.update(deltaTime);
	this.coin3.update(deltaTime);
	this.coin4.update(deltaTime);
	this.coin5.update(deltaTime);
	this.coin6.update(deltaTime);
	this.coin7.update(deltaTime);

	this.goomba.update(deltaTime);

	this.map.bricks.forEach(brick => {
		brick.update(deltaTime);
	});

	// this.brick.update(deltaTime);

	this.interrogation.update(deltaTime);
	
	// Check for collision between entities
	if(this.player.collisionBox().intersect(this.bubble.collisionBox()))
		this.bubbleActive = false;
	
	if(this.player.collisionBox().intersect(this.coin2.collisionBox()))
		this.coin2Active = false;
	if(this.player.collisionBox().intersect(this.coin3.collisionBox()))
		this.coin3Active = false;
	if(this.player.collisionBox().intersect(this.coin4.collisionBox()))
		this.coin4Active = false;
	if(this.player.collisionBox().intersect(this.coin5.collisionBox()))
		this.coin5Active = false;
	if(this.player.collisionBox().intersect(this.coin6.collisionBox()))
		this.coin6Active = false;
	if(this.player.collisionBox().intersect(this.coin7.collisionBox()))
		this.coin7Active = false;
	if(this.player.collisionBox().intersect(this.coin.collisionBox()))
		this.coinActive = false;

	if(this.player.collisionBox().intersect(this.interrogation.collisionBox()))
		this.interrogationActive = false;

	

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
		brick.update(deltaTime);
	});

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


}

Scene.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "#87CEEB";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw tilemap
	this.map.draw();

	if(this.goomba.active) this.goomba.draw();

	// Draw entities
	if(this.bubbleActive)
		this.bubble.draw();
	if(this.coin2Active)
		this.coin2.draw();
	if(this.coin3Active)
		this.coin3.draw();
	if(this.coin4Active)
		this.coin4.draw();
	if(this.coin5Active)
		this.coin5.draw();
	if(this.coin6Active)
		this.coin6.draw();
	if(this.coin7Active)
		this.coin7.draw();

	if(this.interrogationActive)
		this.interrogation.draw();

	// this.brick.draw();

	this.map.bricks.forEach(brick => {
		brick.draw();
	});

	this.player.draw();

}



