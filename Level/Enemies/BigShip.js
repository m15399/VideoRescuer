
function BigShip(x, y){
	this.size = 80;
	this.health = 75;
	this.scoreValue = 200;
	
	this.x = x;
	this.y = y;
		
	this.dead = false;
		
	this.bulletMgr = EnemyMgr.bulletMgr;
	this.weapon = new BigShipWeapon(this);
	
	this.image = Resources.loadImage(imagesURL + 'BigShip.png');
	
	this.video = Youtubes.nextVideo();
	this.ytImage = Resources.loadImage(this.video.thumbnail.sqDefault);
	this.ytOffset = {x: 0, y: 0};
	
}
BigShip.prototype = {
	update: function(){
		
		this.y += 1;
		if(this.y > h + 100 + this.size)
			EnemyMgr.removeEnemy(this);
		this.weapon.update();
	},
	
	draw : function(g){
		g.save();
		g.translate(this.x, this.y);
		
		g.save();
		g.rotate(Math.PI/2)
		g.translate(this.ytOffset.x, this.ytOffset.y);
		Utils.drawImageCentered(this.ytImage, 0, 0, g);
		g.restore();
		
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
		Level.score += Level.multiplier * this.scoreValue;
		Player.addPower(2);
		new Popup(this.x, this.y, '' + Level.multiplier * this.scoreValue, 60);
		EnemyMgr.removeEnemy(this);
	},
	
}


function BigShipWeapon(par){
	this.par = par;
	this.bulletMgr = par.bulletMgr;
	
	this.reloadTime = 30;
	
	this.script = new Script(this.script, this);
}
BigShipWeapon.prototype = {
	
	script: function(script){
		var that = script.par;
		var bcount = 0;
		
		script.does(function(){
			that.fire();	
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
	
	fire: function(){
		this.bulletMgr.addBullet(new BasicBullet(this.par.x-82, this.par.y-10, 0, 7, 5, '#fc0', this.bulletMgr));
		this.bulletMgr.addBullet(new BasicBullet(this.par.x+82, this.par.y-10, 0, 7, 5, '#fc0', this.bulletMgr));
	}
	
}