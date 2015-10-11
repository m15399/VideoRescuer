

// there are 2 bullet managers, one for player bullets, one for enemy bullets

function BulletMgr(maxBullets){
	
	this.maxBullets = maxBullets;
	
	this.bullets = [];
	this.freeIndicies = [];
	
	this.init();
}
BulletMgr.prototype = {
	
	init: function(){
		
		for(var i = 0; i < this.maxBullets; i++){
			this.bullets[i] = null;
			this.freeIndicies.push(i);
		}
		
	},
	
	update: function(){
		
		for(var i = 0; i < this.maxBullets; i++){
			var bullet = this.bullets[i];
			if(!bullet)
				continue;
			
			bullet.update();
		}
		
	},
	
	draw: function(g){
		
		for(var i = 0; i < this.maxBullets; i++){
			var bullet = this.bullets[i];
			if(!bullet)
				continue;
			
			bullet.draw(g);
		}
		
	},
	
	addBullet: function(bullet){
		if(bullet.x <= Level.margin || bullet.x > w-Level.margin || bullet.y < 0 || bullet. y > h)
			return bullet;
		if(this.freeIndicies.length == 0){
			console.log("TOO MANY BULLETS");
			return bullet;
		}
		var index = this.freeIndicies.shift();
		bullet.bindex = index;
		
		this.bullets[index] = bullet;
		return bullet;
	},
	
	removeBullet: function(bullet){
		var index = bullet.bindex;
		this.freeIndicies.push(index);
		
		this.bullets[index] = null;
		return bullet;
	}
	
}