
function Fighter(){
	this.size = 100,
	this.health = 4000;
	this.scoreValue = 15000;
	
	this.x = w/2;
	this.y = -300;
	
	this.xv = 0;
	this.dir = 0; // -1 facing left, 0 facing front, 1 facing right
	this.yv = 0;
	
	this.r = 0;
	this.rv = 0;
	
	this.dead = false;
	
	this.script = new Script(this.script, this);
	
	this.bulletMgr = EnemyMgr.bulletMgr;
	this.weapon = new FighterWeapon(this);
	
	this.image = Resources.loadImage(imagesURL + 'Fighter.png');
	this.imageSide = Resources.loadImage(imagesURL + 'FighterSide.png');
	this.imageSideFlipped = Resources.loadImage(imagesURL + 'FighterSideFlipped.png');
	
	Level.addOverlay(new HealthBar(this));
	
}
Fighter.prototype = {
	update: function(){
		this.script.update();
		
		this.x += this.xv;
		this.y += this.yv;
		
		this.r += this.rv;
		
		this.weapon.update();
	},
	
	draw : function(g){
		g.save();
		g.translate(this.x, this.y);
		g.rotate(this.r);
		
		var im;
		if(this.dir == -1){
			im = this.imageSideFlipped;
		} else if (this.dir == 0){
			im = this.image;
		} else {
			im = this.imageSide;
		}
		
		Utils.drawImageCentered(im, 0, 0, g);
		
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
		Level.score += this.scoreValue * Level.multiplier;
		Player.addPower(2000);
		new Popup(this.x, this.y, '' + this.scoreValue * Level.multiplier);
		EnemyMgr.removeEnemy(this);
	},
	
	collidesWith: function(e){
		var xs = 180;
		var ys = 43;
		if(e.y-e.size < this.y + ys && e.y+e.size > this.y-ys && e.x-e.size < this.x+xs && e.x+e.size > this.x-xs)
			return true;
		else
			return false;
	},
	
	script: function(s){
		var that = s.par;
		var wep = null;
		var time = 42;
		
		
		// fly in
		s.does(function(){
			that.x = w/2;
			that.y = -100;
			that.xv = 0;
			that.yv = 0;
			that.r = 0;
			that.rv = 0;
			that.dir = 0;
			that.weapon.stop();
			
			that.yv = 2;
		});
		s.wait(110);
		
		s.does(function(){
			that.yv = 0;
		});
		s.wait(20);
		
		s.does(function(){
			that.weapon.startPattern(1);
		});
		s.wait(200);
		s.does(function(){
			that.weapon.stop();
		})
		s.wait(20);
		
		s.does(function(){
			var p = Math.random() * 4 | 0;
			function maybeAddPU(enemy){
				if(p == i){
					enemy.onDeath = function(){
						PowerUpMgr.spawnPU(enemy.x, enemy.y);
					};
				}
				i++;
			}
			
			var i = 0;
			var e;
			var v;
			var a;
			a = Math.PI+.6;
			v = Utils.moveAtAngle(that.x, that.y+250, a+Math.PI/2, 300);
			e = EnemyMgr.addEnemy(new Interceptor(v.x, v.y, a+Math.PI+Math.random()*2-1));
			maybeAddPU(e);
			
			a = Math.PI-.6;
			v = Utils.moveAtAngle(that.x, that.y+250, a+Math.PI/2, 300);
			e = EnemyMgr.addEnemy(new Interceptor(v.x, v.y, a+Math.PI+Math.random()*2-1));
			maybeAddPU(e);
			
			a = Math.PI+.3;
			v = Utils.moveAtAngle(that.x, that.y+250, a+Math.PI/2, 300);
			e = EnemyMgr.addEnemy(new Interceptor(v.x, v.y, a+Math.PI+Math.random()*2-1));
			maybeAddPU(e);
			
			a = Math.PI-.3;
			v = Utils.moveAtAngle(that.x, that.y+250, a+Math.PI/2, 300);
			e = EnemyMgr.addEnemy(new Interceptor(v.x, v.y, a+Math.PI+Math.random()*2-1));
			maybeAddPU(e);
		});
		s.wait(100);
		
		s.does(function(){
			that.weapon.startPattern(2);
		});
		s.wait(200);
		s.does(function(){
			that.weapon.stop();
		})
		s.wait(30);
		
		// fly off to left
		s.does(function(){
			that.rv = -.01;
			s.pause();
			var ch = s.addCheck(function(){
				that.xv -= .3;
				if(that.x < -200){
					that.xv = 0;
					that.r = 0;
					that.rv = 0;
					s.removeCheck(ch);
					s.resume();
				}
				
			});
		});
		s.wait(100);
		
		var zoomSpeed = 20;
		var wait = 90;
		// zoom right
		s.does(function(){
			that.weapon.startPattern(3);
			that.x = -150;
			that.xv = zoomSpeed;
			that.dir = 1;
		});
		s.wait(wait);
		
		
		// zoom left
		s.does(function(){
			that.y = h-50;
			that.x = w+150;
			that.xv = -zoomSpeed;
			that.dir = -1;
		})
		s.wait((w/2+150)/zoomSpeed|0);
		
		s.does(function(){
			var p = Math.random() * 4 | 0;
			function maybeAddPU(enemy){
				if(p == i){
					enemy.onDeath = function(){
						PowerUpMgr.spawnPU(enemy.x, enemy.y);
					};
				}
				i++;
			}
			
			var i = 0;
			var e;
			var v;
			var a;
			a = Math.PI+.6;
			v = Utils.moveAtAngle(that.x, that.y+250, a+Math.PI/2, 300);
			log(v);
			e = EnemyMgr.addEnemy(new Interceptor(v.x, v.y, a+Math.random()*2-1));
			maybeAddPU(e);
			
			a = Math.PI-.6;
			v = Utils.moveAtAngle(that.x, that.y+250, a+Math.PI/2, 300);
			e = EnemyMgr.addEnemy(new Interceptor(v.x, v.y, a+Math.random()*2-1));
			maybeAddPU(e);
			
			a = Math.PI+.3;
			v = Utils.moveAtAngle(that.x, that.y+250, a+Math.PI/2, 300);
			e = EnemyMgr.addEnemy(new Interceptor(v.x, v.y, a+Math.random()*2-1));
			maybeAddPU(e);
			
			a = Math.PI-.3;
			v = Utils.moveAtAngle(that.x, that.y+250, a+Math.PI/2, 300);
			e = EnemyMgr.addEnemy(new Interceptor(v.x, v.y, a+Math.random()*2-1));
			maybeAddPU(e);
		});
		s.wait(wait);
		
		// repeat to beginning
		s.does(function(){
			s.jumpTo(0);
		});
		
	}
}
 
