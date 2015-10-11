

var Utils = {
	
	// MATH
	
	toRad: function(deg){
		return deg / 360 * 2 * Math.PI;
		
	},
	
	normalizeRadians: function(r){
		if(r < -Math.PI)
			r += 2*Math.PI;
		else if(r > Math.PI)
			r -= 2*Math.PI;
		return r;
	},
	
	vectorAngle: function(v){
		return Math.atan2(v.y,v.x); 
	},
	
	square: function(x){
		return x*x;
	},
	
	moveAtAngle: function(x, y, a, d){
		return {
			x: x+Math.cos(a)*d,
			y: y+Math.sin(a)*d
		};
	},
	
	circsCollide: function(x, y, r, x2, y2, r2){
		return (Utils.square(x2-x) + Utils.square(y2-y) < Utils.square(r2+r));
	},
	
	// GRAPHICS
	
	fillCircle: function(x, y, r){
		
		ctx.save();
		if(r < 1){
			ctx.globalAlpha = r;
			r = Math.ceil(r);
		}
		
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();
		
		ctx.restore();
	},
	
	drawCircle: function(x, y, r){
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2*Math.PI);
		ctx.closePath();
		ctx.stroke();
	},
	
	drawBounds: function(obj){
		if(debug){
			g.strokeStyle = 'white';
			Utils.drawCircle(obj.x, obj.y, obj.size);
		}
	},
	
	drawImageCentered: function(image, x, y, ctx){
		ctx = ctx || g;
		ctx.drawImage(image, (x-image.width/2) | 0, (y-image.height/2) | 0);
	},
	
	
	// GAME SPECIFIC
	
	vectorToPlayer: function(x, y){
		var xd = Player.x - x;
		var yd = Player.y - y;
		var d = Math.sqrt(xd*xd + yd*yd);
		return {x: xd/d, y: yd/d};
	},
	
	fastForward: function(obj, t){
		for(var i = 0; i < t; i++){
			obj.update();
		}
	},
	
	bulletArc: function(that, start, end, num, offs, speed){
		offs = offs || 0;
		var dif = (end - start)/(num-1);

		for(var i = start+offs*dif; i <= end; i += dif){
			if(speed)
				that.fire(i, speed);
			else
				that.fire(i);
		}
		
	}
}