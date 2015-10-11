
var Screen = {
	
	menu: null, // the current menu
	
	drawLevel: false,
	
	init: function(){
		this.menu = TitleMenu;
		TitleMenu.init();
		paused = true;
	},
	
	update: function(){
		// pause controls
		if(!paused && Input.keys[80]){
			Input.keys[80] = false;
			paused = true;
			this.menu = PauseMenu;
			PauseMenu.init();
		}
		
		if(!paused)
			Level.update();
		if(this.menu)
			this.menu.update();
	},
	
	draw: function(g){
		if(this.drawLevel)
			Level.draw(g);
		if(this.menu)
			this.menu.draw(g);
	}
	
}