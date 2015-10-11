

function Exploder(x, y, delay){
	this.size = 38,
	this.health = 15;
	this.scoreValue = 125;
	
	this.x = x;
	this.delay = delay || 0;
	this.destY = y;
	this.y = -60 - delay*Background.speed;
	
	this.speed = 2;
	
	this.dead = false;
		
	this.bulletMgr = EnemyMgr.bulletMgr;
	this.weapon = new ExploderWeapon(this);

	this.image = Resources.loadImage(imagesURL + (this.x < w/2 ? 'Exploder.png' : 'ExploderFlipped.png'));
	this.imageFull = Resources.loadImage(imagesURL + (this.x < w/2 ? 'ExploderFull.png' : 'ExploderFullFlipped.png'));
	
}
Exploder.prototype = {
	update: function(){
		
		this.y += this.speed;
		
		if(this.y > this.destY)
			this.explode();
			
		if(this.dead || this.y > h + 100 + this.size)
			EnemyMgr.removeEnemy(this);
		
	},
	
	draw: function(g){
		if(this.dead)
			return;
		g.save();
		g.translate(this.x|0, this.y|0);
		Utils.drawImageCentered((this.y < this.destY - 50 ? this.image : this.imageFull), 0, 0, g);
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
	},
	
	explode: function(){
		this.weapon.fire();
		this.dead = true;
	}
}

function ExploderWeapon(par){
	this.par = par;
	this.bulletMgr = par.bulletMgr;
	
		
}
ExploderWeapon.prototype = {
	
	fire: function(){
		var minSpeed = 5;
		var maxSpeed = 13;
		
		for(var i = 0; i < 40; i++){
			var a = Math.random() * Math.PI*2;
			var v = Utils.moveAtAngle(0, 0, a, Math.random()*(maxSpeed-minSpeed)+minSpeed);
			this.bulletMgr.addBullet(new BasicBullet(this.par.x, this.par.y, v.x, v.y, 5, 'yellow', this.bulletMgr));
		}
		
	}
	
}