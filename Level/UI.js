
var UI = {
	
	size: Level.margin,
	
	init: function(){
		
	},
	
	update: function(){
		
	},
	
	draw: function(g){
		g.fillStyle = '#111';
		g.fillRect(0,0,this.size,h);
		g.fillRect(w-this.size,0,this.size,h);
		
		// power
		g.save();
		g.translate(18,h-50);
		g.fillStyle = 'f22';
		g.strokeStyle = '#777';
		
		var ddd = 2.5
		g.fillRect(0,0,Level.margin-40, -Player.power*ddd);
		g.strokeRect(0,0,Level.margin-40, -Player.maxPower*3*ddd);
		g.strokeStyle = 'white';
		g.strokeRect(0,0,Level.margin-40, -Player.maxPower*Player.powerPower*ddd);
		
		var x = -50*ddd;
		
		g.beginPath();
		g.moveTo(0,x);
		g.lineTo(Level.margin-40, x);
		g.stroke();
				
		g.font = '9pt Arial';
		g.textBaseline = 'bottom';
		g.textAlign = 'center';
		g.fillStyle = 'white';
		
		g.translate(-20, 0);
		g.fillText('BOMB', Level.margin/2, x);
		g.restore();
		
		// multiplier
		g.save();
		g.translate(0,-20);
		g.textBaseline = 'top';
		g.textAlign = 'center';
		g.strokeStyle = '#777';
		g.font = '36pt Impact';
		
		g.lineWidth = 1;
		g.strokeRect(2,60,81,62);
		g.lineWidth = 2;
		g.strokeText('x'+Level.multiplier, 40,60);
		g.restore();
		
		// lives
		g.save();
		g.textBaseline = 'top';
		g.textAlign = 'left';
		g.fillStyle = '#777';
		g.font = '18pt Impact';

		g.translate(0,120);
		g.save();
		g.scale(.5,.5);
		g.drawImage(Player.image, 15, 0);
		
		g.restore();
		g.fillText('x ' + Level.lives, 40, 0);
		
		g.restore();
		
		// controls
		g.save();
		g.textBaseline = 'top';
		g.textAlign = 'left';
		g.fillStyle = '#777';
		g.font = '14pt Impact';
		
		g.translate(2,0);
		g.fillText('P: PAUSE', 5,10);
		g.fillText('Z: LASER', 5,168);
		g.fillText('X: BOMB', 5,190);
		g.fillText('POWER', 12,h-35);
		g.fillText('SHIELD', w-Level.margin+14,h-35);
		
		g.restore();
		
		// shield
		g.save();
		g.translate(w-Level.margin+20,h-50);
		var gr = g.createLinearGradient(0,0,60,-200);
		gr.addColorStop(0,'#006');
		gr.addColorStop(1,'#55f');
		g.fillStyle = gr;
		g.strokeStyle = '#fff';
		g.fillRect(0,0,Level.margin-40, -Player.shield/Player.maxShield*200);
		g.strokeRect(0,0,Level.margin-40, -200);
		
		var x = -200/3;
		var y = -200*2/3;
		
		g.beginPath();
		g.moveTo(0,x);
		g.lineTo(Level.margin-40, x);
		g.stroke();
		g.beginPath();
		g.moveTo(0,y);
		g.lineTo(Level.margin-40, y);
		g.stroke();
		
		g.restore();
		
		// draw score
		g.save();
		g.translate(w-45, 350);
		g.rotate(-Math.PI/2);
		g.font = '50pt Impact';
		g.textBaseline = 'middle';
		g.textAlign = 'center';
		
		var text = '' + Level.score;
		var digits = 0;
		if(Level.score == 0)
			digits = 1;
		else {
			for(var i = Level.score; i > 0; i=i/10|0){
				digits++;
			}
		}
		for(var i = 0; i < 9-digits; i++){
			text = '0' + text;
		}
		//log(digits);
		//log(text);

		for(var i = 0; i < text.length; i++){
			g.fillStyle = (i >= text.length-digits ? '#777' : '#333');
			g.fillText(text[i], 40*i, 0);
		}
		
		g.restore();
	}
}