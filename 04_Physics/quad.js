
// Quad. Draws a rectangle in a given color.

function Quad(x, y, width, height, color = "white", text='')
{
	this.x = x
	this.y = y
	this.width = width
	this.height = height
	this.color = color

	this.text = text;
}


Quad.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Draw the rectangle
	context.fillStyle = this.color;
	context.fillRect(this.x, this.y, this.width, this.height);

	context.font = "10px Mario";
	context.fillStyle = "#293935";
	var textSize = context.measureText(this.text);
		//context.fillText(text, 256 - textSize.width/2, 224 + 36);
	context.fillText(this.text, this.x+ 64-textSize.width/2, this.y+this.height/2);
}


