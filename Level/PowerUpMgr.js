
var maxPUs = 32;

var PowerUpMgr = {
	
	maxPUSpeed: 2,
	maxPUASpeed: Math.PI/50,
	
	PUs: [],
	freeIndicies: [],
	
	types: [],
	
	init: function(){
		for(var i = 0; i < maxPUs; i++){
			this.PUs[i] = null;
			this.freeIndicies.push(i);
		}
		this.types = [0,0,0,0];
	},
	
	update: function(){
		for(var i = 0; i < maxPUs; i++){
			if(this.PUs[i])
				this.PUs[i].update();
		}
	},
	
	draw: function(){
		for(var i = 0; i < maxPUs; i++){
			if(this.PUs[i])
				this.PUs[i].draw(g);
		}
	},
	
	spawnPU: function(x, y, type){
		if(this.freeIndicies.length == 0){
			console.log("TOO MANY PUs");
			return;
		}
		if(!type){
			var possibilities = [];
			if(Player.laserPower+this.types[0] < 4)
				possibilities.push(0);
			if(Player.powerPower+this.types[1] < 3)
				possibilities.push(1);
			if(Player.missilePower+this.types[2] < 3)
				possibilities.push(2);
			if(possibilities.length == 0)
				possibilities.push(3);
			type = Math.random()*possibilities.length | 0;
			type = possibilities[type];
		}
		this.types[type]++;
		
		if(x < Level.margin)
			x = Level.margin+1;
		else if(x > w-Level.margin)
			x = w-Level.margin-1;
		if(y < 0)
			y = 1;
		if(y > h)
			y = h-1;
		
		var pu = new PU(x,y,type);
		this.addPU(pu);
		return pu;
	},
	
	spawnYT: function(x, y, video){
		return this.addPU(new PU(x, y, video));
	},
	
	addPU: function(pu){
		var index = this.freeIndicies.shift();
		pu.pindex = index;
		this.PUs[index] = pu;
		return pu;
	},
	
	removePU: function(pu){
		this.types[pu.type]--;
		this.freeIndicies.push(pu.pindex);
		this.PUs[pu.pindex] = null;
	}
	
}

function PU(x, y, type){
	if(type.thumbnail){
		this.image = Resources.loadImage(type.thumbnail.sqDefault);
		type = 4;
	}
	this.type = type;

	switch(type){
		case 0:
			this.color = '#0aa';
			this.c = 'L';
			this.collectFunction = function(){
				Player.upgradeLaser();
			};
			break;
		case 1:
			this.color = '#f00';
			this.c = 'P';
			this.collectFunction = function(){
				Player.upgradePower();
			};
			break;
		case 2:
			this.color = '#0c0';
			this.c = 'M';
			this.collectFunction = function(){
				Player.upgradeMissile();
			};
			break;
		case 3:
			this.color = '#55b';
			this.c = '500';
			this.collectFunction = function(){
				Level.score += Level.multiplier*500;
				new Popup(this.x, this.y, '' + Level.multiplier*500);
			};
			break;
		case 4:
			this.collectFunction = function(){
				Level.multiplier++;
				new Popup(this.x, this.y, 'x' + Level.multiplier, 60);
			};
			break;
	}
	
	this.x = x;
	this.y = y;
	
	this.a = Math.random();
	this.av = Math.random()*PowerUpMgr.maxPUASpeed*2 - PowerUpMgr.maxPUASpeed;
	
	this.size = type == 4 ? 30 : 15;
	
	this.xv = Math.random()*PowerUpMgr.maxPUSpeed*2-PowerUpMgr.maxPUSpeed;
	this.yv = Math.random()*PowerUpMgr.maxPUSpeed*.5+PowerUpMgr.maxPUSpeed/2;
}
PU.prototype = {
	
	update: function(){
		this.x += this.xv;
		this.y += this.yv;
		this.a += this.av;
		
		if(this.a < 0){
			this.a += Math.PI*2;
		} else if(this.a > Math.PI*2){
			this.a -= Math.PI*2;
		}
		
		if(this.x-this.size < Level.margin){
			this.x = Level.margin+this.size;
			this.xv *= -1;
		} else if(this.x+this.size > w-Level.margin){
			this.x = w-Level.margin-this.size;
			this.xv *= -1;
		}
		if(this.y-this.size < 0){
			this.y = this.size;
			this.yv *= -1;
		} else if(this.y+this.size > h){
			this.y = h-this.size;
			this.yv *= -1;
		}
		
		if(Utils.circsCollide(this.x, this.y, this.size, Player.x, Player.y, Player.size)){
			this.collect();
		}
	},
	
	draw: function(g){
		g.save();
		g.translate(this.x, this.y);
		g.rotate(this.a);
		
		if(this.type == 4){
			g.scale(.6,.6);
			Utils.drawImageCentered(this.image, 0, 0, g);
		} else {
			g.fillStyle = this.color;
			g.fillRect(-this.size, -this.size, this.size*2, this.size*2);
			g.fillStyle = 'white';
			g.font = this.size + 'pt Impact';
			g.textBaseline = 'middle';
			g.textAlign = 'center';
			g.fillText(this.c, 0, 0);
		}
		
		g.restore();
		
		Utils.drawBounds(this);
	},
	
	collect: function(){
		this.collectFunction();
		PowerUpMgr.removePU(this);
	}
}

