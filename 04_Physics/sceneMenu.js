

function SceneMenu() {
	var tilesheet = new Texture("imgs/fondo.png");
    this.level = JSON.parse(JSON.stringify(menuPrincipal));

    // Create tilemap
	this.map = new Tilemap(tilesheet, [32, 32], [4, 9], [0, 0], this.level);
    
    this.quads = new Array();
	this.quads.push(new Quad(256-128/2, 246, 128, 32, "white","Inicio Juego",goToLevel01()));
	this.quads.push(new Quad(256-128/2, 280, 128, 32, "white","Intrucciones",goToLevel01()));

    // Store current time
    this.currentTime = 0

    this.puntaje = 0;
    this.cantMoney= 0;
}

SceneMenu.prototype.update = function (deltaTime) {
// Keep track of time
    this.currentTime += deltaTime;
}

SceneMenu.prototype.draw = function () {
	//console.log(this.currentTime)
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "#87CEEB";
	context.fillRect(0, 0, this.map.map.width * 32, canvas.height);

	// Draw tilemap
	this.map.draw();
    this.quads.forEach(qa =>{qa.draw()});


    //Mensaje principal?
    var text = "Super";
    var text2 = "MARIO";
    context.font = "45px Mario";
    var textSize = context.measureText(text);
    context.fillStyle = "#293935";
    context.fillText(text, 256 - textSize.width / 2, 200-40);
    context.fillText(text2, 256 - textSize.width / 2, 250-40);

	// Restore the context
	context.restore();

	text = "Puntaje: " + completeNumbre(this.puntaje, 6) + "  Monedas: " +this.cantMoney +"  Vidas: " + 0 ;
	text2 ="Time: "+ completeNumbre(0, 3) + " seconds"
	context.font = "10px Mario";
	context.fillStyle = "#fff";
	context.fillText(text, 10, 25);
	context.fillText(text2, 10, 40);
}

