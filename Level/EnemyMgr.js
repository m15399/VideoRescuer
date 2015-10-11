
var maxEnemies = 64;

var EnemyMgr = {
	
	enemies: [],
	freeIndicies: [],
	enemyCount: 0,
	
	bulletMgr: null,
	
	init: function(){
		this.bulletMgr = new BulletMgr(128);
		
		
		this.resetIndicies();
		
	},
	
	update: function(){
		
		for(var i = 0; i < maxEnemies; i++){
			var enemy = this.enemies[i];
			if(!enemy)
				continue;
			
			enemy.update();
		}
		
		this.bulletMgr.update();
	},
	
	draw: function(g){
		
		for(var i = 0; i < maxEnemies; i++){
			var enemy = this.enemies[i];
			if(!enemy)
				continue;
			
			enemy.draw(g);
		}
		
		this.bulletMgr.draw(g);
	},
	
	resetIndicies: function(){
		this.enemies = [];
		this.freeIndicies = []
		this.enemyCount = 0;
		
		for(var i = 0; i < maxEnemies; i++){
			this.enemies[i] = null;
			this.freeIndicies.push(i);
		}
	},
	
	addEnemy: function(enemy){
		if(this.freeIndicies.length == 0){
			log('TOO MANY ENEMIES');
			return enemy;
		}
		this.enemyCount++;
		
		var index = this.freeIndicies.shift();
		enemy.bindex = index;
		
		this.enemies[index] = enemy;
		return enemy;
	},
	
	removeEnemy: function(enemy){
		this.enemyCount--;
		
		if(enemy.wave){
			// if enemy was removed by going off screen,
			// invalidate the wave so no PU is given
			if(enemy.y > h){
				enemy.wave.invalidate();
			} else {
				enemy.wave.remove(enemy);
			}
		}
		
		if(enemy.onDeath){
			enemy.onDeath();
		}
		
		if(enemy.y < h){
			if(enemy.video){
				PowerUpMgr.spawnPU(enemy.x, enemy.y);
				PowerUpMgr.spawnYT(enemy.x, enemy.y, enemy.video);
			}
			ExplosionMgr.explode(enemy.x, enemy.y, enemy.size+8);
		}
		
		var index = enemy.bindex;
		this.freeIndicies.push(index);
		
		this.enemies[index] = null;
		return enemy;
	}
	
	
	
}