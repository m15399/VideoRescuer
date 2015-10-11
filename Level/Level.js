
var Level = {
	
	margin: 85,
	
	script: null,
	
	currentLevel: 1,
	
	score: 0,
	multiplier: 1,
	lives: 3,
	
	overlays: [],
	
	init: function(){
		this.currentLevel = 1;
		
		this.score = 0;
		this.multiplier = 1;
		this.lives = 3;
		
	},
	
	startLevel: function(n){
		this.currentLevel = n;
		unlockLevel(n);
		
		Background.init();
		
		EnemyMgr.init();
		
		PowerUpMgr.init();
		
		ExplosionMgr.init();
		
		Player.init();
		Player.autoFire = false;
		
		UI.init();
		
		this.script = new Script(Levels[n], this);
		this.overlays = [];
		this.addOverlay(Fade);
		Fade.fadeIn();
		
	},
	
	finishLevel: function(){
		Level.lives += 1;
		Fade.fadeOut(Level.loadNextLevel);
	},
	
	loadNextLevel: function(){
		Level.currentLevel++;
		if(Level.currentLevel > Levels.length)
			Level.currentLevel = 1;
		Level.startLevel(Level.currentLevel);
	},
	
	quitToTitle: function(){
		addHighScore(Level.score);
		saveUserData();
		
		Screen.menu = TitleMenu;
		TitleMenu.init();
	},
	
	continueGame: function(){
		addHighScore(this.score);
		saveUserData();
		
		this.score = 0;
		this.multiplier = 1;
		this.lives = 3;
	},
	
	addOverlay: function(o){
		this.overlays.push(o);
		return o;
	},
	
	removeOverlay: function(o){
		for(var i = 0; i < this.overlays.length; i++){
			if(o == this.overlays[i]){
				this.overlays.splice(i, 1);
				return;
			}
		}
	},
	
	update: function(){
        frameCount++;
        
		if(this.lives <= 0){
			paused = true;
			Screen.menu = GameOverMenu;
			GameOverMenu.init();
		}
		
		for(var i = 0; i < this.overlays.length; i++){
			this.overlays[i].update();
		}
		
		Player.update();
		
		EnemyMgr.update();
		
		PowerUpMgr.update();
		
		ExplosionMgr.update();
		
		this.checkCollisions();
		
		this.script.update();
		
		Background.update();
		UI.update();
		
	},
	
	draw: function(g){
		Background.draw(g);
		
		PowerUpMgr.draw(g);
		
		EnemyMgr.draw(g);
		
		ExplosionMgr.draw(g);
		
		Player.draw(g);
		
		UI.draw(g);
		
		for(var i = this.overlays.length-1; i >= 0; i--){
			this.overlays[i].draw(g);
		}
	},
	
	checkCollisions: function(){
		var bulletExplosionSize = 8;
		
		// PLAYER COLLISIONS
		// check Player vs Enemies
		if(!Player.invincible){
			for(var i = 0; i < maxEnemies; i++){
				var e = EnemyMgr.enemies[i];
				if(!e || e.invincible)
					continue;
				
				if((e.collidesWith && e.collidesWith(Player)) ||
				   (!e.collidesWith && Utils.square(Player.x-e.x) + Utils.square(Player.y-e.y) < Utils.square(Player.size+e.size))){
					Player.hit();
					e.hit(5);	
				}
			}
			
			// check Player vs Enemy Bullets
			for(var i = 0; i < EnemyMgr.bulletMgr.maxBullets; i++){
				var b = EnemyMgr.bulletMgr.bullets[i];
				if(!b)
					continue;
				
				if(Utils.square(Player.x-b.x) + Utils.square(Player.y-b.y) < Utils.square(Player.size+b.size)){
					Player.hit();
					b.hit();
					ExplosionMgr.explode(b.x, b.y, bulletExplosionSize+(Math.min(b.size, 25))*2);
				}
			}
		}		
		// ENEMY COLLISIONS
		// check Enemies vs Player Bullets
		for(var i = 0; i < maxEnemies; i++){
			var e = EnemyMgr.enemies[i];
			if(!e || e.invincible)
				continue;
			
			for(var j = 0; j < Player.bulletMgr.maxBullets; j++){
				var b = Player.bulletMgr.bullets[j];
				if(!b)
					continue;
				
				if((e.collidesWith && e.collidesWith(b)) ||
				   (!e.collidesWith && Utils.square(b.x-e.x) + Utils.square(b.y-e.y) < Utils.square(b.size+e.size))){
					// hit
					e.hit(b.dmg);
					b.hit();
					ExplosionMgr.explode(b.x, b.y, bulletExplosionSize+(Math.min(b.size, 25))*2);
				}
			}
		}		
	}
}
