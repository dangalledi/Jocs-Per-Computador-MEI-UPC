
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
	return (this.max_x >= box2.min_x) && (box2.max_x >= this.min_x) &&
	       (this.max_y >= box2.min_y) && (box2.max_y >= this.min_y);
}


Box.prototype.intersectLeft = function(box2)
{
	return  this.min_x <= box2.min_x && this.max_x >= box2.min_x;
}

Box.prototype.intersectRigth = function(box2)
{
	return this.max_x >= box2.max_x && this.min_x <= box2.max_x;
}

Box.prototype.intersectTop = function(box2)
{
	return this.min_y <= box2.min_y && this.max_y >= box2.min_y;
}

Box.prototype.intersectBottom = function(box2)
{
	return this.max_y >= box2.max_y && this.min_y <= box2.max_y;
}

Box.prototype.intersectY = function(box2)
{
	return (this.max_y >= box2.min_y) && (box2.max_y >= this.min_y);
}

Box.prototype.intersectX = function(box2)
{
	return (this.max_x >= box2.min_x) && (box2.max_x >= this.min_x)
}