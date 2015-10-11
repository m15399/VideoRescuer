
function GiantMonster(){
	this.size = 140,
	this.health = 1300;
	this.scoreValue = 5000;
	
	this.x = w/2;
	this.y = -300;
	
	this.xv = 0;
	this.lastxv = 0;
	this.dir = 1;
	this.yv = 0;
	
	this.dead = false;
	
	this.script = new Script(this.script, this);
	
	this.bulletMgr = EnemyMgr.bulletMgr;
	this.weapon = new GiantMonsterWeapon(this);
	
	this.image = Resources.loadImage(imagesURL + 'GiantMonster.png');
	this.imageFlipped = Resources.loadImage(imagesURL + 'GiantMonsterFlipped.png');
	
	this.videos = [];
	this.ytImages = [];
	this.ytx = [];
	this.yty = [];
	this.ytr = [];
	
	for(var i = 0; i < 12; i++){
		this.videos[i] = Youtubes.nextVideo();
		this.ytImages[i] = Resources.loadImage(this.videos[i].thumbnail.sqDefault);
		this.ytx[i] = Math.random()*160 - 80;
		this.yty[i] = Math.random()*60;
		this.ytr[i] = Math.random()*Math.PI*2;
	}
	
	this.ytOffset = {x: 5, y: -1};
	
	Level.addOverlay(new HealthBar(this));
	
}
GiantMonster.prototype = {
	update: function(){
		this.lastxv = this.xv;
		this.script.update();
		
		if(this.lastxv >= 0 && this.xv < 0){
			this.dir = -1;
		} else if (this.lastxv <= 0 && this.xv > 0){
			this.dir = 1;
		}
		
		this.x += this.xv;
		this.y += this.yv;
		
		this.weapon.update();
	},
	
	draw : function(g){
		g.save();
		g.translate(this.x, this.y);
		
		g.save();
		g.rect(-this.size+35 + (this.dir == -1 ? -15 : 0), -this.size+15, this.size*2-60, this.size*2-100);
		g.closePath();
		g.clip();
		
		g.fillStyle = '#030';
		g.fillRect(-150,-150,300,220);
		
		for(var i = 0; i < this.videos.length; i++){
			g.save();
			g.translate(this.dir * this.ytOffset.x + this.ytx[i], this.ytOffset.y+this.yty[i]);
			g.rotate(this.ytr[i]);
			g.scale(.5,.5);
			Utils.drawImageCentered(this.ytImages[i], 0, 0, g);
			g.restore();
		}
		g.globalAlpha = .3;
		g.fillStyle = 'black';
		g.fillRect(-150,-150,300,220);
		g.restore();
		
		Utils.drawImageCentered((this.dir == 1 ? this.image : this.imageFlipped), 0, 0, g);
		
		
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
	
	script: function(s){
		var that = s.par;
		var wep = null;
		var time = 42;
		
		var tt = 0;
		
		// fly in
		s.does(function(){
			
			wep = that.weapon.script;
			that.yv = 2;
		});
		s.wait(250);
		
		// go left
		s.does(function(){
			tt = s.time;
			
			that.xv = -2;
			that.yv = 0;
		});
		s.wait(time);
		s.does(function(){
			that.xv = 0;
			that.dir = 1;
			wep.sub(1);
		});
		s.wait(130);
		
		// go right
		s.does(function(){
			that.xv = 2;
		});
		s.wait(time*2);
		s.does(function(){
			that.xv = 0;
		});
		s.wait(20);
		
		// go left
		s.does(function(){
			that.xv = -1;
			that.dir = -1;
			wep.sub(2);
		});
		s.wait(time*4);
		
		s.does(function(){
			that.xv = 0;
			that.dir = 1;
		})
		s.wait(80);
		
		s.does(function(){
			wep.sub(3);
		});
		s.wait(160);
		
		// go up
		s.does(function(){
			that.yv = -5;
		});
		s.wait(120);
		
		// randomize position and fly down
		s.does(function(){
			that.dir *= -1;
			that.y = -150;
			that.yv = 12;
			that.x = Math.random()*(w-Level.margin*2-that.size*2)+Level.margin+that.size;
		});
		s.wait(56);
		s.does(function(){
			that.yv = 0;
		});
		s.wait(30);
		
		// fly back up
		s.does(function(){
			that.dir *= -1;
			that.yv = -4;
		});
		s.wait(180);
		s.does(function(){
			that.yv = 5;
			that.x = w/2;
			that.y = -200;
			that.dir = -1;
		});
		s.wait(80);
		
		
		
		// repeat to beginning
		s.does(function(){
			s.jumpTo(tt);
		});
		
	}
}


function GiantMonsterWeapon(par){
	this.par = par;
	this.bulletMgr = par.bulletMgr;
	
	this.reloadTime = 11;
	
	this.script = new Script(this.script, this);
}
GiantMonsterWeapon.prototype = {
	
	script: function(s){
		
		s.wait(9000);
		s.does(function(){
			s.jumpTo(0);
		});
		
		
		// pattern 1
		s.time = 10000;
		
		for(var i = 0; i < 4; i++){
			s.does(function(){
				Utils.bulletArc(s.par, 45, 135, 9);
			});
			s.wait(s.par.reloadTime);
			s.does(function(){
				Utils.bulletArc(s.par, 45, 135, 9, .5);
			});
			s.wait(s.par.reloadTime);
		}
		s.does(function(){
			s.ret();
		});
		
		
		// pattern 2
		s.time = 20000;
		
		s.does(function(){
			var start = 160;
			var end = 20;
			var aDir = -1;
			var av = 11;
			var dur = 150;
	
			var angle = start;
			
			var ch = s.addCheck(function(){
				dur--;
				
				if(dur < 0){
					s.removeCheck(ch);
				} else if (s.time % 1 == 0){
					s.par.fire(angle);
					if(angle > start || angle < end){
						aDir *= -1;
						angle += aDir * av;
					}
					angle += aDir * av;
				}
				
			});
			s.ret();
		});
		
		
		// pattern 3
		s.time = 30000;
		
		s.does(function(){
			var start = 180;
			var end = 20;
			var dur = 200;
			
			var ch = s.addCheck(function(){
				dur--;
				if(dur < 0)
					s.removeCheck(ch);
				s.par.fire(Math.random()*(start-end)+end, 8.5);
			});
			s.ret();
		});
		
		
		
	},
	
	update: function(){
		this.script.update();
	},
	
	fire: function(a, speed){
		speed = speed || 7;
		var v = Utils.moveAtAngle(0, 0, Utils.toRad(a), speed);
		this.bulletMgr.addBullet(new BasicBullet(this.par.x, this.par.y, v.x, v.y, 6, '#0f0', this.bulletMgr));
	}
	
}