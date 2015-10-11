
var maxExplosions = 64;

var ExplosionMgr = {
	
	explosions: [],
	freeIndicies: [],
	
	init: function(){
		this.explosions = [];
		this.freeIndicies = [];
		
		for(var i = 0; i < maxExplosions; i++){
			this.explosions[i] = null;
			this.freeIndicies.push(i);
		}
		
	},
	
	update: function(){
		
		for(var i = 0; i < maxExplosions; i++){
			var e = this.explosions[i];
			if(!e)
				continue;
			
			e.update();
		}
		
		if(Math.max(this.maxLoggedParticles, this.numParticles()) > this.maxLoggedParticles){
			this.maxLoggedParticles = Math.max(this.maxLoggedParticles, this.numParticles());
			if(this.maxLoggedParticles > 128)
				log('max explosion particles = ' + this.maxLoggedParticles);
		}
		
	},
	maxLoggedParticles: 0,
	
	draw: function(g){
		for(var i = 0; i < maxExplosions; i++){
			var e = this.explosions[i];
			if(!e)
				continue;
			
			e.draw(g);
		}
		
	},
	
	addExplosion: function(e){
		if(this.freeIndicies.length == 0){
			console.log("TOO MANY EXPLOSIONS");
			return e;
		}
		var index = this.freeIndicies.shift();
		e.exindex = index;
		
		this.explosions[index] = e;
		return e;
		
	},
	
	removeExplosion: function(e){
		var index = e.exindex;
		this.freeIndicies.push(index);
		
		this.explosions[index] = null;
		return e;
		
	},
	
	explode: function(x, y, r){
		this.addExplosion(new Explosion(x, y, r));
	},
	
	numParticles: function(){
		var count = 0;
		for(var i = 0; i < maxExplosions; i++){
			var e = this.explosions[i];
			if(!e)
				continue;
			
			count += e.numParticles;
		}
		return count;
	}
	
}


function Explosion(x, y, size){
	
	this.x = x;
	this.y = y;
	
	this.size = size;
	
	this.px = []; // particle x
	this.py = []; // y
	this.pxv = [];
	this.pyv = [];
	this.ps = []; // size
	
	this.numParticles = size/4|0;
	
	for(var i = 0; i < this.numParticles; i++){
		this.px[i] = x;
		this.py[i] = y;

		this.ps[i] = Math.random()*size/2+size/2;
		
		var a = Math.random() * Math.PI*2;
		
		var minV = this.size/this.ps[i];
		var maxV = minV*2;
		var v = Utils.moveAtAngle(0, 0, a, Math.random()*(maxV-minV)+minV);
		
		this.pxv[i] = v.x;
		this.pyv[i] = v.y;
		
		
	}
	
	
}
Explosion.prototype = {
	
	update: function(){
		var count = 0;
		
		for(var i = 0; i < this.numParticles; i++){
			if(this.ps[i] < 1)
				continue;
			
			this.px[i] += this.pxv[i];
			this.py[i] += this.pyv[i];
			
			this.ps[i] -= 3;
			
			count++;
		}
		
		if(count == 0){
			ExplosionMgr.removeExplosion(this);
		}
		
	},
	
	draw: function(g){
		for(var i = 0; i < this.numParticles; i++){
			if(this.ps[i] < 1)
				continue;
			
			g.save();
			var minR = 255;
			var minG = 150;
			var r = (Math.random()*(255-minR)+minR)|0;
			var gr = (Math.random()*(255-minG)+minG)|0;
			
			g.fillStyle ='rgb('+ r + ', ' + gr + ','+ 0 +')';
			Utils.fillCircle(this.px[i], this.py[i], this.ps[i]);
			g.restore();
			
		}
		
	}
	
}