

function Saucer(x, y){
	this.size = 40,
	this.health = 20;
	this.scoreValue = 125;
	
	this.x = x;
	this.y = y;

	this.dead = false;
			
	this.bulletMgr = EnemyMgr.bulletMgr;
	this.weapon = new SaucerWeapon(this);

	this.image = Resources.loadImage(imagesURL + 'Saucer.png');
	
}
Saucer.prototype = {
	update: function(){
		
		this.y += 1;
				
		if(this.y > h + 100 + this.size)
			EnemyMgr.removeEnemy(this);
		this.weapon.update();
		
	},
	
	draw: function(g){
		
		Utils.drawImageCentered(this.image, this.x, this.y);
		
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

function SaucerWeapon(par){
	this.par = par;
	this.bulletMgr = par.bulletMgr;
	
	this.reloadTime = 75;
	this.bspeed = 5;
		
	this.script = new Script(this.script, this);
	this.script.jumpTo(Math.random()*this.reloadTime|0);
}
SaucerWeapon.prototype = {
	
	script: function(script){
		var that = script.par;
		
		script.wait(that.reloadTime);
		script.does(function(){
			var v = Utils.vectorToPlayer(that.par.x, that.par.y+10);
			that.fire(v.x*that.bspeed, v.y*that.bspeed);
			
			script.jumpTo(0);
		});
	},
	
	update: function(){
		this.script.update();
	},
	
	fire: function(xv, yv){
		this.bulletMgr.addBullet(new BasicBullet(this.par.x, this.par.y+10, xv, yv, 6, 'yellow', this.bulletMgr));
	}
	
}