

function Sentry(x, y, delay){
	this.size = 38,
	this.health = 16;
	this.scoreValue = 125;
	
	this.x = x;
	this.y = -60;
	this.destY = y;
	
	this.r = Utils.vectorAngle(Utils.vectorToPlayer(x, y))-Math.PI/2;
	this.rv = .02;
	this.dead = false;
		
	this.delay = delay || 0;
	this.script = new Script(this.script, this);
	
	this.bulletMgr = EnemyMgr.bulletMgr;
	this.weapon = new SentryWeapon(this);

	this.image = Resources.loadImage(imagesURL + 'Sentry.png');
	this.imageFlipped = Resources.loadImage(imagesURL + 'SentryFlipped.png');
	
}
Sentry.prototype = {
	update: function(){
		this.script.update();
		
		//this.y += Background.speed;
		
		this.r = Utils.normalizeRadians(this.r);
		
		var da = Utils.normalizeRadians(Utils.vectorAngle(Utils.vectorToPlayer(this.x, this.y))-Math.PI/2-this.r);
		if(da < -this.rv){
			this.r -= this.rv;
		} else if(da > this.rv){
			this.r += this.rv;
		} else {
			this.r += da;
		}
		
		if(this.y > h + 100 + this.size)
			EnemyMgr.removeEnemy(this);
		this.weapon.update();
		
	},
	
	draw: function(g){
		g.save();
		g.translate(this.x|0, this.y|0);
		g.rotate(this.r);
		Utils.drawImageCentered((this.r > 0 ? this.image : this.imageFlipped), 0, 0, g);
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
	
	script: function(script){
		var that = script.par;
		var speed = 2;
		
		script.wait(that.delay);
		script.does(function(){
			script.pause();
			var ch = script.addCheck(function(){
				that.y += 2;
				if(that.y >= that.destY){
					script.removeCheck(ch);
					script.resume();
				}
			});
		});
		script.wait(250);
		script.does(function(){
			var ch = script.addCheck(function(){
				that.x += (that.x < w/2 ? -1 : 1) * 2;
				if(Math.abs(that.x-w/2) > w/2+100){
					script.removeCheck(ch);
					EnemyMgr.removeEnemy(this);
				}
			});
		});
	}
}

function SentryWeapon(par){
	this.par = par;
	this.bulletMgr = par.bulletMgr;
	
	this.reloadTime = 90;
	this.bspeed = 5;
	
	this.image = Resources.loadImage(imagesURL + 'SentryBullet.png');
	
	this.script = new Script(this.script, this);
	this.script.jumpTo(Math.random()*this.reloadTime|0);
}
SentryWeapon.prototype = {
	
	script: function(script){
		var that = script.par;
		
		script.wait(that.reloadTime);
		script.does(function(){
			var v = Utils.moveAtAngle(0, 0, that.par.r+Math.PI/2, that.bspeed);
			that.fire(v.x, v.y);
			
			script.jumpTo(0);
		});
	},
	
	update: function(){
		this.script.update();
	},
	
	fire: function(xv, yv){
		var v = Utils.moveAtAngle(this.par.x, this.par.y, this.par.r+Math.PI/2, this.par.size+20);
		this.bulletMgr.addBullet(new ImageBullet(v.x, v.y, xv, yv, 17, this.image, this.bulletMgr));
	}
	
}