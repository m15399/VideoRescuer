

function Ship(script,delay){
	
	this.size = 30,
	this.health = 8;
	this.scoreValue = 75;
	
	this.fires = false;
	this.x = 0;
	this.y = 0;
	
	this.r = 0;
	this.rv = 0;
	this.xv = 0;
	this.yv = 0;
	this.dead = false;
	
	this.speed = 5;
	
	this.bulletMgr = EnemyMgr.bulletMgr;
	this.weapon = new ShipWeapon(this);

	if(typeof script == 'function'){
		this.script = new Script(script, this);
	} else {
		this.script = new Script(this.scriptFromPoints(script), this);
	}
	if(delay)
		this.script.jumpBy(-delay);
	
	this.image = Resources.loadImage(imagesURL + 'Ship.png');
}
Ship.prototype = {
	update: function(){
		
		this.x += this.xv;
		this.y += this.yv;
		this.r += this.rv;
		//this.r = Utils.normalizeRadians(this.r);
		
		if(this.y > h + 100 + this.size)
			EnemyMgr.removeEnemy(this);
		this.weapon.update();
		
		this.script.update();

	},
	
	draw: function(g){
		g.save();
		g.translate(this.x|0, this.y|0);
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
		Level.score += Level.multiplier * this.scoreValue;
		Player.addPower(2);
		new Popup(this.x, this.y, '' + Level.multiplier * this.scoreValue);
		EnemyMgr.removeEnemy(this);
	},
	
	moveForward: function(){
		var v = Utils.moveAtAngle(0, 0, this.r+Math.PI/2, this.speed);
		this.xv = v.x;
		this.yv = v.y;
	},
	
	scriptFromPoints: function(pts){
		// return a script that moves from point to point
		// pts is formatted [x1, y1, x2, y2...];
		return function(s){
			
			var that = s.par;
			var destX = 0;
			var destY = 0;
			var i;
			
			for(i = 0; i < pts.length-2; i += 2){
				s.does(function(){
					that.x = pts[i];
					that.y = pts[i+1];
					destX = pts[i+2];
					destY = pts[i+3];
					s.sub(10000);
				});
				var w = Math.sqrt(Utils.square(pts[i+2]-pts[i])+Utils.square(pts[i+3]-pts[i+1]))/that.speed;
				s.wait(Math.ceil(w));
			}
			s.wait(1);
			s.does(function(){
				EnemyMgr.removeEnemy(that);
			});
			i = 0;
			
			// rotate toward next point, move towards it 
			s.time = 10000;
			
			s.does(function(){
				i+=2;
				var stop = Utils.vectorAngle({x: destX-that.x, y: destY-that.y})-Math.PI/2;
				var amount = stop - that.r;
				if(amount < -Math.PI)
					amount += 2*Math.PI;
				else if(amount > Math.PI)
					amount -= 2*Math.PI;
				if(amount == 0){
					that.moveForward();
					s.resume();
					s.ret();
					return;
				}
				
				that.rv = (amount < 0 ? -1 : 1) * .3;
				that.yv = 0;
				that.xv = 0;
				s.pause();
				var ch = s.addCheck(function(){
					if((that.rv > 0 && that.r >= stop) || (that.rv < 0 && that.r <= stop)){
						that.r = stop;
						that.rv = 0;
						that.moveForward();
						
						s.removeCheck(ch);
						s.resume();
						s.ret();
					}
				});
				
			});
			
			
		};
		
		
	},
	
	script1: function(script){
		
		var that = script.par;
		
		script.does(function(){
			that.x = 440;
			that.y = -200;
			that.moveForward();
		});
		script.wait(110);
		script.does(function(){
			amount = 1;
			script.sub(10000);
		});
		script.wait(1);
		script.does(function(){
			script.jumpBy(-30);
		});
		
		
		
		// rotate 
		script.time = 10000;
		
		var amount = 0;
		script.does(function(){
			var stop = that.r + amount;
			that.rv = (amount < 0 ? -1 : 1) * .3;
			that.yv = 0;
			that.xv = 0;
			script.pause();
			var ch = script.addCheck(function(){
				if((that.rv > 0 && that.r > stop) || (that.rv < 0 && that.r < stop)){
					that.r = stop;
					that.rv = 0;
					that.moveForward();
					
					script.removeCheck(ch);
					script.resume();
					script.ret();
				}
			});
			
		});
		
	}
	
}

function ShipWeapon(par){
	this.par = par;
	this.bulletMgr = par.bulletMgr;
	
	this.reloadTime = 90;
	this.bspeed = 5;
	
	this.script = new Script(this.script, this);
	this.script.jumpTo(Math.random()*this.reloadTime|0);
}
ShipWeapon.prototype = {
	
	script: function(script){
		var that = script.par;
		
		script.wait(that.reloadTime);
		script.does(function(){
			that.fire(0, that.bspeed);
			
			script.jumpTo(0);
		});
	},
	
	update: function(){
		this.script.update();
	},
	
	fire: function(xv, yv){
		if(this.par.fires && yv > 0)
			this.bulletMgr.addBullet(new BasicBullet(this.par.x, this.par.y, xv, yv, 5, 'yellow', this.bulletMgr));
	}
	
}