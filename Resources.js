
// BASE URLS
var imagesURL = rootURL + 'Resources/';
//var soundURL = rootURL + 'Resources/Sounds/';


var Resources = {
	
	init: function(){		
		
		Resources.loadImage(imagesURL + 'Player.png');
		Resources.loadImage(imagesURL + 'Missile.png');
		Resources.loadImage(imagesURL + 'Bomb1.png');
		Resources.loadImage(imagesURL + 'Bomb2.png');
		Resources.loadImage(imagesURL + 'Bomb3.png');
		Resources.loadImage(imagesURL + 'Bomb4.png');
		Resources.loadImage(imagesURL + 'Face.jpg');
		Resources.loadImage(imagesURL + 'Evil.jpg');
		Resources.loadImage(imagesURL + 'lvl0.jpg');
		Resources.loadImage(imagesURL + 'lvl1.jpg');
		Resources.loadImage(imagesURL + 'lvl2.jpg');
		Resources.loadImage(imagesURL + 'lvl3.jpg');
		
		// Tutorial
		
		Resources.loadImage(imagesURL + 'Target.png');
		Resources.loadImage(imagesURL + 'AllyTurret.png');
		
		// Level 1
		Resources.loadImage(imagesURL + 'Ship.png');
		Resources.loadImage(imagesURL + 'Clouds.png');
		Resources.loadImage(imagesURL + 'Ocean.jpg');
		Resources.loadImage(imagesURL + 'Sentry.png');
		Resources.loadImage(imagesURL + 'SentryFlipped.png');
		Resources.loadImage(imagesURL + 'SentryBullet.png');
		Resources.loadImage(imagesURL + 'MonsterBlue.png');
		Resources.loadImage(imagesURL + 'MonsterBlueFlipped.png');
		Resources.loadImage(imagesURL + 'MonsterOrange.png');
		Resources.loadImage(imagesURL + 'MonsterOrangeFlipped.png');
		Resources.loadImage(imagesURL + 'BigMonster.png');
		Resources.loadImage(imagesURL + 'BigMonsterFlipped.png');
		Resources.loadImage(imagesURL + 'GiantMonster.png');
		Resources.loadImage(imagesURL + 'GiantMonsterFlipped.png');
		
		// Level 2
		Resources.loadImage(imagesURL + 'Earth.png');
		Resources.loadImage(imagesURL + 'Saucer.png');
		Resources.loadImage(imagesURL + 'Interceptor.png');
		Resources.loadImage(imagesURL + 'BigShip.png');
		Resources.loadImage(imagesURL + 'Mothership.png');

		// Level 3
		Resources.loadImage(imagesURL + 'RedClouds.png');
		Resources.loadImage(imagesURL + 'Asteroid1.png');
		Resources.loadImage(imagesURL + 'Asteroid2.png');
		Resources.loadImage(imagesURL + 'Asteroid3.png');
		Resources.loadImage(imagesURL + 'Exploder.png');
		Resources.loadImage(imagesURL + 'ExploderFlipped.png');
		Resources.loadImage(imagesURL + 'ExploderFull.png');
		Resources.loadImage(imagesURL + 'ExploderFullFlipped.png');
		Resources.loadImage(imagesURL + 'FlameTurret.png');
		Resources.loadImage(imagesURL + 'Fighter.png');
		Resources.loadImage(imagesURL + 'FighterSide.png');
		Resources.loadImage(imagesURL + 'FighterSideFlipped.png');
		Resources.loadImage(imagesURL + 'Catship.png');

		
	},
	
	// SOUNDS
	sounds: {},
	
	loadSound: function(path, callback){
		callback = callback || function(){};
		
		var sound = this.sounds[path];
		if(sound){
			callback();
			return sound;
		}
		
		this.numResources++;
		this.loadingResources++;
		
		sound = new Audio(path);
		sound.load();
		this.whenSoundLoaded(sound, function(){
			Resources.loadedResources++;
		});
		
		sound.addEventListener('ended',function(){
			this.pause();
		}, false);
		
		this.sounds[path] = sound;
		return sound;
	},
	
	playSound: function(sound){
		sound.currentTime = 0;
		sound.play();
	},
	
	whenSoundLoaded: function(sound, callback){
		// check if the sound is loaded, if not, check again in 50ms
		if(sound.readyState == 4)
			callback();
		else
			setTimeout(function(){Resources.whenSoundLoaded(sound,callback)}, 50);
	},
	
	// IMAGES
	images: {},
	
	loadImage: function(path, callback){
		callback = callback || function(){};
		
		var image = this.images[path];
		if(image){
			callback();
			return image;
		}
		
		this.numResources++;
		this.loadingResources++;
		
		image = new Image();
		image.onload = function(){
			Resources.loadedResources++;
			callback();
		};
		image.src = path;
		
		this.images[path] = image;
		
		//log('loading ' + path);
		return image;
	},
	
	// GENERAL	
	numResources: 0,
	loadingResources: 0,
	loadedResources: 0,
	
	fullyLoaded: function(){
		// are all the resources loaded?
		return (this.loadedResources == this.loadingResources && !Youtubes.fetching);
	},
	
	finishLoad: function(){
		// reset the loading and loaded resource counters so that the next time
		// resources are loaded, the loading bar will show the correct progress
		this.loadingResources = this.loadedResources = 0;
	},
	
	whenFullyLoaded: function(callback){
		if(this.fullyLoaded){
			callback();
		} else {
			var that = this;
			setTimeout(function(){that.whenFullyLoaded(callback)}, 50);
		}
	}
	
	/* 
	queuedImages: [],
	queueImage: function(path){
		this.queuedImages.push(path);
	},
	
	loadImages: function(callback){
		callback = callback || function(){};
		
		while(this.queuedImages.length > 0){
			var path = this.queuedImages.pop();
			this.loadImage(path);
		}
		callback();
	},
	*/
}

var LoadingScreen = {
	draw: function(g){
		// clear screen
		g.fillStyle = 'black';
		g.fillRect(0,0,w,h);
		
		// draw the loading bar
		g.fillStyle = '#038';
		g.strokeStyle = '#fff';
		var size = 20;
		var len = w-size*2;
		var frac = Resources.loadedResources / Resources.loadingResources;
		g.fillRect(size,h-size*2,(len*frac)|0,size);
		g.strokeRect(size,h-size*2,len,size);
		
		// draw the text
		g.font = ((size*.7)|0) + ' pt Arial';
		g.fillStyle = 'white';
		g.textAlign = 'center';
		g.textBaseline = 'bottom';
				
		g.fillText("LOADING", w/2, h-size);
		
	}
}