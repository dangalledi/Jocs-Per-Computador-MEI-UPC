const STAR_ACTIVE = 0;

function Star(x, y, map) {
    var star = new Texture("imgs/star.png");
    this.sprite = new Sprite(x, y, 32, 32, 20, star);

    this.active = true;
    this.direction = "right";
    this.map = map;

    this.sprite.addAnimation();
	this.sprite.addKeyframe(STAR_ACTIVE, [0, 0, 16, 16]);
	this.sprite.addKeyframe(STAR_ACTIVE, [16, 0, 16, 16]);
	this.sprite.addKeyframe(STAR_ACTIVE, [32, 0, 16, 16]);
	this.sprite.addKeyframe(STAR_ACTIVE, [48, 0, 16, 16]);

	this.sprite.setAnimation(STAR_ACTIVE);

    // Set attributes for jump
	this.bJumping = true;
	this.jumpAngle = 0;
    this.startY = y; // Initialize startY with the initial y position
    this.jumpTime = true;

    this.upBrick = false; //piso brick
	this.downBrick = false; //choque arriba ladrillo
	this.down=false;
	this.leftColision = false;
	this.rigthColision = false;
	
}

Star.prototype.update = function update(deltaTime){
    this.controlFormaBrick(this.map.bricks);
    this.controlFormaBrick(this.map.interrogation);

    if(this.direction == "left") {
        if(this.sprite.currentAnimation != WALK_LEFT) {
            this.sprite.setAnimation(WALK_LEFT);
        }
        this.sprite.x -= 1;
        if(this.map.collisionMoveLeft(this.sprite)){
            this.sprite.x += 1;
            this.direction = "right";
        }
    } else {
        if(this.sprite.currentAnimation != WALK_RIGHT) {
            this.sprite.setAnimation(WALK_RIGHT);
        }
        this.sprite.x += 1;
        if(this.map.collisionMoveRight(this.sprite)){
            this.sprite.x -= 1;
            this.direction = "left";
        }
    }

    if (this.bJumping) {
        this.jumpAngle += 4;
        if (this.jumpAngle == 180) {
            this.bJumping = false;
            this.sprite.y = this.startY;
        }
        else {
            this.sprite.y = this.startY - 96 * Math.sin(3.14159 * this.jumpAngle / 180); //salta

            if (this.jumpAngle > 90)
                this.bJumping = (!this.map.collisionMoveDown(this.sprite) && !this.upBrick); //se queda en la plataforma
            if (this.map.collisionMoveUp(this.sprite)) { //Intento de que se salga del mapa por arriba
                this.bJumping = false;
            };
        }
    }
    else {
        // Move Bub so that it is affected by gravity
        this.sprite.y += 2;

        if (this.map.collisionMoveDown(this.sprite) || this.upBrick) {
            this.jump();
        }
    }

	this.sprite.update(deltaTime);
}

Star.prototype.draw = function draw(){
    if (this.active) this.sprite.draw();
}

Star.prototype.collisionBox = function(){
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}

Star.prototype.jump = function () {
	this.upBrick = false
	// Check arrow up key. If pressed, jump.
    if(this.jumpTime){
        this.jumpTime=false;
        this.bJumping = true;
		this.jumpAngle = 0;
		this.startY = this.sprite.y;
    }
	setTimeout(() => {
		this.jumpTime= true;
	}, 1000);
}

Star.prototype.controlFormaBrick = function (ladrillos) {
	for (var i = 0; i < ladrillos.length; i++) {
		var brick = ladrillos[i];
		var col = this.collisionBox().intersectSide(brick.collisionBox());

		if (!!col && col[1] === 'arriba') {
			this.bJumping = false;
			this.downBrick = true
		}
		if (!!col && col[1] === 'abajo') {
			// If the player is colliding with the brick, move the player to the top of the brick
			this.sprite.y = brick.sprite.y - this.sprite.height;
			// this.bJumping = false;
			this.upBrick = true
		}
		if (!!col && col[0] === 'derecha') {
			if (!!col && col[1] != 'abajo') this.sprite.x -= 2;
			// this.bJumping = false;
		}
		if (!!col && col[0] === 'izquierda') {
			if (!!col && col[1] != 'abajo') this.sprite.x += 2;
			// this.bJumping = false;
		}
	}
}