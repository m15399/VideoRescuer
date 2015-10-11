
function log(stuff){
	//console.log(stuff);
}

// INCLUSION
var includedScripts = [];

function include(path) {
	includedScripts.push(path);
}
function loadScripts(callback) { // loads scripts one at a time
	var loads = 0;
	(function nextScript() {
		if(loads == includedScripts.length){
			callback();
			return;
		}
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.src = includedScripts[loads];
		document.body.appendChild(script);
		
		script.onload = nextScript;
		
		//log('loading ' + script.src);
		//log(loads+'/'+includedScripts.length);
		loads++;
	}());
}

// WINDOW SETUP
var canvas;
var ctx;

function initWindow() {
	canvas = document.createElement('canvas');
	ctx = canvas.getContext("2d");
	canvas.width = w;
	canvas.height = h;
	document.body.appendChild(canvas);

	//canvas.style.border = '1px solid #333';
	canvas.style.marginTop = '10px';
}

// STATS
var stats;

function initStats(){
	stats = new Stats();
	stats.getDomElement().style.position = 'absolute';
	stats.getDomElement().style.left = '0px';
	stats.getDomElement().style.top = '0px';
	document.body.appendChild( stats.getDomElement() );
}
function hideStats(){
	stats.getDomElement().style.visibility = 'hidden';
}
function showStats(){
	stats.getDomElement().style.visibility = 'visible';
}

// INITIALIZATION/LOADING SCRIPTS
onload = init;

function init() {
	initWindow();
	
	g = ctx;
	g.fillStyle = 'black';
	g.fillRect(0,0,w,h);
	
	// draw the text 'LOADING' at the bottom while the scripts are loading
	var size = 20;
	g.font = ((size*.7)|0) + ' pt Arial';
	g.fillStyle = 'white';
	g.textAlign = 'center';
	g.textBaseline = 'bottom';
	g.fillText("LOADING SCRIPTS", w/2, h-size*2);
	g.font = ((size*.6)|0) + ' pt Arial';
	g.fillText("this may take a minute", w/2, h-size);
	
	// load the scripts and then finish initializing 
	loadScripts(function(){
		initStats();
		hideStats();
		start();
	});
}


/*
..######......###....##.....##.########.....######...#######..########..########
.##....##....##.##...###...###.##..........##....##.##.....##.##.....##.##......
.##.........##...##..####.####.##..........##.......##.....##.##.....##.##......
.##...####.##.....##.##.###.##.######......##.......##.....##.##.....##.######..
.##....##..#########.##.....##.##..........##.......##.....##.##.....##.##......
.##....##..##.....##.##.....##.##..........##....##.##.....##.##.....##.##......
..######...##.....##.##.....##.########.....######...#######..########..########
*/

// ROOT URL
var rootURL = "";

// INCLUDES
include('http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
include(rootURL + 'Stats.js');
include(rootURL + 'json2.js');

include(rootURL + 'UserData.js');

include(rootURL + 'Utils.js');
include(rootURL + 'Resources.js');
include(rootURL + 'Youtubes.js');
include(rootURL + 'Input.js');

include(rootURL + 'Screen.js');
include(rootURL + 'Menus.js');

include(rootURL + 'Level/Level.js');

include(rootURL + 'Level/Script.js');
include(rootURL + 'Level/Levels.js');
include(rootURL + 'Level/Background.js');
include(rootURL + 'Level/UI.js');
include(rootURL + 'Level/Overlays.js');

include(rootURL + 'Level/PowerUpMgr.js');
include(rootURL + 'Level/BulletMgr.js');
include(rootURL + 'Level/EnemyMgr.js');
include(rootURL + 'Level/ExplosionMgr.js');

include(rootURL + 'Level/Weapons.js');
include(rootURL + 'Level/Bullets.js');

include(rootURL + 'Level/Player.js');
include(rootURL + 'Level/Enemies/Enemies.js');
include(rootURL + 'Level/Enemies/Ship.js');
include(rootURL + 'Level/Enemies/Sentry.js');
include(rootURL + 'Level/Enemies/Monster.js');
include(rootURL + 'Level/Enemies/BigMonster.js');
include(rootURL + 'Level/Enemies/GiantMonster.js');
include(rootURL + 'Level/Enemies/Saucer.js');
include(rootURL + 'Level/Enemies/Exploder.js');
include(rootURL + 'Level/Enemies/Interceptor.js');
include(rootURL + 'Level/Enemies/BigShip.js');
include(rootURL + 'Level/Enemies/Mothership.js');
include(rootURL + 'Level/Enemies/FlameTurret.js');
include(rootURL + 'Level/Enemies/Fighter.js');


// GLOBALS
var w = 650,
	h = 650;
var debug = false;
var frameRate = 30;
var frameCount = 0;
var paused = false;
var interval = null;
var userData = null;

// START GAME
function start(){
	loadUserData(function(){
		Resources.init();
		Input.init();
		Screen.init();
		
		interval = setInterval(update, 1000/frameRate);
	});

}

// UPDATE GAME
function update(){	
	stats.update();
	if(Input.keys[192]){ // toggle debug mode
		Input.keys[192] = false;
		if(debug)
			hideStats();
		else
			showStats();
		debug = !debug;
	}
	if(debug){
		if(Input.keys[85]){ // U for unlimited framerate
			clearInterval(interval);
			interval = setInterval(update, 1);
		}
		if(Input.keys[75]){ // K to skip level
			Input.keys[75] = false;
			Level.finishLevel();
		}
		if(Input.keys[70]){ // F to fast forward
			Input.keys[70] = false;
			for(var i = 0; i < 30; i++){
				update();
			}
		}
		if(Input.keys[49]){ // 1 to upgrade laser
			Input.keys[49] = false;
			Player.upgradeLaser();
		}
		if(Input.keys[50]){ // 2 to upgrade missile
			Input.keys[50] = false;
			Player.upgradeMissile();
		}
		if(Input.keys[51]){ // 3 to upgrade power
			Input.keys[51] = false;
			Player.upgradePower();
		}
	}
	if(!Resources.fullyLoaded()){
		LoadingScreen.draw(ctx);
		return;
	} else {
		Resources.finishLoad();
	}
	//////////////////////////////
	
	Screen.update();
	
	//////////////////////////////
	draw(ctx);
}

// DRAW GAME
function draw(g){
	g.fillStyle = 'black';
	g.fillRect(0,0,w,h);
	//////////////////////////////
	
	Screen.draw(g);

	//////////////////////////////
}
