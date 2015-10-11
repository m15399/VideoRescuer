
function Popup(x, y, text, dur){
	
	this.x = x;
	this.y = y;
	
	this.text = text;
	
	this.dur = dur || 30;
	
	this.alpha = 1;
	this.size = 1;
	
	Level.addOverlay(this);
}
Popup.prototype = {
	
	update: function(){
		this.alpha -= 1/this.dur;
		this.size = 1+1-this.alpha;
		if(this.alpha < 0)
			Level.removeOverlay(this);
	},
	
	
	draw: function(g){
		g.save();
		g.globalAlpha = this.alpha;
		g.textBaseline = 'middle';
		g.textAlign = 'center';
		g.font = this.size * 30 + 'pt Impact';
		
		g.strokeText(this.text, this.x, this.y);
		
		g.restore();
		
	}
	
}

var Fade = {
	
	alpha: 0,
	script: null,
	
	update: function(){
		if(this.script)
			this.script.update();
	},
	
	draw: function(g){
		g.save();
		
		g.globalAlpha = this.alpha;
		g.fillStyle = 'black';
		g.fillRect(0,0,w,h);
		
		g.restore();
	},
	
	fadeIn: function(){
		this.alpha = 1;
		this.script = new Script(function(script){
			var that = script.par;
			
			script.does(function(){
				script.addCheck(function(){
					that.alpha -= .02;
					if(that.alpha < 0){
						that.alpha = 0;
						that.script = null;
					}
				});
			});
			
		}, this);
	},
	
	fadeOut: function(callback){
		this.alpha = 0;
		this.script = new Script(function(script){
			var that = script.par;
			
			script.does(function(){
				script.addCheck(function(){
					that.alpha += .02;
					if(that.alpha > 1){
						that.alpha = 1;
						that.script = null;
						callback();
					}
				});
			});
			
		}, this);
	}
	
}

function Dialog(y, text, character, callback){
	
	this.w = w - 2 * Level.margin;
	this.h = 135;
	
	this.x = w - Level.margin;
	this.y = y - this.h/2 | 0;
	
	this.text = text;
	this.dispText = '';
	
	this.startTime = -1;
	this.duration = text.length * 2 + 40;
	
	character = character || 0;
	this.image = Resources.loadImage(imagesURL + (character == 0 ? 'Face' : 'Evil') + '.jpg');
	
	this.callback = callback || function(){};
	
	Level.addOverlay(this);
	
}
Dialog.prototype = {
	
	update: function(){
		var v = 10;
		
		if(this.startTime == -1){
			// fly on
			this.x -= v;

			if(this.x < Level.margin){
				// done flying on
				this.x = Level.margin;
				this.startTime = frameCount;
			}
			
		} else {
			// fully on screen
			
			// add characters every other frame until full text is displayed
			if(frameCount % 2 == 0 && this.dispText != this.text){
				this.dispText += this.text[this.dispText.length];
			}
			
			if(frameCount - this.startTime > this.duration){	
				// time to fly off
				this.x -= v;
				
				if(this.x < Level.margin-this.w){
					// off screen again
					this.callback();
					Level.removeOverlay(this);
				}
			}
		}
	},
	
	
	draw: function(g){
		g.save();
		g.rect(Level.margin, this.y, this.w, this.h);
		g.clip();
		
		g.translate(this.x, this.y);
		
		g.save();
		var gradient = g.createLinearGradient(0,0,0,this.h);
		gradient.addColorStop(0, '#777');
		gradient.addColorStop(1, '#555');
		g.fillStyle = gradient;
		g.fillRect(0, 0, this.w, this.h);
		
		g.restore();
		
		g.strokeStyle = '#222';
		g.lineWidth = 15;
		g.strokeRect(0,0,this.w,this.h);
				
		g.font = '14pt Arial';
		g.fillStyle = 'white';
		g.textBaseline = 'top';
		g.textAlign = 'left';
		
		var strings = this.dispText.split('\n');
		for(var i = 0; i < strings.length; i++){
			g.fillText(strings[i], 140, i*20+15);
		}
		
		g.drawImage(this.image, 5, 5);
		g.restore();
	}
	
}


function HealthBar(enemy){
	
	this.enemy = enemy;
	this.max = enemy.health;
	
}
HealthBar.prototype = {
	
	update: function(){
		if(this.enemy.dead){
			Level.removeOverlay(this);
		}
		
	},
	
	draw: function(g){
		
		var top = 10;
		var left = 10 + Level.margin;
		var width = w - 2 * left;
		var fillWidth = this.enemy.health / this.max * width;
		var height = 10;
		
		g.save();
		g.globalAlpha = .65;
		g.translate(left, top);
		
		g.fillStyle = 'red';
		g.fillRect(0, 0, fillWidth, height);
		
		g.strokeStyle = 'white';
		g.strokeRect(0, 0, width, height);
		
		g.restore();
		
	}
	
}