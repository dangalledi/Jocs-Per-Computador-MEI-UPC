const prize_pole = {0:8000,1:5000, 2:5000, 3:4000, 4:4000,5:2000,6:2000,7:1000 , 8:1000}
var win = false;
var count = 0;

function restartDatosJuego(){
	win = false;
	count = 0;
}
var vidas= 3;//aun no
var monedas = 0;
var puntaje =0;
// Main class. Executes the game loop, redrawing the scene as needed.

const FRAME_RATE = 60;
const TIME_PER_FRAME = 1000 / FRAME_RATE;
const TIMEOUT = 200;

const ESCENA_PRINCIPAL = 0;
const INTRUCCIONES =1;
const ESCENA_LEVEL01 = 2;
const ESCENA_LEVEL02 = 3;
const ESCENA_CREDITOS = 4;

var escena_actual = 0

var previousTimestamp;
var keyboard = [];
var xClick;
var yClick;
var interacted;
var isPaused = false;

var sceneMenu = new SceneMenu();
var scene = new Scene();//no se si dejarlo inicialmenre null
var scene2 = new Scene2();//no se si dejarlo inicialmenre null
var intrucciones = new Intrucciones();
var creditos = new Creditos();
// Control keyboard events


function keyDown(keycode)
{
	if(keycode.which >= 0 && keycode.which < 256)
		keyboard[keycode.which] = true;

	if(keycode.which === 80) {//p
		// Toggle the pause state
		isPaused = !isPaused;
	}
	if(keycode.which === 49) {//1
		goToLevel01();
	}
	if(keycode.which === 50) {// 2
		goToLevel02();
	}
}

function goToLevel01(){
	escena_actual= ESCENA_LEVEL01;
	scene = new Scene();
}

function goToLevel02(){
	escena_actual= ESCENA_LEVEL02;
	scene2 = new Scene2();
}

function goToIntrucciones(){
	escena_actual= INTRUCCIONES;
	//intrucciones = new Intrucciones();
}

function goToMenu(){
	escena_actual= ESCENA_PRINCIPAL;
	//sceneMenu = new SceneMenu();
}

function goToCreditos(){
	escena_actual= ESCENA_CREDITOS;
	//sceneMenu = new SceneMenu();
}

function keyUp(keycode)
{
	if(keycode.which >= 0 && keycode.which < 256)
		keyboard[keycode.which] = false;
}

function click(event)
{
	var canvas = document.getElementById("game-layer");
	var rect = canvas.getBoundingClientRect(); // Obtiene la posición del canvas
    xClick = event.clientX - rect.left; // Coordenada X del clic en el canvas
    yClick = event.clientY - rect.top - 32; // Coordenada Y del clic en el canvas
	interacted = true;
}

// Initialization

function init()
{
	for(var i=0; i<256; i++)
		keyboard.push(false);
	document.body.addEventListener('keydown', keyDown);
	document.body.addEventListener('keyup', keyUp);
	document.body.addEventListener('click', click);
	previousTimestamp = performance.now();
	interacted = false;
}

// Game loop: Update, draw, and request a new frame
function frameUpdate(timestamp){
	var bUpdated = false;
	var deltaTime = timestamp - previousTimestamp;
	while(deltaTime > TIME_PER_FRAME) {
		bUpdated = true;
		if (!isPaused) {
			switch (escena_actual) {
				case ESCENA_PRINCIPAL:
					sceneMenu.update(TIME_PER_FRAME);
					break;
				case INTRUCCIONES:
					intrucciones.update(TIME_PER_FRAME);
					break
				case ESCENA_LEVEL01:
					scene.update(TIME_PER_FRAME);
					break;
				case ESCENA_LEVEL02:
					scene2.update(TIME_PER_FRAME);
					break;
				case ESCENA_CREDITOS:
					creditos.update(TIME_PER_FRAME);
					break;
				default:
					sceneMenu.update(TIME_PER_FRAME);
					break;
			}
		}
		previousTimestamp += TIME_PER_FRAME;
		deltaTime = timestamp - previousTimestamp;
	}
	if(bUpdated){
		switch (escena_actual) {
			case ESCENA_PRINCIPAL:
				sceneMenu.draw();
				break;
			case INTRUCCIONES:
				intrucciones.draw();
				break
			case ESCENA_LEVEL01:
				scene.draw();
				break;
			case ESCENA_LEVEL02:
				scene2.draw();
				break;
			case ESCENA_CREDITOS:
				creditos.draw();
				break;
			default:
				sceneMenu.draw();
				break;
		}
	}
    window.requestAnimationFrame(frameUpdate)
}

// Add a new function to pause the game
function pauseGame() {
    isPaused = true;
}
function unPauseGame() {
    isPaused = true;
}


// Add a new function to resume the game
function resumeGame() {
    isPaused = false;
    previousTimestamp = performance.now();
    frameUpdate(previousTimestamp);
}

function restartGame() {
	if(vidas==0){
		escena_actual= ESCENA_PRINCIPAL;
	}else{
		switch (escena_actual) {
			case ESCENA_PRINCIPAL:
				sceneMenu = new SceneMenu();
				break;
			case ESCENA_LEVEL01:
				scene = new Scene();
				break;
			case ESCENA_LEVEL02:
				scene2 = new Scene2();
				break;
			case INTRUCCIONES:
				intrucciones = new Intrucciones();
				break
			case ESCENA_CREDITOS:
				intrucciones = new Creditos();
				break
			default:
				sceneMenu = new SceneMenu();
				break;
		}
		isPaused = false;
		init();
		frameUpdate(previousTimestamp);
	}
}

// Init and launch game loop
init();
frameUpdate(previousTimestamp);