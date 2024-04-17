
// 2D boxes for collision detection

function Box(min_x, min_y, max_x, max_y)
{
	this.min_x = min_x;
	this.max_x = max_x;
	this.min_y = min_y;
	this.max_y = max_y;

	this.centro_x = max_x/2;
	this.centro_y = max_y/2;
}

Box.prototype.intersect = function(box2)
{
	return (this.max_x >= box2.min_x) && (box2.max_x >= this.min_x) &&
	       (this.max_y >= box2.min_y) && (box2.max_y >= this.min_y);
}

Box.prototype.intersectSide = function(box2){
	if(this.intersect(box2)){
		var datos = [];
		datos[0]= this.centro_x-box2.centro_x < 0 ? 'derecha': 'izquierda'
		datos[1] = this.centro_y-box2.centro_y < 0 ? 'abajo': 'arriba' 
		return datos;
	}
}