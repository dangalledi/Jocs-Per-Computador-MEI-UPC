

function Intrucciones(){
    this.currentTime = 0;
    this.quads = new Array();
    this.quads.push(new Quad(256-160/2, 400, 160, 32, "white","Volver a menu",goToMenu));
}

Intrucciones.prototype.update = function (deltaTime) {
    // Keep track of time
    this.currentTime += deltaTime;
    this.quads.forEach(qa =>{qa.update(deltaTime)});

}

Intrucciones.prototype.draw = function () {
    //console.log(this.currentTime)
    // Get canvas object, then its context
    var canvas = document.getElementById("game-layer");
    var context = canvas.getContext("2d");

    // Clear background
    context.fillStyle = "#293935";
    context.fillRect(0, 0, canvas.width, canvas.height);


    this.quads.forEach(qa =>{qa.draw()});

    // Restore the context
	context.restore();

    text =  "Utiliza las flechas para moverte"; 
    text2 = "hacia la izquierda (<) y la derecha (>) ";

    text3 = "Utiliza la tecla espacio para saltar";

    text4 = "Salta para esquivar los obstaculos";
    text5 = "y salta sobre tus enemigos para derrotarlos";

    text6 = "Utiliza el shift para aumentar tu velocidad";

    context.font = "10px Mario";
    context.fillStyle = "#fff";

    var textSize1 = context.measureText(text);
    context.fillText(text, (canvas.width- textSize1.width) / 2, 75);

    var textSize2 = context.measureText(text2);
    context.fillText(text2, (canvas.width- textSize2.width) / 2, 90);
    
    var textSize3 = context.measureText(text3);
    context.fillText(text3, (canvas.width- textSize3.width) / 2, 120);
    
    var textSize4 = context.measureText(text4);
    context.fillText(text4, (canvas.width- textSize4.width) / 2, 150);
    
    var textSize5 = context.measureText(text5);
    context.fillText(text5, (canvas.width- textSize5.width) / 2, 165);
    
    var textSize6 = context.measureText(text6);
    context.fillText(text6, (canvas.width- textSize6.width) / 2, 195);
    // Restore the context
    //context.restore();
}
    
    