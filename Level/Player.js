
var Player = {
	
	x: 0,
	y: 0,

	speed: 5,	
	size: 10,
	
	power: 0,
	powerTarget: 0,
	maxPower: 50,
	lastPowerUse: 1000,
	
	shield: 0,
	shieldTarget: 0,
	maxShield: 60,
	rechargeTime: 120,
	lastHit: 0,
	invincible: true,
	invincibleTimer: 90,
	
	
	laserPower: 1,
	missilePower: 1,
	powerPower: 1,
	
	bulletMgr: null,
	weapon: null,
	zWeapon: null,
	xWeapon: null,
	autoFire: false,
	
	sound: null,
	
	image: null,
	
	
	init: function(){
		this.x = w/2;
		this.y = h-this.size*4;
		
		this.laserPower = 1;
		this.missilePower = 1;
		this.powerPower = 1;
		
		this.power = 0;
		this.powerTarget = this.maxPower*this.powerPower/2 | 0;
		this.shield = 0;
		this.shieldTarget = this.maxShield;
		this.lastPowerUse = 1000;
		
		this.invincible = true;
		this.invincibleTimer = 90;
		
		
		this.bulletMgr = new BulletMgr(512);
		this.weapon = new PlayerLaser(this);
		this.zWeapon = new PlayerZ(this);
		this.xWeapon = new PlayerX(this);
		this.missiles = new PlayerMissiles(this);
		
		this.image = Resources.loadImage(imagesURL + 'Player.png');
		
		//this.sound = Resources.loadSound(soundURL + 'Laser.wav');
		//this.sound.volume = .2;
	},
	
	update: function(){
		// movement
		if(Input.keys[37]){
			this.x -= this.speed;
			if(this.x-this.size < Level.margin)
				this.x = Level.margin+this.size;
		}
		if(Input.keys[39]){
			this.x += this.speed;
			if(this.x+this.size > w-Level.margin)
				this.x = w-Level.margin-this.size;
		}
		if(Input.keys[38]){
			this.y -= this.speed;
			if(this.y-this.size < 0)
				this.y = this.size;
		}
		if(Input.keys[40]){
			this.y += this.speed;
			if(this.y+this.size > h)
				this.y = h-this.size;
		}
	
		// weapons
		var bombPower = 50;
		if(!Input.keys[90])
			this.lastPowerUse = 10000;
			
		if(Input.keys[88] && this.powerTarget >= bombPower){
			Input.keys[88] = false;
			this.xWeapon.fire();
			this.powerTarget -= bombPower;
			
		} else if((Input.keys[90] || this.lastPowerUse < 10) && this.power >= 1){
			if(this.lastPowerUse > this.maxPower*this.powerPower)
				this.lastPowerUse = 0;
			this.lastPowerUse++;
			this.powerTarget--;
			this.zWeapon.fire();
			this.weapon.fire(this.laserPower);
			
		} else if(Input.keys[32] || this.autoFire){
			this.lastPowerUse = 1000;
			if(Input.keys[32])
				this.autoFire = false;
			this.weapon.fire(this.laserPower);
		} else {
			this.lastPowerUse = 1000;
		}
		if(Input.keys[65]){ // toggle auto-fire
			Input.keys[65] = false;
			this.autoFire = !this.autoFire;
		}
		
		// power
		var d = 2;
		if(this.powerTarget > this.power+d){
			this.power += d;
		} else if(this.powerTarget < this.power-d){
			this.power -= d;
		} else {
			this.power = this.powerTarget;
		}
		// shield
		if(this.shieldTarget > this.shield){
			this.shield += 1;
		} else if(this.shieldTarget < this.shield){
			this.shield -= 2;
		}
		if(frameCount - this.lastHit > this.rechargeTime)
			this.shieldTarget = this.maxShield;

		if(this.invincible){
			this.invincibleTimer--;
			if(this.invincibleTimer < 0)
				this.invincible = false;
		}
				
		this.weapon.update();
		this.missiles.update();
		
		this.bulletMgr.update();
		
	},
	
	addPower: function(p){
		this.powerTarget += p;//*this.powerPower;
		if(this.powerTarget > this.maxPower*this.powerPower)
			this.powerTarget = this.maxPower*this.powerPower;
	},
	
	upgradeLaser: function(){
		this.laserPower++;
		this.laserPower = Math.min(this.laserPower, 4);
	},
	
	upgradeMissile: function(){
		this.missilePower++;
		this.missilePower = Math.min(this.missilePower, 3);
	},
	
	upgradePower: function(){
		this.powerPower++;
		this.powerPower = Math.min(this.powerPower, 3);
		this.addPower(this.maxPower/this.powerPower);
	},
	
	draw: function(g){

		this.bulletMgr.draw(g);

		if(this.invincible && frameCount % 18 < 6){
			
		} else {
			Utils.drawImageCentered(this.image, this.x, this.y, g);
			
			Utils.drawBounds(this);
		}
			
	},
	
	hit: function(){
		this.color = '#05f';
		if(!this.invincible)
			this.shieldTarget -= this.maxShield/3;
		this.shield = this.shieldTarget;
		this.lastHit = frameCount;
		if(this.shieldTarget < 0)
			this.kill();
	},
	
	kill: function(){
		Level.lives--;
		
		var pus = this.laserPower + this.powerPower + this.missilePower - 3;
		pus = Math.ceil(pus/2);
		var x = this.x;
		var y = this.y;
		
		ExplosionMgr.explode(this.x, this.y, this.size*4);
		this.init();
		for(var i = 0; i < pus; i++){
			PowerUpMgr.spawnPU(x, y);
		}
	}
}