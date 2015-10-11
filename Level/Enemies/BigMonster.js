
function BigMonster(x, y){
	this.size = 72,
	this.health = 75;
	this.scoreValue = 200;
	
	this.x = x;
	this.y = y;
	
	this.xv = .6;
	
	this.dead = false;
	
	this.script = new Script(this.script, this);
	
	this.bulletMgr = EnemyMgr.bulletMgr;
	this.weapon = new BigMonsterWeapon(this);
	
	this.image = Resources.loadImage(imagesURL + 'BigMonster.png');
	this.imageFlipped = Resources.loadImage(imagesURL + 'BigMonsterFlipped.png');
	
	this.video = Youtubes.nextVideo();
	this.ytImage = Resources.loadImage(this.video.thumbnail.sqDefault);
	this.ytOffset = {x: 5, y: -15};
	
}
BigMonster.prototype = {
	update: function(){
		this.script.update();
		
		this.x += this.xv;
		this.y += Background.speed;
		if(this.y > h + 100)
			EnemyMgr.removeEnemy(this);
		this.weapon.update();
	},
	
	draw : function(g){
		g.save();
		g.translate(this.x, this.y);
		
		g.save();
		g.translate((this.xv > 0 ? 1 : -1) * this.ytOffset.x, this.ytOffset.y);
		Utils.drawImageCentered(this.ytImage, 0, 0, g);
		g.restore();
		
		Utils.drawImageCentered((this.xv > 0 ? this.image : this.imageFlipped), 0, 0, g);
		
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
		new Popup(this.x, this.y, '' + Level.multiplier * this.scoreValue, 60);
		EnemyMgr.removeEnemy(this);
	},
	
	script: function(script){
		var that = script.par;
		var time = 85;
		
		script.wait(time/2|0);
		
		script.does(function(){
			that.xv *= -1;
		});
		script.wait(time);
		
		script.does(function(){
			that.xv *= -1;
		});
		script.wait(time);
		
		script.does(function(){
			script.jumpBy(-time*2);
		});
		
	}
}


function BigMonsterWeapon(par){
	this.par = par;
	this.bulletMgr = par.bulletMgr;
	
	this.reloadTime = 60;
	
	this.script = new Script(this.script, this);
}
BigMonsterWeapon.prototype = {
	
	script: function(script){
		
		script.does(function(){
			Utils.bulletArc(script.par, 45, 135, 7);	
		});
		
		script.wait(script.par.reloadTime/4|0);
		script.does(function(){
			Utils.bulletArc(script.par, 45, 135, 7, .5);
		});
		script.wait(script.par.reloadTime);
		script.does(function(){
			script.jumpTo(0);
		});
	},
	
	update: function(){
		this.script.update();
	},
	
	fire: function(a, speed){
		speed = speed || 5;
		var v = Utils.moveAtAngle(0, 0, Utils.toRad(a), speed);
		this.bulletMgr.addBullet(new BasicBullet(this.par.x, this.par.y, v.x, v.y, 6, '#0f0', this.bulletMgr));
	}
	
}