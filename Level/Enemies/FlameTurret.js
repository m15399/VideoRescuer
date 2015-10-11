

function FlameTurret(x, y){
	this.size = 38,
	this.health = 25;
	this.scoreValue = 150;
	
	this.x = x;
	this.y = y;

	this.dead = false;
			
	this.bulletMgr = EnemyMgr.bulletMgr;
	this.weapon = new FlameTurretWeapon(this);

	this.image = Resources.loadImage(imagesURL + 'FlameTurret.png');
	
}
FlameTurret.prototype = {
	update: function(){
		
		this.y += 1;
				
		if(this.y > h + 100)
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

function FlameTurretWeapon(par){
	this.par = par;
	this.bulletMgr = par.bulletMgr;
	
	this.reloadTime = 0;
	this.bspeed = 11;
		
	this.script = new Script(this.script, this);
	this.script.jumpTo(Math.random()*this.reloadTime|0);
}
FlameTurretWeapon.prototype = {
	
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
		this.bulletMgr.addBullet(new FlameBullet(this.par.x, this.par.y-yv-15, xv+Math.random()*1-.5, yv+Math.random()*1-.5, this.bulletMgr));
	}
	
}

function FlameBullet(x, y, xv, yv, manager){
	this.bulletMgr = manager;
	
	this.x = x;
	this.y = y;
	this.xv = xv;
	this.yv = yv;
	
	this.dmg = 1;
	
	this.life = 0;
	this.maxLife = 16;
	this.maxSize = 40;
	this.startSize = 8;
	this.size = this.startSize;
	
}
FlameBullet.prototype = {
	
	update: function(){
		this.x += this.xv;
		this.y += this.yv;
		
		this.life++;
		this.size = this.startSize + this.life/this.maxLife * (this.maxSize-this.startSize);
		
		if(this.y < -this.size || this.y > h + this.size || this.x > w + this.size || this.x < -this.size)
			this.bulletMgr.removeBullet(this);
			
		if(this.life > this.maxLife)
			this.bulletMgr.removeBullet(this);
	},
	
	draw: function(g){
		var c = this.life/this.maxLife * 255;
		var gr = (255-1*c)|0;
		var b = (255-4*c)|0;
		g.fillStyle = 'rgb(255, ' + gr + ', ' + b +')';
		Utils.fillCircle(this.x, this.y, this.size);
	},
	
	hit: function(){
		this.bulletMgr.removeBullet(this);
	}
}


