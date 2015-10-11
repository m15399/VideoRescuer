
var TitleMenu = {
	
	starfield: null,
	subMenu: null,
	
	selector: 0,
	
	init: function(){
		this.starfield = new Starfield(1, w);
		
		this.subMenu = null;
		
		this.selector = 0;
		
		paused = true;
		
		Screen.drawLevel = false;
	},
	
	update: function(){
		this.starfield.update();
		
		if(this.subMenu){
			this.subMenu.update();
		} else {
			
			if(Input.keys[38]){
				Input.keys[38] = false;
				this.moveUp();
			}
			if(Input.keys[40]){
				Input.keys[40] = false;
				this.moveDown();
			}
			
			if(Input.keys[13]){
				Input.keys[13] = false;
				this.select();
			}
			
		}
	},
	
	draw: function(g){
		this.starfield.draw(g);
		
		
		g.save();
		g.translate(0,50);
		
		var gr = g.createLinearGradient(0,150,0,450);
		gr.addColorStop(0,'rgba(50,50,50,.7)');
		gr.addColorStop(1,'rgba(50,50,50,0)');
		g.fillStyle = gr;
		g.fillRect(150,150,w-300,450);
		
		g.fillStyle = '#333';
		g.fillRect(0,100,w,80);
		g.fillStyle = 'white';
		g.font = '50 pt Impact';
		g.textAlign = 'center';
		g.textBaseline = 'top';
		g.fillText('VIDEO RESCUER', w/2, 98);
		
		g.translate(0,10);
		
		g.font = '30pt Arial';
		g.textAlign = 'center';
		
		g.fillStyle = (this.selector == 0 ? 'white' : 'rgba(255,255,255,.2)');
		g.fillText('Play', w/2, 200);
		
		g.fillStyle = (this.selector == 1 ? 'white' : 'rgba(255,255,255,.2)');
		g.fillText('About', w/2, 260);
		
		g.fillStyle = (this.selector == 2 ? 'white' : 'rgba(255,255,255,.2)');
		g.fillText('High Scores', w/2, 320);
		
		g.restore();
		
		g.fillStyle = 'rgba(255,255,255,.3)';
		g.font = '12pt Arial';
		g.textAlign = 'right';
		g.textBaseline = 'bottom';
		g.fillText('Mark Gardner, 2012', w-10, h-10);
		
		if(this.subMenu)
			this.subMenu.draw(g);
	},
	
	moveDown: function(){
		this.selector++;
		if(this.selector > 2)
			this.selector = 0;
	},
	
	moveUp: function(){
		this.selector--;
		if(this.selector < 0)
			this.selector = 2;
	},
	
	select: function(){
		if(this.selector == 0){
			this.subMenu = LSMenu;
			LSMenu.init();
		} else if(this.selector == 1){
			this.subMenu = AboutMenu;
			AboutMenu.init();
		} else if(this.selector ==2){
			this.subMenu = HSMenu;
			HSMenu.init();
		}
	},
	
	beginLevel: function(n){
		paused = false;
			
		Level.init();
		Level.startLevel(n);
		
		Screen.menu = null;
		Screen.drawLevel = true;
		
	}
}

var HSMenu = {
	
	xs: 250,
	ys: 200,
	
	left: 0,
	top: 0,
	
	init: function(){
		this.left = w/2-this.xs/2;
		this.top = 435;
		
	},
	
	update: function(){
		if(Input.keys[38]){
			Input.keys[38] = false;
			this.select();
		}
		if(Input.keys[40]){
			Input.keys[40] = false;
			this.select();
		}
		
		if(Input.keys[13]){
			Input.keys[13] = false;
			this.select();
		}
		
	},
	
	select: function(){
		TitleMenu.subMenu = null;
	},
	
	draw: function(g){
		g.save();
		g.translate(0+this.left, this.top);
		g.fillStyle = '#333';
		g.strokeStyle = 'white';
		
		g.fillRect(0, 0, this.xs, this.ys);
		g.strokeRect(0, 0, this.xs, this.ys);
		
		g.fillStyle = 'white';
		g.font = '20pt Arial';
		g.textAlign = 'left';
		g.textBaseline = 'top';
		
		for(var i = 0; i < 5; i++){
			g.fillText('' + (i+1) + '. ' + UserData.highScores[i], 30, 15+i*35);
		}
		
		g.restore();
	}
	
}

