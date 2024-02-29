
// 2D boxes for collision detection

function Box(min_x, min_y, max_x, max_y)
{
	this.min_x = min_x;
	this.max_x = max_x;
	this.min_y = min_y;
	this.max_y = max_y;
}


Box.prototype.intersect = function(box2)
{
	console.log(this.max_x >= box2.min_x)
	console.log(box2.max_x >= this.min_x)
	console.log(this.max_y >= box2.min_y)
	console.log(box2.max_y >= this.min_y)

	return (this.max_x >= box2.min_x) && (box2.max_x >= this.min_x) &&
	       (this.max_y >= box2.min_y) && (box2.max_y >= this.min_y);
}