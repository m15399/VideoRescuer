
var Background = {
	
	speed: 1,
	targetSpeed: 1,
	objects: [],
	
	speedChange: .02,
	
	init: function(){
		this.speed = 1;
		this.targetSpeed = 1;
		this.objects = [];
				
	},
	
	add: function(o){
		this.objects.push(o);
	},
	
	setSpeed: function(speed){
		this.targetSpeed = speed;
	},
	
	update: function(){
		if(this.speed != this.targetSpeed){
			if(this.speed < this.targetSpeed - this.speedChange){
				this.speed += this.speedChange;
			} else if (this.speed > this.targetSpeed + this.speedChange){
				this.speed -= this.speedChange;
			} else {
				this.speed = this.targetSpeed;
			}
		}
		for(var i = 0; i < this.objects.length; i++){
			this.objects[i].update();
		}
	},
	
	draw: function(g){
		for(var i = 0; i < this.objects.length; i++){
			this.objects[i].draw(g);
		}		
	}
	
}

var stars = 64;
function Starfield(speed, width){
	this.w = width || w-2*Level.margin;
	
	this.x = [];
	this.y = [];
	this.z = [];
	
	speed = speed || 1;
	this.speed = 7*speed;
	
	for(var i = 0; i < stars; i++){
		this.newStar(i);
		this.y[i] = Math.random() * (h+5);
	}
}
Starfield.prototype = {
	
	update: function(){
		for(var i = 0; i < stars; i++){
			this.y[i] += Background.speed*this.speed/this.z[i];
			if(this.y[i] > h + 5)
				this.newStar(i);
		}
	},
	
	draw: function(g){
		g.fillStyle = 'white';
		for(var i = 0; i < stars; i++){
			Utils.fillCircle(this.x[i], this.y[i], 30/this.z[i]);
		}
	},
	
	newStar: function(index){
		this.x[index] = Math.random() * (this.w) + (w-this.w)/2;
		this.y[index] = -5;
		this.z[index] = Math.random() * 80 + 15;
	}
	
}

function BGImage(path, scrollSpeed){
	this.x = Level.margin;
	this.y = h;
	
	this.image = Resources.loadImage(path);
	
	this.w = this.image.width;
	this.h = this.image.height;
	
	this.speed = scrollSpeed;
	
}
BGImage.prototype = {
	
	update: function(){
		this.y += Background.speed*this.speed;
		if(this.y > this.h){
			this.y -= this.h;
		}
		
	},
	
	draw: function(g){
		g.drawImage(this.image, this.x, Math.round(this.y));
		if(this.y > 0){
			g.drawImage(this.image, this.x, Math.round(this.y-this.h));
		}
	}
	
}

function Earth(y, scrollSpeed){
	
	this.x = w/2;
	this.dx = 0;
	this.y = y;
	
	this.visible = true;
	this.exploding = false;
	this.startedExploding = 0;
	this.image = Resources.loadImage(imagesURL + 'Earth.png');
	
	//this.w = this.image.width;
	//this.h = this.image.height;
	
	this.speed = scrollSpeed;

}
Earth.prototype = {
	
	update: function(){
		if(this.exploding){
			
			var maxDiff = 15;
			var time = 80;
			
			var dt = frameCount - this.startedExploding;
			var diff = maxDiff * dt/time;
			
			if(frameCount % 2 == 0){
				this.dx = -diff;
			} else {
				this.dx = diff;
			}
			
			if(dt > time){
				this.exploding = false;
				
				// fix this explosion
				var i = 0; 
				while(i < 20){
					ExplosionMgr.explode(Math.random()*480+85, h-Math.random()*100-10, 50);
					i++;
				}
				
				this.visible = false;
			}
		}
		
		this.y += this.speed * Background.speed;
		
	},
	
	draw: function(g){
		if(!this.visible)
			return;
		Utils.drawImageCentered(this.image, this.x + this.dx, this.y);
		
	},
	
	explode: function(){
		
		this.exploding = true;
		this.startedExploding = frameCount;
		
	}
	
}