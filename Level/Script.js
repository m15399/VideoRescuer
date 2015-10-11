
function Script(script, par){
	this.par = par || null;
	this.init(script);
}
Script.prototype = {
	
	init: function(script){
		this.instructions = [];
		this.subTimes = [];
		
		this.currIndex = 0;
		this.paused = false;
		this.time = 1;
		
		this.checks = [];
		this.does = this.addInstruction;
		
		script(this);
		
		this.time = 0;
	},
	
	addInstruction: function(instruction){
		this.instructions.push({
			timeIndex: this.time,
			instruction: instruction
		});
	},
	
	do: null,
	
	addCheck: function(check){
		this.checks.push(check);
		return check;
	},
	
	removeCheck: function(check){
		for(var i = 0; i < this.checks.length; i++){
			if(this.checks[i] == check){
				this.checks.splice(i, 1);
				return;
			}
		}
	},
	
	wait: function(frames){
		this.time += frames;
	},
	
	pause: function(){
		this.paused = true;
	},
	
	resume: function(){
		this.paused = false;
	},
	
	jumpTo: function(t){
		this.time = t-1;
		while(true){
			if(this.currIndex == this.instructions.length){
				this.currIndex--;
			} else if(this.instructions[this.currIndex].timeIndex < this.time){
				this.currIndex++;
			} else if(this.currIndex <= 0) {
				this.currIndex = 0;
				break;
			} else if(this.instructions[this.currIndex-1].timeIndex > this.time){
				this.currIndex--;
			} else {
				break;
			}
		}
	},
	
	jumpBy: function(t){
		this.jumpTo(this.time+t);
	},
	
	sub: function(t){
		if(t < 10000)
			t *= 10000;
		this.subTimes.push(this.time+1);
		this.jumpTo(t-1);
	},
	
	ret: function(){
		this.jumpTo(this.subTimes.pop());
	},
	
	update: function(){
		
		for(var i = 0; i < this.checks.length; i++){
			this.checks[i]();
		}
		
		if(this.paused)
			return;
		
		var currInstruction = this.instructions[this.currIndex];
		if(!currInstruction)
			return;
		
		if(this.time == currInstruction.timeIndex){
			this.currIndex++;
			currInstruction.instruction();
		}
		
		this.time++;

	}
	
}