var AboutMenu = {
	
	xs: 400,
	ys: 270,
	
	left: 0,
	top: 0,
	
	init: function(){
		this.left = w/2-this.xs/2;
		this.top = h/2-this.ys/2;
		
	},
	
	update: function(){
		if(Input.keys[38]){
			Input.keys[38] = false;
			this.select();
		}
		if(Input.keys[40]){
			Input.keys[40] = false;
			this.select();
		}
		
		if(Input.keys[13]){
			Input.keys[13] = false;
			this.select();
		}
		
	},
	
	select: function(){
		TitleMenu.subMenu = null;
	},
	
	draw: function(g){
		g.save();
		g.translate(0+this.left, 185+this.top);
		g.fillStyle = '#333';
		g.strokeStyle = 'white';
		
		g.fillRect(0, 0, this.xs, this.ys);
		g.strokeRect(0, 0, this.xs, this.ys);
		
		g.fillStyle = 'white';
		g.font = '14pt Arial';
		g.textAlign = 'left';
		g.textBaseline = 'top';
		
		g.fillText('This was an entry in the U of A vs. ASU ', 10, 15);
		g.fillText('Google Coding Challenge ', 10, 40);
		g.fillText('It saves your high scores to your computer', 10, 75);
		g.fillText('and loads Youtube data in real time with', 10, 100);
		g.fillText('Google\'s Youtube API', 10, 125);
		g.fillText('Programmed in JavaScript, using HTML5\'s', 10, 160);
		g.fillText('Canvas element for graphics', 10, 185);
		g.font = '11pt Arial';
		g.fillText('All the images used are royalty free and do not require', 10, 220);
		g.fillText('attribution', 10, 238);
		
		g.restore();
	}
	
}

var LSMenu = {
	
	xs: 450,
	ys: 320,
	
	left: 0,
	top: 0,
	
	selector: 0,
	images: [],
	
	init: function(){
		this.left = w/2-this.xs/2;
		this.top = h/2-this.ys/2;
		this.selector = 0;
		
		this.images[0] = Resources.loadImage(imagesURL + 'lvl0.jpg');
		this.images[1] = Resources.loadImage(imagesURL + 'lvl1.jpg');
		this.images[2] = Resources.loadImage(imagesURL + 'lvl2.jpg');
		this.images[3] = Resources.loadImage(imagesURL + 'lvl3.jpg');
	},
	
	update: function(){
		if(Input.keys[38]){
			Input.keys[38] = false;
			TitleMenu.subMenu = null;
		}
		if(Input.keys[40]){
			Input.keys[40] = false;
			TitleMenu.subMenu = null;
		}
		
		if(Input.keys[39]){
			Input.keys[39] = false;
			this.moveRight();
		}
		if(Input.keys[37]){
			Input.keys[37] = false;
			this.moveLeft();
		}
		
		if(Input.keys[13]){
			Input.keys[13] = false;
			this.select();
		}
		
	},
	
	moveRight: function(){
		this.selector++;
		if(this.selector > 3)
			this.selector = 0;
	},
	
	moveLeft: function(){
		this.selector--;
		if(this.selector < 0)
			this.selector = 3;
	},
	
	select: function(){
		if(this.selector+1 > UserData.levelsUnlocked)
			return;
		TitleMenu.subMenu = null;
		TitleMenu.beginLevel(this.selector+1);
	},
	
	draw: function(g){
		g.save();
		g.translate(0+this.left, 150+this.top);
		g.fillStyle = '#333';
		g.strokeStyle = 'white';
		
		g.fillRect(0, 0, this.xs, this.ys);
		g.strokeRect(0, 0, this.xs, this.ys);
		
		g.fillStyle = '#111';
		for(var i = 0; i < (this.images.length); i++){
			g.fillRect(20+i*110, 20, 80, 230);
		}
		
		for(var i = 0; i < (Math.min(UserData.levelsUnlocked, this.images.length)); i++){
			g.drawImage(this.images[i], 10+i*110, 10);
		}
		
		g.lineWidth = 4;
		g.strokeRect(10+this.selector*110, 10, 100,250);
		
		g.fillStyle = 'white';
		g.font = '20pt Arial';
		g.textAlign = 'center';
		g.textBaseline = 'top';
		g.fillText('Select Level', this.xs/2, 275);
		
		g.restore();
	}
	
}


