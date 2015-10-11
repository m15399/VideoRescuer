

function Interceptor(x, y, a){
	this.size = 20,
	this.health = 6;
	this.scoreValue = 75;
	
	this.x = x;
	this.y = y;
	
	this.speed = 8;
	
	this.r = a;
	this.rv = .045;
	this.dead = false;
	
	this.image = Resources.loadImage(imagesURL + 'Interceptor.png');
	
}
Interceptor.prototype = {
	update: function(){
				
		this.r = Utils.normalizeRadians(this.r);
		
		var v = Utils.moveAtAngle(this.x, this.y, this.r+Math.PI/2, this.speed);
		this.x = v.x;
		this.y = v.y;
		
		var da = Utils.normalizeRadians(Utils.vectorAngle(Utils.vectorToPlayer(this.x, this.y))-Math.PI/2-this.r);
		if(da < -this.rv){
			this.r -= this.rv;
		} else if(da > this.rv){
			this.r += this.rv;
		} else {
			this.r += da;
		}
		if(this.h < -100)
			this.r = 0;
		
		if(this.y > h + 100 + this.size || this.x < -200 || this.x > w+200)
			EnemyMgr.removeEnemy(this);
			
	},
	
	draw: function(g){
		g.save();
		g.translate(this.x|0, this.y|0);
		g.rotate(this.r);
		Utils.drawImageCentered(this.image, 0, 0, g);
		g.restore();
		
		Utils.drawBounds(this);
	},
	
	hit: function(dmg){
		this.health -= dmg;
		if(this.health <= 0){
			this.kill();
		}
	},
	
	kill: function(){
		if(this.dead)
			return;
		this.dead = true;
		Level.score += Level.multiplier * this.scoreValue;
		Player.addPower(2);
		new Popup(this.x, this.y, '' + Level.multiplier * this.scoreValue);
		EnemyMgr.removeEnemy(this);
	}
	
}
