
function Mothership(){
	this.size = 200,
	this.health = 3000;
	this.scoreValue = 10000;
	
	this.x = w/2;
	this.y = -300;
	
	this.yv = 0;
	
	this.dead = false;
	
	this.script = new Script(this.script, this);
	
	this.bulletMgr = EnemyMgr.bulletMgr;
	
	this.weapons = [];
	this.weapons[0] = new MSCannon(125, 230, this);
	this.weapons[1] = new MSCannon(w-125, 230, this);
	this.weapons[2] = new MSCannon(200, 240, this);
	this.weapons[3] = new MSCannon(w-200, 240, this);
	
	this.gun = new MSGun(this);
	
	this.firing = -1;
	
	this.image = Resources.loadImage(imagesURL + 'Mothership.png');
	
	this.videos = [];
	this.ytImages = [];
	this.ytx = [];
	this.yty = [];
	
	for(var i = 0; i < 12; i++){
		this.videos[i] = Youtubes.nextVideo();
		this.ytImages[i] = Resources.loadImage(this.videos[i].thumbnail.sqDefault);
		this.ytx[i] = (i-1)*120;
		this.yty[i] = 0;
	}
		
	Level.addOverlay(new HealthBar(this));
	
}
Mothership.prototype = {
	update: function(){

		this.script.update();
		
		this.y += this.yv;
		
		if(this.firing == 1 || (this.firing == 0 && frameCount % 2 == 0)){
			for(var i = 0; i < this.weapons.length; i++){
				this.weapons[i].update();
			}
		}
		
		if(this.health < 1000)
			this.gun.update();
	},
	
	draw : function(g){
		g.save();
		g.translate(this.x, this.y);
		
		for(var i = 0; i < 3; i++){
			Utils.drawImageCentered(this.ytImages[i], this.ytx[i], this.yty[i], g);
		}
		
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
		Level.score += this.scoreValue * Level.multiplier;
		Player.addPower(2000);
		new Popup(this.x, this.y, '' + this.scoreValue * Level.multiplier);
		for(var i = 0; i < this.videos.length; i++)
			PowerUpMgr.spawnYT(this.x, this.y, this.videos[i]);
		EnemyMgr.removeEnemy(this);
	},
	
	staggerCannons: function(){
		
		for(var i = 0; i < this.weapons.length; i++){
			this.weapons[i].script.jumpTo(-5*i);
		}
		
	},
	
	syncCannons: function(){
		
		for(var i = 0; i < this.weapons.length; i++){
			this.weapons[i].script.jumpTo(0);
		}
		
	},
	
	collidesWith: function(e){
		if(e.y-e.size < this.y + 90)
			return true;
		else
			return false;
	},
	
	script: function(s){
		var that = s.par;
		var time = 42;
		
		var tt = 0;
		
		// fly in
		s.does(function(){
			
			that.yv = 2;
		});
		s.wait(230);
		
		s.does(function(){
			tt = s.time;
			that.syncCannons();
			that.firing = 1
			that.yv = 0;
		});
		s.wait(300);
		
		s.does(function(){
			that.firing = -1;
		});
		s.wait(50);
		
		s.does(function(){
			that.staggerCannons();
			that.firing = 0;
			
		});
		s.wait(120);
		
		for(var i = 0; i < 5; i++){
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
			
			
		}
		s.does(function(){
			that.firing = -1;
		});
		s.wait(140);
		// repeat to beginning
		s.does(function(){
			s.jumpTo(tt);
		});
		
	}
}


function MSGun(par){
	this.par = par;
	this.bulletMgr = par.bulletMgr;
	
	this.reloadTime = 50;
	this.bspeed = 7;
	
	this.script = new Script(this.script, this);
}
MSGun.prototype = {
	
	script: function(script){
		var that = script.par;
		var bcount = 0;
		
		script.does(function(){
			var v = Utils.vectorToPlayer(that.par.x, that.par.y);
			that.fire(v.x*that.bspeed, v.y*that.bspeed);
				
		});
		script.wait(2);
		
		script.does(function(){
			bcount++;
			if(bcount < 10)
				script.jumpTo(0);
		});
		
		
		script.wait(script.par.reloadTime);
		script.does(function(){
			bcount = 0;
			script.jumpTo(0);
		});
	},
	
	update: function(){
		this.script.update();
	},
	
	fire: function(xv, yv){
		this.bulletMgr.addBullet(new BasicBullet(this.par.x, this.par.y+79, xv, yv, 5, '#7f7', this.bulletMgr));
	}
	
}

function MSCannon(x, y, par){
	this.par = par;
	this.bulletMgr = par.bulletMgr;
	
	this.reloadTime = 20;
	this.x = x;
	this.y = y;
	
	this.bspeed = 5;
	
	this.script = new Script(this.script, this);
}
MSCannon.prototype = {
	
	script: function(s){
		
		var that = s.par;
		
		s.wait(that.reloadTime);
		s.does(function(){
			var v = Utils.vectorToPlayer(that.x, that.y);
			that.fire(v.x*that.bspeed, v.y*that.bspeed);
			
			s.jumpTo(0);
		});
		
	},
	
	update: function(){
		this.script.update();
	},
	
	fire: function(xv, yv){
		this.bulletMgr.addBullet(new BasicBullet(this.x, this.y, xv, yv, 15, '#c4f', this.bulletMgr));
	}
	
}