var PauseMenu = {
	
	selector: 0,
	
	init: function(){
		this.selector = 0;
	},
	
	update: function(){
		if(Input.keys[38]){
			Input.keys[38] = false;
			this.moveUp();
		}
		if(Input.keys[40]){
			Input.keys[40] = false;
			this.moveDown();
		}
		
		if(Input.keys[13]){
			Input.keys[13] = false;
			this.select();
		}
		
		if(Input.keys[80]){
			Input.keys[80] = false;
			this.unpause();
		}
	},
	
	unpause: function(){
		paused = false;
		Screen.menu = null;
	},
	
	moveUp: function(){
		this.selector--;
		if(this.selector < 0)
			this.selector = 1;
	},
	
	moveDown: function(){
		this.moveUp();
	},
	
	select: function(){
		if(this.selector == 0){
			this.unpause();
		} else {
			Level.quitToTitle();
		}
	},
	
	draw: function(g){
		g.save();
		g.translate(w/2, 200);
		
		var width = 300;
		
		g.fillStyle = '#333';
		g.fillRect(-width/2,0,width,80);
		g.fillStyle = 'rgba(0,0,0,.5)';
		g.fillRect(-width/2,80,width,135);
		g.strokeStyle = 'white';
		g.strokeRect(-width/2, 0, width, 215);
		g.fillStyle = 'white';
		g.font = '50 pt Impact';
		g.textAlign = 'center';
		g.textBaseline = 'top';
		g.fillText('PAUSED', 0,0);
		
		g.font = '30pt Arial';
		
		g.fillStyle = (this.selector == 0 ? 'white' : 'rgba(255,255,255,.2)');
		g.fillText('Resume', 0, 90);
		
		g.fillStyle = (this.selector == 1 ? 'white' : 'rgba(255,255,255,.2)');
		g.fillText('Quit to Title', 0, 150);
		
		g.restore();
	}
}


var GameOverMenu = {
	
	selector: 0,
	
	init: function(){
		this.selector = 0;
	},
	
	update: function(){
		if(Input.keys[38]){
				Input.keys[38] = false;
				this.moveUp();
			}
			if(Input.keys[40]){
				Input.keys[40] = false;
				this.moveDown();
			}
			
			if(Input.keys[13]){
				Input.keys[13] = false;
				this.select();
			}
			
	},
	
	continueGame: function(){
		paused = false;
		Screen.menu = null;
		Level.continueGame();
	},
	
	moveUp: function(){
		this.selector--;
		if(this.selector < 0)
			this.selector = 1;
	},
	
	moveDown: function(){
		this.moveUp();
	},
	
	select: function(){
		if(this.selector == 0){
			this.continueGame();
		} else {
			Level.quitToTitle();
		}
	},
	
	draw: function(g){
		g.save();
		g.translate(w/2, 200);
		
		var width = 350;
		
		g.fillStyle = '#333';
		g.fillRect(-width/2,0,width,80);
		g.fillStyle = 'rgba(0,0,0,.5)';
		g.fillRect(-width/2,80,width,135);
		g.strokeStyle = 'white';
		g.strokeRect(-width/2, 0, width, 215);
		g.fillStyle = 'white';
		g.font = '50 pt Impact';
		g.textAlign = 'center';
		g.textBaseline = 'top';
		g.fillText('GAME OVER', 0,0);
		
		g.font = '30pt Arial';
		
		g.fillStyle = (this.selector == 0 ? 'white' : 'rgba(255,255,255,.2)');
		g.fillText('Continue', 0, 90);
		
		g.fillStyle = (this.selector == 1 ? 'white' : 'rgba(255,255,255,.2)');
		g.fillText('Quit to Title', 0, 150);
		
		g.restore();
	}
}