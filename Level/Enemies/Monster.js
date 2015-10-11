
function Monster(x, y){
	this.size = 42,
	this.health = 10;
	this.scoreValue = 75;
	
	this.x = x;
	this.y = y;
	
	this.dead = false;
		
	this.bulletMgr = EnemyMgr.bulletMgr;
	this.weapon = new MonsterLaser(this);

	var colors = ['Orange', 'Blue'];
	var color = Math.random()*colors.length|0;
	color = colors[color];
	
	this.flipped = (x > w/2 ? 'Flipped' : '');
	this.image = Resources.loadImage(imagesURL + 'Monster' + color + this.flipped + '.png');
	
}
Monster.prototype = {
	update: function(){
		this.y += 2;
		if(this.y > h + 100 + this.size)
			EnemyMgr.removeEnemy(this);
		this.weapon.update();
	},
	
	draw : function(g){
		Utils.drawImageCentered(this.image, this.x, this.y, g);
		
		g.save();
		
		g.fillStyle = 'black';
		var v, xo, yo;
		xo = (this.flipped ? 14 : -14);
		yo = -27;
		v = Utils.vectorToPlayer(this.x+xo, this.y+yo);
		Utils.fillCircle(this.x+xo+v.x*3, this.y+yo+v.y*3, 4);
		
		xo = (this.flipped ? -18 : 18);
		yo = -27;
		v = Utils.vectorToPlayer(this.x+xo, this.y+yo);
		Utils.fillCircle(this.x+xo+v.x*3, this.y+yo+v.y*3, 4);
		
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
	}
}



function MonsterLaser(par){
	this.par = par;
	this.bulletMgr = par.bulletMgr;
	
	this.reloadTime = 30;
	
	this.script = new Script(this.script, this);
}
MonsterLaser.prototype = {
	
	script: function(script){
		script.does(function(){
			script.par.fire(0,5);
		});
		script.wait(script.par.reloadTime);
		script.does(function(){
			script.par.fire(2,5);
		});
		script.wait(script.par.reloadTime);
		script.does(function(){
			script.par.fire(-2,5);
		});
		script.wait(script.par.reloadTime);
		script.does(function(){
			script.jumpTo(0);
		});
	},
	
	update: function(){
		this.script.update();
	},
	
	fire: function(xv, yv){
		this.bulletMgr.addBullet(new BasicBullet(this.par.x, this.par.y, xv, yv, 5, 'yellow', this.bulletMgr));
	}
	
}