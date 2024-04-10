
// Main class. Executes the game loop, redrawing the scene as needed.

const FRAME_RATE = 60;
const TIME_PER_FRAME = 1000 / FRAME_RATE;
const TIMEOUT = 200;

var scene = new Scene(3);
var previousTimestamp;
var keyboard = [];
var interacted;
var isPaused = false;
// Control keyboard events


function keyDown(keycode)
{
	if(keycode.which >= 0 && keycode.which < 256)
		keyboard[keycode.which] = true;

	if(keycode.which === 80) {
		// Toggle the pause state
		isPaused = !isPaused;
	}
}

function keyUp(keycode)
{
	if(keycode.which >= 0 && keycode.which < 256)
		keyboard[keycode.which] = false;
}

function click()
{
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
		if (!isPaused) scene.update(TIME_PER_FRAME);
		previousTimestamp += TIME_PER_FRAME;
		deltaTime = timestamp - previousTimestamp;
	}
	if(bUpdated)
		scene.draw();


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

function restartGame(lives) {
	if(lives==0){
		pauseGame()
	}else{
		scene = new Scene(lives);
		isPaused = false;
		init();
		frameUpdate(previousTimestamp);
	}
}

// Init and launch game loop
init();
frameUpdate(previousTimestamp);