function FighterWeapon(par){
	this.par = par;
	
	this.a1 = new FighterArc(par, -100, 0, '#0af');
	this.a2 = new FighterArc(par, 100, 0, '#fa0');
	this.gun = new FighterGun(par);
	
}
FighterWeapon.prototype = {
	
	update: function(){
		this.a1.update();
		this.a2.update();
		this.gun.update();
	},
	
	startPattern: function(n){
		switch (n){
		case 1:
			this.a1.firing = true;
			this.a2.firing = true;
			this.a2.offv = .015;
			break;
		case 2:
			this.a1.firing = true;
			this.a2.firing = true;
			this.a1.offv = -.015;
			break;
		case 3:
			this.gun.firing = true;
		}
	},
	
	stop: function(){
		this.a1.reset();
		this.a2.reset();
		this.gun.firing = false;
	}
	
}



function FighterGun(par){
	this.par = par;
	this.bulletMgr = par.bulletMgr;
	
	this.firing = false;
	
	this.reloadTime = 1;
	this.reloadLeft = 0;
	
	this.bspeed = 9;
}
FighterGun.prototype = {
	
	update: function(){
		if(this.firing)
			this.reloadLeft--;
		if(this.reloadLeft < 0){
			this.reloadLeft = this.reloadTime;
			var v = Utils.vectorToPlayer(this.par.x, this.par.y);
			this.fire(v.x*this.bspeed, v.y*this.bspeed);
		}
	},
	
	fire: function(xv, yv){
		var variation = 1;
		xv += Math.random()*variation*2-variation;
		yv += Math.random()*variation*2-variation;
		this.bulletMgr.addBullet(new BasicBullet(this.par.x, this.par.y, xv, yv, 6, '#faa', this.bulletMgr));
		
	}
	
}

function FighterArc(par, xo, yo, color){
	this.par = par;
	this.bulletMgr = par.bulletMgr;
	
	this.xo = xo;
	this.yo = yo;
	
	this.color = color;
	
	this.reloadTime = 8;
	this.reset();	
	
}
FighterArc.prototype = {
	
	reset: function(){
		this.firing = false;
		this.off = 0;
		this.offv = 0;
		
		this.reloadLeft = 0;
	},
	
	update: function(){
		//this.script.update();
		if(this.firing){
			this.reloadLeft--;
			this.off += this.offv;
			if(this.off >= 1)
				this.off -= 1;
			else if(this.off < 0)
				this.off += 1;
		}
		if(this.reloadLeft < 0){
			Utils.bulletArc(this, 30, 150, 7, this.off);
			this.reloadLeft = this.reloadTime;
		}
	},
	
	fire: function(a, speed){
		speed = speed || 7;
		var v = Utils.moveAtAngle(0, 0, Utils.toRad(a), speed);
		this.bulletMgr.addBullet(new BasicBullet(this.par.x+this.xo, this.par.y+this.yo, v.x, v.y, 8, this.color, this.bulletMgr));
	}
	
}