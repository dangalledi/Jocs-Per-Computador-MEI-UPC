
// Tilemap. Draws a tilemap using a texture as a tilesheet.

function Tilemap(tilesheet, tileSize, blockGrid, basePos, map)
{
	this.tileSize = tileSize;
	this.basePos = basePos;
	this.blockGrid = blockGrid;
	this.map = map

	this.tilesheet = tilesheet;
	this.bricks = [];
	this.interrogation = [];
	this.coin = [];
}

Tilemap.prototype.draw = function ()
{
	// Only draw if tilesheet texture already loaded
	if(!this.tilesheet.isLoaded())
		return;
		
	// Size of each block in pixels
	blockSize = [this.tilesheet.width() / this.blockGrid[0], this.tilesheet.height() / this.blockGrid[1]];
	
	// Compute block positions in tilesheet
	var tilePositions = [];
	for(var y=0, tileId=0; y<this.blockGrid[1]; y++)
		for(var x=0; x<this.blockGrid[0]; x++, tileId++)
			tilePositions.push([x * blockSize[0], y * blockSize[1]]);
			
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Draw the map
	var tileId;
	context.imageSmoothingEnabled = false;
	for(var lay=0; lay < this.map.layers.length; lay++){
		for(var j=0, pos=0; j<this.map.height; j++)
			for(var i=0; i<this.map.width; i++, pos++)
			{
				tileId = this.map.layers[lay].data[pos];
				if(tileId != 0){
					// If the tileId matches the given tileId, replace it with a brick
					if(tileId === 4){
						var brick = new Brick(this.basePos[0] + this.tileSize[0] * i, this.basePos[1] + this.tileSize[1] * j); // Create a new Brick
						this.map.layers[lay].data[pos] = 0; // Set the tile to 0 (empty)
						this.bricks.push(brick); // Add the brick to the bricks array
					}
					if(tileId === 22){
						var interrogation = new Interrogation(this.basePos[0] + this.tileSize[0] * i, this.basePos[1] + this.tileSize[1] * j); // Create a new Brick
						this.map.layers[lay].data[pos] = 0; // Set the tile to 0 (empty)
						this.interrogation.push(interrogation); // Add the brick to the bricks array
					}
					if(tileId === 21){
						var coin = new Coin(this.basePos[0] + this.tileSize[0] * i, this.basePos[1] + this.tileSize[1] * j); // Create a new Brick
						this.map.layers[lay].data[pos] = 0; // Set the tile to 0 (empty)
						this.coin.push(coin); // Add the brick to the bricks array
					}
					else{
						context.drawImage(this.tilesheet.img, tilePositions[tileId-1][0], tilePositions[tileId-1][1], blockSize[0], blockSize[1], 
										this.basePos[0] + this.tileSize[0] * i, this.basePos[1] + this.tileSize[1] * j, blockSize[0], blockSize[1]);
					}
				}
			
			}
	}
}

// Computes if the left part of a sprite collides with the tilemap.
// Returns a boolean with the result.

Tilemap.prototype.collisionMoveLeft = function(sprite)
{
	var x = Math.floor((sprite.x - this.basePos[0]) / this.tileSize[0]);
	var y0 = Math.floor((sprite.y - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);
	
	for(var y=y0; y<=y1; y++)
	{
		if(this.map.layers[2].data[y * this.map.width + x] != 0)
			return true;
	}
	
	return false;
}

// Computes if the right part of a sprite collides with the tilemap.
// Returns a boolean with the result.

Tilemap.prototype.collisionMoveRight = function(sprite)
{
	var x = Math.floor((sprite.x + sprite.width - 1 - this.basePos[0]) / this.tileSize[0]);
	var y0 = Math.floor((sprite.y - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);
	
	for(var y=y0; y<=y1; y++)
	{
		if(this.map.layers[2].data[y * this.map.width + x] != 0)
			return true;
	}
	
	return false;
}

// Computes if the bottom of a sprite collides with the tilemap.
// Returns a boolean with the result, and if it collides, it changes its Y position so as to avoid it.

Tilemap.prototype.collisionMoveDown = function(sprite)
{
	var y = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);
	var x0 = Math.floor((sprite.x - this.basePos[0]) / this.tileSize[0]);
	var x1 = Math.floor((sprite.x + sprite.width - 1 - this.basePos[0]) / this.tileSize[0]);
	
	for(var x=x0; x<=x1; x++)
	{
		if(this.map.layers[2].data[y * this.map.width + x] != 0)
		{
			sprite.y = y * this.tileSize[1] - sprite.height + this.basePos[1];
			return true;
		}
	}
	
	return false;
}

// Computes if the top of a sprite collides with the tilemap.
// Returns a boolean with the result, and if it collides, it changes its Y position so as to avoid it.

Tilemap.prototype.collisionMoveUp = function(sprite)
{
    var y = Math.floor((sprite.y - this.basePos[1]) / this.tileSize[1]);
    var x0 = Math.floor((sprite.x - this.basePos[0]) / this.tileSize[0]);
    var x1 = Math.floor((sprite.x + sprite.width - 1 - this.basePos[0]) / this.tileSize[0]);
    
    for(var x=x0; x<=x1; x++)
    {
        if(this.map.layers[2].data[y * this.map.width + x] != 0)
        {
            sprite.y = (y + 1) * this.tileSize[1] + this.basePos[1];
            return true;
        }
    }
    
    return false;
}
