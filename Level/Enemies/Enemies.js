
// WAVE

function Wave(whenDead){
	this.count = 0;
	this.whenDead = whenDead || function(enemy){
			PowerUpMgr.spawnPU(enemy.x, enemy.y);
		};
}
Wave.prototype = {
	add: function(enemy){
		enemy.wave = this;
		this.count++;
	},
	
	remove: function(enemy){
		this.count--;
		if(this.count== 0)
			this.whenDead(enemy);
	},
	
	invalidate: function(){
		this.count = 1000;
	}
}

// ENEMIES

function Target(x, y){
	this.size = 35;
	this.health = 15;
	this.scoreValue = 50;
	
	this.x = x;
	this.y = -50;
	this.destY = y;
	
	this.dead = false;
	this.speed = 8;
	
	this.image = Resources.loadImage(imagesURL + 'Target.png');
	
}
Target.prototype = {
	
	update: function(){
		if(this.destY > this.y){
			this.y += this.speed;
		}
	},
	
	draw: function(g){
		Utils.drawImageCentered(this.image, this.x, this.y, g);
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


function AllyTurret(x, y){
	this.size = 50;
	
	this.x = x;
	this.y = -60;
	this.destY = y;
	
	this.dir = 1;
	this.speed = 8;
	this.life = 0;
	
	this.bulletMgr = EnemyMgr.bulletMgr;
	this.weapon = new AllyTurretWeapon(this);
	
	this.image = Resources.loadImage(imagesURL + 'AllyTurret.png');
	
}
AllyTurret.prototype = {
	
	update: function(){
		this.life++;
		if(this.life == 300){
			this.dir = -1;
		}
		if(this.dir == -1 && this.y < -100){
			this.kill();
		}
		if((this.dir == 1 && this.destY > this.y) || (this.dir == -1 && this.y > -200)){
			this.y += this.dir*this.speed;
		} else {
			this.weapon.update();
			this.weapon.fire();
		}
	},
	
	draw: function(g){
		Utils.drawImageCentered(this.image, this.x, this.y, g);
		Utils.drawBounds(this);
	},
	
	hit: function(dmg){
		
	},
	
	kill: function(){
		EnemyMgr.removeEnemy(this);
	}
	
}


function Asteroid(x, y){
	this.size = 65;
	this.health = 65;
	
	this.x = x;
	this.y = y;
	
	this.dead = false;
	
	this.r = Math.random()*2*Math.PI;
	this.rv = Math.random()*.02 - .01;
	
	this.image = Resources.loadImage(imagesURL + 'Asteroid' + (Math.random()*3|0+1) + '.png');
	
}
Asteroid.prototype = {
	update: function(){
		this.y += Background.speed;
		if(this.y > h+110)
			EnemyMgr.removeEnemy(this);
		this.r += this.rv;
	},
	
	draw: function(g){
		g.save();
		g.translate(this.x, this.y);
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
		EnemyMgr.removeEnemy(this);
	}
	
}

function CatShip(){
	this.size = 30;
	
	this.x = w/2;
	this.y = -100;
	this.yv = 0;
	
	this.image = Resources.loadImage(imagesURL + 'Catship.png');
	this.script = new Script(this.script, this);

}
CatShip.prototype = {
	update: function(){
		this.script.update();
		this.y += this.yv;
	},
	
	draw: function(g){
		Utils.drawImageCentered(this.image, this.x, this.y, g);
		
		Utils.drawBounds(this);
	},
	
	hit: function(dmg){},
	
	script: function(s){
		var that = s.par;
		
		s.does(function(){
			that.yv = 2;
		});
		s.wait(135);
		
		s.does(function(){
			that.yv = 0;
			new Dialog(h/2, 'u may has defeated me this time, but \nu has not seen the last of evil cat!', 1);
		});
		s.wait(250);
		
		s.does(function(){
			that.yv = -2;
		});
		s.wait(300);
		
		s.does(function(){
			EnemyMgr.resetIndicies();
		});
		
		
	}
}


function FlyingBox(x, y, video){
	this.size = 50;
	this.health = 15;
	this.scoreValue = 200;

	this.x = x;
	this.y = y;
	
	this.dead = false;
	this.speed = 1;
	
	this.bulletMgr = EnemyMgr.bulletMgr;
	this.weapon = new MonsterLaser(this);
	
	this.image = Resources.loadImage(video.thumbnail.sqDefault);
}
FlyingBox.prototype = {
	update: function(){
		this.y += this.speed;
		if(this.y > h + 100 + this.size)
			EnemyMgr.removeEnemy(this);
		this.weapon.update();
	},
	
	draw : function(g){
		Utils.drawImageCentered(this.image, this.x, this.y, g);
		
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
		PowerUpMgr.spawnPU(this.x, this.y);
		EnemyMgr.removeEnemy(this);
	}
}
