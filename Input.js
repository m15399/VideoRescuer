
var Input = {
	keys: [],
	
	init: function(){
		for(var i = 0; i < 222; i++){
			this.keys[i] = false;
		}
	},
	
	keyDown: function(e){
		Input.keys[e.keyCode] = true;
	},
	
	keyUp: function(e){
		Input.keys[e.keyCode] = false;
	}
}

addEventListener('keydown',Input.keyDown, false);
addEventListener('keyup',Input.keyUp,false);