
///////////////////
// PLAYER WEAPONS//
///////////////////

function PlayerLaser(par){
	this.par = par;
	this.bulletMgr = par.bulletMgr;
	
	this.reloadTime = 6;
	this.reloadLeft = 0;
	
}
PlayerLaser.prototype = {
	
	update: function(){
		this.reloadLeft--;
	},
	
	fire: function(p){
		if(this.reloadLeft < 0){
			this.reloadLeft = this.reloadTime;
			//Resources.playSound(this.par.sound);
			this.bulletMgr.addBullet(new BasicBullet(this.par.x-10, this.par.y-15, -.1, -8, 5, 'white', this.bulletMgr));
			this.bulletMgr.addBullet(new BasicBullet(this.par.x+10, this.par.y-15, .1, -8, 5, 'white', this.bulletMgr));
			
			if(p > 1){
				this.bulletMgr.addBullet(new BasicBullet(this.par.x-15, this.par.y-10, -.8, -8, 5, 'white', this.bulletMgr));
				this.bulletMgr.addBullet(new BasicBullet(this.par.x+15, this.par.y-10, .8, -8, 5, 'white', this.bulletMgr));
			}
			
			if(p > 2){
				this.shootAt(80);
				this.shootAt(-80);
			}
			
			if(p > 3){
				this.bulletMgr.addBullet(new BasicBullet(this.par.x-10, this.par.y+15, -.1, 8, 5, 'white', this.bulletMgr));
				this.bulletMgr.addBullet(new BasicBullet(this.par.x+10, this.par.y+15, .1, 8, 5, 'white', this.bulletMgr));
			}
		}
	},
	
	shootAt: function(a){
		a = Math.PI/2 + a*2*Math.PI/360;
		var s = Utils.moveAtAngle(this.par.x, this.par.y, a, -this.par.size);
		var e = Utils.moveAtAngle(0, 0, a, -8);
		this.bulletMgr.addBullet(new BasicBullet(s.x, s.y, e.x, e.y, 5, 'white', this.bulletMgr));
	}
}

function PlayerZ(par){
	this.par = par;
	this.bulletMgr = par.bulletMgr;
	
	this.maxAngle = Math.PI*2/5;
	this.center = Math.PI/2;
	
	this.cannons = [this.center + this.maxAngle, this.center, this.center, this.center - this.maxAngle];
	this.dirs = [-1, -1, 1, 1];
	this.aSpeed = Math.PI/20;
	this.colors = ['#faf', 'red', 'orange', 'white'];
	
	this.reloadTime = 0;
	this.reloadLeft = 0;
}
PlayerZ.prototype = {
	fire: function(){
		this.reloadLeft--;
		var shooting = this.reloadLeft < 0;
		if(shooting)
			this.reloadLeft = this.reloadTime;
		var d = 20;
		var v = -10;
		for(var i = 0; i < 4; i++){
			this.cannons[i] += this.dirs[i] * this.aSpeed;
			if(this.cannons[i] < this.center - this.maxAngle){
				this.dirs[i] = 1;
				this.cannons[i] = this.center - this.maxAngle;
			} else if (this.cannons[i] > this.center + this.maxAngle) {
				this.dirs[i] = -1;
				this.cannons[i] = this.center + this.maxAngle;
			}
			if(shooting){
				var s = Utils.moveAtAngle(this.par.x, this.par.y, this.cannons[i], -d);
				var e = Utils.moveAtAngle(0, 0, this.cannons[i], v);
				this.bulletMgr.addBullet(new BasicBullet(s.x, s.y, e.x, e.y, 6, this.colors[i], this.bulletMgr));
			}
		}
	}
}

function PlayerX(par){
	this.par = par;
	this.bulletMgr = par.bulletMgr;
}
PlayerX.prototype = {
	fire: function(){
		this.bulletMgr.addBullet(new Bomb(this.par.x, this.par.y, this.bulletMgr));
	}
}

function PlayerMissiles(par){
	this.par = par;
	this.bulletMgr = par.bulletMgr;
	
	this.reloadTime = 30;
	this.reloadLeft = 0;
}
PlayerMissiles.prototype = {
	
	update: function(){
		this.reloadLeft--;
		if(this.reloadLeft < 0){
			this.fire();
			this.reloadLeft = this.reloadTime;
		}
		
	},
	
	fire: function(){
		if(Player.missilePower > 1){
			this.bulletMgr.addBullet(new PMissile(this.par.x, this.par.y, -1, this.bulletMgr));
			this.bulletMgr.addBullet(new PMissile(this.par.x, this.par.y, 1, this.bulletMgr));
		}
		if(Player.missilePower > 2){
			this.bulletMgr.addBullet(new PMissile(this.par.x, this.par.y, 2, this.bulletMgr));
			this.bulletMgr.addBullet(new PMissile(this.par.x, this.par.y, -2, this.bulletMgr));
		}
	}
	
}

//////////////////
// ENENY WEAPONS//
//////////////////

function AllyTurretWeapon(par){
	this.par = par;
	this.bulletMgr = par.bulletMgr;
	
	this.reloadTime = 1;
	this.reloadLeft = 0;
}
AllyTurretWeapon.prototype = {
	
	update: function(){
		this.reloadLeft--;
		if(this.reloadLeft < 0){
			this.fire();
			this.reloadLeft = this.reloadTime;
		}
	},
	
	fire: function(){
		this.bulletMgr.addBullet(new BasicBullet(this.par.x, this.par.y-10, Math.random()*16-8, 5, 5,'red', this.bulletMgr));
	}
	
}