

function BasicBullet(x, y, xv, yv, size, color, manager){
	this.bulletMgr = manager;
	
	this.x = x;
	this.y = y;
	this.xv = xv;
	this.yv = yv;
	
	this.dmg = 1;
	this.size = size;
	this.color = color;
	
}
BasicBullet.prototype = {
	
	update: function(){
		this.x += this.xv;
		this.y += this.yv;
		
		if(this.y < -this.size || this.y > h + this.size || this.x > w + this.size || this.x < -this.size)
			this.bulletMgr.removeBullet(this);
	},
	
	draw: function(g){
		g.fillStyle = this.color;
		Utils.fillCircle(this.x, this.y, this.size);
	},
	
	hit: function(){
		this.bulletMgr.removeBullet(this);
	}
}

function ImageBullet(x, y, xv, yv, size, image, manager){
	this.bulletMgr = manager;
	
	this.x = x;
	this.y = y;
	this.xv = xv;
	this.yv = yv;
	
	this.dmg = 1;
	this.size = size;
	this.image = image;
}
ImageBullet.prototype = {
	
	update: function(){
		this.x += this.xv;
		this.y += this.yv;
		
		if(this.y < -this.size || this.y > h + this.size || this.x > w + this.size*2 || this.x < -this.size*2)
			this.bulletMgr.removeBullet(this);
	},
	
	draw: function(g){
		Utils.drawImageCentered(this.image, this.x, this.y, g);
		Utils.drawBounds(this);
	},
	
	hit: function(){
		this.bulletMgr.removeBullet(this);
	}
}

function PMissile(x, y, xdir, manager){
	this.bulletMgr = manager;
	
	this.x = x;
	this.y = y;
	
	this.xv = xdir * 2;
	this.yv = 10;
	
	this.dmg = 3;
	this.size = 10;
	
	this.image = Resources.loadImage(imagesURL + 'Missile.png');
	
}
PMissile.prototype = {
	
	update: function(){
		this.x += this.xv;
		this.y += this.yv;
		if(this.y < 0)
			this.bulletMgr.removeBullet(this);
		
		this.yv -= 1;
		
	},
	
	draw: function(g){
		Utils.drawImageCentered(this.image, this.x, this.y, g);
		
		Utils.drawBounds(this);
		
	},
	
	hit: function(){
		this.bulletMgr.removeBullet(this);
	}
	
}

function Bomb(x, y, manager){
	this.bulletMgr = manager;
	
	this.x = x|0;
	this.y = y|0;
	
	this.dmg = 2;
	this.maxSize = 200;
	this.size = Player.size;
	this.growthRate = 20;
	
	this.images = [];
	this.images[0] = Resources.loadImage(imagesURL + 'Bomb1.png');
	this.images[1] = Resources.loadImage(imagesURL + 'Bomb2.png');
	this.images[2] = Resources.loadImage(imagesURL + 'Bomb3.png');
	this.images[3] = Resources.loadImage(imagesURL + 'Bomb4.png');
	
	this.image = this.images[0];
}
Bomb.prototype = {
	
	update: function(){
		this.size += this.growthRate;
		
		for(var i = 0; i < EnemyMgr.bulletMgr.maxBullets; i++){
			var b = EnemyMgr.bulletMgr.bullets[i];
			if(b && Utils.square(this.x-b.x) + Utils.square(this.y-b.y) < Utils.square(this.size)){
				EnemyMgr.bulletMgr.removeBullet(b);
			}
		}
		if(frameCount % 1 == 0){
			var old = this.image;
			var newi = Math.random()*3|0;
			if(this.image != this.images[newi])
				this.image = this.images[newi];
			else
				this.image = this.images[newi+1];
		}
		
		if(this.maxSize - this.size < this.growthRate*2)
			this.dmg = 120;
		if(this.size > this.maxSize - this.growthRate)
			this.bulletMgr.removeBullet(this);
	},
	
	draw: function(g){
		g.save();
		g.beginPath();
		g.arc(this.x, this.y, this.size+50, 0, 2*Math.PI);
		g.closePath();
		g.clip();
		Utils.drawImageCentered(this.image, this.x, this.y, g);
		g.restore();
		
		Utils.drawBounds(this);
	},
	
	hit: function(){
		//console.log(this.dmg);
	}
}