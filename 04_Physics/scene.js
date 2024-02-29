

// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/fondo.png");

	// Create tilemap
	this.map = new Tilemap(tilesheet, [32, 32], [4, 5], [0, 0], level01);
	
	// Create entities
	this.player = new Player(224,0, this.map);
	this.bubble = new Bubble(360, 112);

	this.coin = new Coin(460, 112);
	this.coin2 = new Coin(560, 182);
	this.coin3 = new Coin(460, 162);
	this.coin4 = new Coin(260, 112);
	this.coin5 = new Coin(480, 212);
	this.coin6 = new Coin(410, 112);
	this.coin7 = new Coin(160, 12);

	this.bubbleActive = true;
	this.coinActive = true;
	this.coin2Active = true;
	this.coin3Active = true;
	this.coin4Active = true;
	this.coin5Active = true;
	this.coin6Active = true;
	this.coin7Active = true;
	
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


	if(this.player.collisionBox().intersectX(this.goomba.collisionBox())){
		this.player.die();
	}

	// if(this.player.collisionBox().intersectBottom(this.goomba.collisionBox())){
	// 	this.goomba.die();
	// }


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

	this.player.draw();
}



