
var Levels = [
	
	function test(s){
		Background.add(new Starfield());
		Youtubes.loadVideos({
			q: 'spaghetti monster'
		});
	},
	
	
	
	
	
	//////////////
	// TUTORIAL //
	//////////////
	function tutorial(s){
		
		Background.add(new Starfield());
		
		s.wait(30);
		s.does(function(){
			s.pause();
			new Dialog(h/2, 'Hello, I am your commanding officer.\nI\'ll show you how to pilot your space \nship! \n\nTry flying with the arrow keys.', 0, function(){s.resume()});
		});
		s.wait(30);
		s.does(function(){
			s.pause();
			new Dialog(h/2, 'Good job. Now try pressing the space \nbar to shoot. If your finger gets tired, \njust press the A key to enable \nauto-fire.', 0, function(){s.resume()});
		});
		s.wait(1);
		s.does(function(){
			var e = EnemyMgr.addEnemy(new Target(w/2, 250));
			e.onDeath = function(){
				s.resume();
			}
			s.pause();
		});
		s.wait(5);
		s.does(function(){
			s.pause();
			new Dialog(h/2, 'Good job. See the red bar on the left? \nThat\'s your power meter. Press the \nZ key to shoot your super lasers!', 0, function(){s.resume()});
		});
		s.wait(1);
		s.does(function(){
			Player.upgradePower();
			Player.addPower(100);
			s.pause();
			var wave = new Wave(function(enemy){
				PowerUpMgr.spawnPU(enemy.x, enemy.y, 3);
				s.resume();
			});
			var e;
			e = EnemyMgr.addEnemy(new Target(150, 300));
			wave.add(e);
			e = EnemyMgr.addEnemy(new Target(w-150, 300));
			wave.add(e);
			e = EnemyMgr.addEnemy(new Target(w/2-90, 265));
			wave.add(e);
			e = EnemyMgr.addEnemy(new Target(w/2+90, 265));
			wave.add(e);
			e = EnemyMgr.addEnemy(new Target(w/2, 250));
			wave.add(e);
		});
		s.wait(10);
		s.does(function(){
			s.pause();
			new Dialog(h/2, 'See that blue thing? That\'s a powerup. \nMake sure to collect those. \n\nNow let\'s try out your bomb.', 0, function(){s.resume()});
		});
		s.wait(1);
		s.does(function(){
			s.pause();
			new Dialog(h/2, 'In addition to blowing your enemies to \npieces, your bomb destroys nearby \nbullets. Use your bomb to survive \nthis killer robot!', 0, function(){s.resume()});
		});
		s.wait(1);
		s.does(function(){
			Player.upgradePower();
			Player.upgradePower();
			s.pause();
			Player.addPower(2000);
			e = EnemyMgr.addEnemy(new AllyTurret(w/2, 200));
			e.onDeath = function(){
				s.resume();
			};
		});
		s.wait(10);
		s.does(function(){
			s.pause();
			new Dialog(h/2, 'Looks like you\'re ready to fight the\naliens, if they attack anytime soon.\n        \nHOLY #@$! THE ALIENS!!! \nRETURN TO BASE!!', 0, function(){s.resume()});
		});
		s.wait(1);
		s.does(Level.finishLevel);
		
	},
	
	
	
	
	
	
	
	///////////////
	// LEVEL ONE //
	///////////////
	
	function levelOne(s){
		
		Background.add(new BGImage(imagesURL + 'Ocean.jpg', .5));
		Background.add(new BGImage(imagesURL + 'Clouds.png', 15));
		
		Youtubes.loadVideos({}, null, 'standardfeeds/recently_featured');
		
		s.wait(60);
		s.does(function(){
			var wave = new Wave();
			for(var i = 0; i < 3; i++){
				wave.add(EnemyMgr.addEnemy(new Ship([w/2, -40, w/2, h+100], i*15)));
			}
		});
		s.wait(120);
		s.does(function(){
			var wave = new Wave();
			var wave2 = new Wave();
			for(var i = 0; i < 3; i++){
				wave.add(EnemyMgr.addEnemy(new Ship([0, -40, w/2, h/2, w-120, h/2, w/2, h+300], i*15)));
				wave2.add(EnemyMgr.addEnemy(new Ship([w, -40, w/2, h/2, 120, h/2, w/2, h+300], i*15)));
			}
		});
		s.wait(120);
		s.does(function(){
			var wave = new Wave();
			wave.add(EnemyMgr.addEnemy(new Monster(200, -100)));
			wave.add(EnemyMgr.addEnemy(new Monster(w/2, -150)));
			wave.add(EnemyMgr.addEnemy(new Monster(w-200, -100)));
		});
		s.wait(160);
		s.does(function(){
			EnemyMgr.addEnemy(new Sentry(150, h/3|0, 30));
			EnemyMgr.addEnemy(new Sentry(370, h/3|0, 60));
			var wave = new Wave();
			for(var i = 0; i < 5; i++){
				wave.add(EnemyMgr.addEnemy(new Monster(w-150, -100-i*100)));
				wave.add(EnemyMgr.addEnemy(new Monster(240, -200-i*100)));
			}
		});
		s.wait(500);
		s.does(function(){
			new Dialog(h/2, 'I\'m detecting a Youtube video on my \nsensors! See if you can retrieve it.')
		});
		s.wait(150);
		s.does(function(){
			s.pause();
			var e = EnemyMgr.addEnemy(new BigMonster(w/2, -100));
			e.onDeath = function(){
				s.resume();
			};
			EnemyMgr.addEnemy(new Sentry(150, 150, 50));
			EnemyMgr.addEnemy(new Sentry(500, 150, 50));
		});
		s.wait(150);
		s.does(function(){
			new Dialog(h/2, 'Did you get it? It looks like the aliens \nhave stolen all of Earth\'s web videos!   \n\nThis is a sad day for the internet.  :(');
		});
		s.wait(380);
		s.does(function(){
			var wave = new Wave();
			var wave2 = new Wave();
			for(var i = 0; i < 5; i++){
				wave.add(EnemyMgr.addEnemy(new Ship([110, -40, 110, h/2-200, w-120, h-200, 130, 200, 110, h+200], i*15)));
				wave2.add(EnemyMgr.addEnemy(new Ship([w-110, -40, w-110, h/2-200, 120, h-200, w-130, 200, w-110, h+200], i*15)));
			}
		});
		s.wait(300);
		s.does(function(){
			EnemyMgr.addEnemy(new BigMonster(220, -100));
			EnemyMgr.addEnemy(new BigMonster(220, -400));
			var wave = new Wave();
			for(var i = 0; i < 8; i++){
				wave.add(EnemyMgr.addEnemy(new Monster(w-150, -100-i*100)));
				wave.add(EnemyMgr.addEnemy(new Monster(w-250, -200-i*100)));
			}
		});
		s.wait(700);
		s.does(function(){
			EnemyMgr.addEnemy(new BigMonster(w/2-60, -100));
			EnemyMgr.addEnemy(new BigMonster(w/2+60, -300));
			EnemyMgr.addEnemy(new Sentry(150, 250, 50));
			EnemyMgr.addEnemy(new Sentry(w-150, 250, 50));
			EnemyMgr.addEnemy(new Sentry(150, 150, 100));
			EnemyMgr.addEnemy(new Sentry(w-150, 150, 100));
		});
		s.wait(450);
		s.does(function(){
			EnemyMgr.addEnemy(new BigMonster(220, -100));
			EnemyMgr.addEnemy(new BigMonster(w-220, -100));
			EnemyMgr.addEnemy(new BigMonster(w/2, -300));
		});
		s.wait(200);
		s.does(function(){
			var wave = new Wave();
			for(var i = 0; i < 20; i++){
				wave.add(EnemyMgr.addEnemy(new Ship([w/2, -40, w/2, h+100], i*15)));
			}
		});
		s.wait(500);
		s.does(function(){
			var wave = new Wave();
			for(var i = 0; i < 3; i++){
				wave.add(EnemyMgr.addEnemy(new Ship([w/2, -40, w/2, h+100], i*15)));
			}
		});
		s.wait(60);
		s.does(function(){
			var wave = new Wave();
			for(var i = 0; i < 3; i++){
				wave.add(EnemyMgr.addEnemy(new Ship([w/2-200, -40, w/2, h+100], i*15)));
			}
		});
		s.wait(60);
		s.does(function(){
			var wave = new Wave();
			for(var i = 0; i < 3; i++){
				wave.add(EnemyMgr.addEnemy(new Ship([w/2+200, -40, w/2, h+100], i*15)));
			}
		});
		s.wait(320);
		s.does(function(){
			new Dialog(h/2, 'I\'m detecting a huge enemy ahead! \nLooks like he\'s carrying several \nYoutube videos with him!')
		});
		s.wait(350);
		s.does(function(){
			s.pause();
			var e = EnemyMgr.addEnemy(new GiantMonster());
			e.onDeath = function(){
				s.resume();
			};
		});
		s.wait(240);
		s.does(function(){
			s.pause();
			new Dialog(h/2, 'I\'m pretty sure these guys had some \nof the "recently featured" videos on \nYoutube. \nMy sensors show more aliens in \nEarth\'s vicinity. Take us into orbit!',0,function(){s.resume();});
		});
		s.wait(80);
		s.does(function(){
			Level.finishLevel();
		});
		
	},
	
	
	
	
	
	
	///////////////
	// LEVEL TWO //
	///////////////
	
	function levelTwo(s){
		Youtubes.loadVideos({}, null, 'standardfeeds/top_rated');
		
		Background.add(new Starfield(.5));
		var earth = new Earth(h/2, .075);
		Background.add(earth);
		
		s.does(function(){
			EnemyMgr.addEnemy(new BigShip(w/2, -150));
			new Dialog(h/2, 'Look, a transport ship! It must be \ncarrying that video back to the \naliens\' homeworld. Shoot it down!!');
		});
		s.wait(450);
		s.does(function(){
			new Dialog(h/2, 'By the way, your score multiplier \nincreases every time you collect a \nvideo. I\'m detecting Youtube\'s "top \nrated" videos in this area, make sure \nto collect them all!')
		});
		s.wait(400);
		s.does(function(){
			var wave = new Wave();
			var rows = 2;
			var cols = 4;
			for(var i = 0; i < rows; i++){
				for(var j = 0; j < cols; j++){
					wave.add(EnemyMgr.addEnemy(new Saucer(480/(1+cols)*(j+2), -60*i-50)));
				}
			}

		});
		s.wait(200);
		
		s.does(function(){
			for(var i = 0; i < 2; i++){
				EnemyMgr.addEnemy(new BigShip(200, -100-300*i));
			}
		});
		s.wait(200);
		
		s.does(function(){
			var wave = new Wave();
			var e = null;
			for(var i = 0; i < 10; i++){
				e = EnemyMgr.addEnemy(new Ship(Ship.prototype.script1));
				e.script.jumpBy(-20*i);
				e.speed = 4;
				e.fires = true;
				wave.add(e);
			}
		});
		s.wait(450);
		
		s.does(function(){
			var wave = new Wave();
			for(var i = 0; i < 10; i++)
				wave.add(EnemyMgr.addEnemy(new Interceptor(Math.random()*800-150, -Math.random()*600, 0)));
		});
		s.wait(100);
		
		s.does(function(){
			var wave = new Wave();
			var rows = 4;
			var cols = 5;
			for(var i = 0; i < rows; i++){
				for(var j = 0; j < cols; j++){
					wave.add(EnemyMgr.addEnemy(new Saucer(480/(1+cols)*(j+2), -60*i-50)));
				}
			}
			EnemyMgr.addEnemy(new BigShip(w*2/3|0, -400));
			EnemyMgr.addEnemy(new BigShip(w/3|0, -400));
			
		});
		
		s.wait(850);
		s.does(function(){
			EnemyMgr.addEnemy(new Sentry(140, 100, 20));
			EnemyMgr.addEnemy(new Sentry(230, 200, 0));
			EnemyMgr.addEnemy(new Sentry(300, 140, 10));
			EnemyMgr.addEnemy(new Sentry(390, 310, 0));
			EnemyMgr.addEnemy(new Sentry(500, 400, 0));
			
			var wave = new Wave();
			for(var i = 0; i < 15; i++)
				wave.add(EnemyMgr.addEnemy(new Interceptor(Math.random()*800-150, -Math.random()*1000, 0)));
			
		});
		s.wait(250);
		
		s.does(function(){
			var wave = new Wave();
			for(var i = 0; i < 10; i++){
				wave.add(EnemyMgr.addEnemy(new Ship([450, -100, 450, 200, 200, 500, 200, 700], i*20)));
				wave.add(EnemyMgr.addEnemy(new Ship([550, -100, 550, 200, 300, 500, 300, 700], i*20)));
			}
			
			EnemyMgr.addEnemy(new BigShip(180, -100));
			EnemyMgr.addEnemy(new BigShip(340, -250));
		});
		s.wait(500);
		
		s.does(function(){
			EnemyMgr.addEnemy(new BigMonster(w/3|0,-110));
			EnemyMgr.addEnemy(new BigMonster(w*2/3|0,-110));
			var wave = new Wave();
			for(var i = 0; i < 20; i++)
				wave.add(EnemyMgr.addEnemy(new Interceptor(Math.random()*800-150, -Math.random()*1000-500, 0)));
		});
		s.wait(400);
		
		s.does(function(){
			EnemyMgr.addEnemy(new BigShip(w/3|0,-110));
			EnemyMgr.addEnemy(new BigShip(w*2/3|0,-110));
			EnemyMgr.addEnemy(new BigShip(w*2,-350));
			var wave = new Wave();
			for(var i = 0; i < 23; i++)
				wave.add(EnemyMgr.addEnemy(new Interceptor(Math.random()*800-150, -Math.random()*1000-1000, 0)));
		});
		s.wait(700);
		
		for(var i = 0; i < 4; i++){
			s.does(function(){
				var wave = new Wave();
				var x = Math.random()*480+85;
				for(var i = 0; i < 3; i++)
					wave.add(EnemyMgr.addEnemy(new Interceptor(x, -50*i, 0)));
			});
			s.wait(120);
		}
		s.wait(200);
		s.does(function(){
			new Dialog(h/2, 'My communication\'s being jammed, \nI cc..nr.e.. . .. It\'s a HUGE SHIP, \nyou s... an.. ..ood luck.  . ...  . .. \n......... . ... ... ..... ...... . .        ');
		});
		
		s.wait(550);
		s.does(function(){
			Background.setSpeed(0);
			s.pause();
			EnemyMgr.resetIndicies();
			var e = EnemyMgr.addEnemy(new Mothership());
			e.onDeath = function(){
				s.resume();
			};
		});
		s.wait(200);
		s.does(function(){
			new Dialog(h/2, 'Whew, you got \'em.');
		});
		s.wait(200);
		s.does(function(){
			earth.explode();
		});
		s.wait(230);
		s.does(function(){
			new Dialog(h/2, 'Oops...              \nLooks like the Earth blew up anyways.     \n\nOh well, there are still videos to be \nrescued!',0,Level.finishLevel);
		});
	},
	
	
	
	
	
	
	/////////////////
	// LEVEL THREE //
	/////////////////
	
	function levelThree(s){
		Youtubes.loadVideos({}, null, 'standardfeeds/most_viewed');

		Background.add(new Starfield());
		Background.add(new BGImage(imagesURL + 'RedClouds.png', 2));
		
		s.does(function(){
			//s.jumpBy(4450);
			
			new Dialog(h/2, 'I\'ve warped us in behind the alien \nfleet, where all the "most viewed" \nvideos are being held. We should be \nable to catch up to them and reclaim \nour videos once and for all!       ');
		});
		s.wait(100);
		s.does(function(){
			for(var i = 0; i < 64; i++){
				EnemyMgr.addEnemy(new Asteroid(Math.random()*480+Level.margin, -100-i*120-Math.random()*80));
			}
		});
		s.wait(700);
		
		s.does(function(){
			new Dialog(h/2, 'We don\'t have time for this!');
		});
		s.wait(100);
		s.does(function(){
			Background.setSpeed(6);
			s.pause();
			var ch = s.addCheck(function(){
				if(EnemyMgr.enemyCount == 0){
					s.removeCheck(ch);
					s.resume();
				}
			});
		});
		s.wait(1);
		s.does(function(){
			Background.setSpeed(1);
		});
		s.wait(100);
		
		s.does(function(){
			EnemyMgr.addEnemy(new BigMonster(w/3|0, -100));
			EnemyMgr.addEnemy(new BigMonster(w*2/3|0, -250));
		});
		
		s.wait(550);
		
		s.does(function(){
			var wave = new Wave();
			var rows = 2;
			var cols = 4;
			for(var i = 0; i < rows; i++){
				for(var j = 0; j < cols; j++){
					wave.add(EnemyMgr.addEnemy(new Saucer(480/(1+cols)*(j+2), -60*i-50)));
				}
			}
		});
		s.wait(250);
		s.does(function(){
			EnemyMgr.addEnemy(new Exploder(150, h/2, 400));
			EnemyMgr.addEnemy(new Exploder(350, h/2-150, 500));
			EnemyMgr.addEnemy(new Exploder(420, h/2-50, 550));
			EnemyMgr.addEnemy(new Exploder(120, h/2-250, 600));
		});
		
		s.wait(450);
		s.does(function(){
			EnemyMgr.addEnemy(new FlameTurret(200, -60));
			EnemyMgr.addEnemy(new FlameTurret(w-200, -60));
			EnemyMgr.addEnemy(new BigShip(w/2, -100));
		});
		
		s.wait(400);
		s.does(function(){
			var wave = new Wave();
			for(var i = 0; i < 5; i++){
				wave.add(EnemyMgr.addEnemy(new Monster(130, -100-i*100)));
				wave.add(EnemyMgr.addEnemy(new Monster(240, -150-i*100)));
			}
			EnemyMgr.addEnemy(new FlameTurret(w-130, -60));
			EnemyMgr.addEnemy(new FlameTurret(w-130, -300));
			EnemyMgr.addEnemy(new BigMonster(w/2, -150));

		});
		
		s.wait(400);
		s.does(function(){
			var wave = new Wave();
			for(var i = 0; i < 15; i++){
				wave.add(EnemyMgr.addEnemy(new Ship([110, -40, 110, h-300, w/2+100, h+100], i*15)));
			}
			EnemyMgr.addEnemy(new FlameTurret(140, -100));
			EnemyMgr.addEnemy(new FlameTurret(250, -240));
			EnemyMgr.addEnemy(new FlameTurret(470, -230));
			EnemyMgr.addEnemy(new FlameTurret(350, -200));
			EnemyMgr.addEnemy(new Exploder(420, h/2-150, 400));
			EnemyMgr.addEnemy(new Exploder(420, h/2-250, 600));
			EnemyMgr.addEnemy(new Exploder(420, h/2-150, 700));
			EnemyMgr.addEnemy(new Exploder(420, h/2-250, 800));

		});
		
		s.wait(600);
		s.does(function(){
			var wave = new Wave();
			for(var i = 0; i < 15; i++)
				wave.add(EnemyMgr.addEnemy(new Interceptor(Math.random()*800-150, -Math.random()*1000, 0)));
			for(var i = 0; i < 12; i++)
				EnemyMgr.addEnemy(new Exploder(Math.random()*480+85, Math.random()*h/2+100, i*50));
		});
		
		s.wait(500);
		s.does(function(){
			EnemyMgr.addEnemy(new BigMonster(10+w/3|0, -100));
			EnemyMgr.addEnemy(new BigMonster(-10+w*2/3|0, -100));
			EnemyMgr.addEnemy(new FlameTurret(w/3|0, -270));
			EnemyMgr.addEnemy(new FlameTurret(w/2|0, -270));
			EnemyMgr.addEnemy(new FlameTurret(w*2/3|0, -270));
			EnemyMgr.addEnemy(new Sentry(110, 200, 60));
			EnemyMgr.addEnemy(new Sentry(110, 270, 0));
			EnemyMgr.addEnemy(new Sentry(w-110, 200, 60));
			EnemyMgr.addEnemy(new Sentry(w-110, 270, 0));
		});
		
		s.wait(500);
		s.does(function(){
			
			
			var ch = s.addCheck(function(){
				if(EnemyMgr.enemyCount > 30)
					s.removeCheck(ch);
				
				while(true){
					var x = Math.random()*480+85;
					var y = -300-Math.random()*1400;
					
					var tooClose = false;
					for(var i = 0; i < maxEnemies; i++){
						var e = EnemyMgr.enemies[i];
						if(!e)
							continue;
						
						var d2 = Utils.square(e.x-x) + Utils.square(e.y-y);
						if(d2 < 14400){
							tooClose = true;
							break;
						}
						
					}
					if(!tooClose){
						var en = Math.random()*3|0;
						if(en == 0)
							EnemyMgr.addEnemy(new Asteroid(x, y));
						else if (en == 1)
							EnemyMgr.addEnemy(new FlameTurret(x,y));
						else
							EnemyMgr.addEnemy(new Exploder(x, Math.random()*h, -y)).speed = 1;
						break;
					}
					
				}
			});
			
		});
		s.wait(1830);
		
		
		s.does(function(){
			var wave = new Wave();
			var rows = 2;
			var cols = 3;
			for(var i = 0; i < rows; i++){
				for(var j = 0; j < cols; j++){
					wave.add(EnemyMgr.addEnemy(new Saucer(480/(1+cols)*(j+2), -60*i-50)));
				}
			}
		});
		s.wait(300);
		
		s.does(function(){
			var wave = new Wave();
			var rows = 3;
			var cols = 4;
			for(var i = 0; i < rows; i++){
				for(var j = 0; j < cols; j++){
					wave.add(EnemyMgr.addEnemy(new Saucer(480/(1+cols)*(j+2), -60*i-50)));
				}
			}
		});
		s.wait(350);
		
		s.does(function(){
			var wave = new Wave();
			var rows = 7;
			var cols = 5;
			for(var i = 0; i < rows; i++){
				for(var j = 0; j < cols; j++){
					wave.add(EnemyMgr.addEnemy(new Saucer(480/(1+cols)*(j+2), -60*i-50)));
				}
			}
		});
		s.wait(960);
		
		s.does(function(){
			EnemyMgr.resetIndicies();
			s.pause();
			new Dialog(h/2, 'We\'re within communication range of \nthe fleet\'s boss, let me signal him.\n\n Ahem,', 0, function(){s.resume()});
		});
		s.wait(5);
		
		s.does(function(){
			s.pause();
			new Dialog(h/2, 'ALIEN CREATURE!! \nSHOW YOURSELF!', 0, function(){s.resume()});
		});
		s.wait(30);
		
		s.does(function(){
			s.pause();
			new Dialog(h/2, 'o hai, i is evil cat.             ', 1, function(){s.resume()});
		});
		s.wait(5);
		
		s.does(function(){
			s.pause();
			new Dialog(h/2, 'What? You\'re not an alien!', 0, function(){s.resume()});
		});
		s.wait(5);
		
		s.does(function(){
			s.pause();
			new Dialog(h/2, 'no, i is not aliens, i hires these alien to \nsteal allz ur videos!', 1, function(){s.resume()});
		});
		s.wait(5);
		
		s.does(function(){
			s.pause();
			new Dialog(h/2, 'NOOOOOOOOOO!!! GET HIM!!', 0, function(){s.resume()});
		});
		s.wait(1);
		
		s.does(function(){
			s.pause();
			EnemyMgr.addEnemy(new Fighter()).onDeath = function(){
				s.resume();
			};
			
		});
		s.wait(160);
		
		
		s.does(function(){
			EnemyMgr.addEnemy(new CatShip());
		});
		s.wait(500);
		
		s.does(function(){
			
			for(var i = 0; i < 31; i++){
				if(i < 30)
					var p = PowerUpMgr.spawnYT(Math.random()*480+85, 0, Youtubes.nextVideo());
				else
					var p = PowerUpMgr.spawnPU(w/2, 0, 3);
				
				p.y = -100-Math.random()*500
				if(i == 30)
					p.y = -750;
				
				p.yv = 1;
				
				p.update = function(){
					this.y += this.yv;
					this.a += this.av;
				
					if(this.a < 0){
						this.a += Math.PI*2;
					} else if(this.a > Math.PI*2){
						this.a -= Math.PI*2;
					}
					
					if(this.y > h + 100){
						PowerUpMgr.removePU(this);
					}
					
					if(Utils.circsCollide(this.x, this.y, this.size, Player.x, Player.y, Player.size)){
						this.collect();
					}
				}
			}
		});
		s.wait(900);
		
		
		s.does(function(){
			s.pause();
			new Dialog(h/2, 'Congratulations! You\'ve saved the \ninternet!       \n\n             Thanks for playing! \n                      The End', 0, function(){s.resume()});
		});
		s.wait(5);
		
		s.does(function(){
			Fade.fadeOut(Level.quitToTitle);
		});
		
		
		
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	///////////
	// TESTS //
	///////////
	
	function earthTest(s){
		Youtubes.loadVideos({
			q: 'space ship'
		});
		
		Background.add(new Starfield(.5));
		var earth = new Earth(h/2, .075);
		Background.add(earth);
		Player.upgradePower();
		Player.upgradeLaser();
		Player.upgradeMissile();
		
		s.does(function(){
			var wave = new Wave();
			for(var i = 0; i < 15; i++)
				wave.add(EnemyMgr.addEnemy(new Interceptor(Math.random()*(w-2*Level.margin)+Level.margin, -Math.random()*600, 0)));
			EnemyMgr.addEnemy(new BigShip(w/2, -100));
		});
		s.wait(300);
		
		
		
		s.does(function(){
			new Dialog(h/2, 'I am evil cat.', 1);
			
			for(var i = 0; i < 4; i++){
				EnemyMgr.addEnemy(new Saucer(150 + 110*i, -50));
			}
			for(var i = 0; i < 4; i++){
				EnemyMgr.addEnemy(new Saucer(150 + 110*i, -110));
			}
			EnemyMgr.addEnemy(new Exploder(150, h/2, 400));
			EnemyMgr.addEnemy(new Exploder(350, h/2-150, 500));
			EnemyMgr.addEnemy(new Exploder(420, h/2-50, 550));
			EnemyMgr.addEnemy(new Exploder(120, h/2-250, 600));
		});
		s.wait(10);
		s.does(function(){
			s.pause();
			s.addCheck(function(){
				if(EnemyMgr.enemyCount == 0){
					s.resume();
				}
			});
		});
		s.wait(100);
		s.does(function(){
			Level.finishLevel();
		});
		
	},
	
	/*function testTwo(s){
		Background.add(new BGImage(imagesURL + 'Ocean.jpg', .5));
		Background.add(new BGImage(imagesURL + 'Clouds.png', 15));
		
		
		s.does(function(){
			s.pause();
			new Dialog(h/2, 'Hello, welcome to the game!\nUse dem arrow keys.', 0, function(){s.resume()});
		});
		s.wait(1);
		s.does(function(){
			var e = EnemyMgr.addEnemy(new Target(w/2, 250));
			e.onDeath = function(){
				s.resume();
			}
			s.pause();
		});
		s.wait(1);
		s.does(function(){
			s.pause();
			var wave = new Wave(function(enemy){
				PowerUpMgr.spawnPU(enemy.x, enemy.y, 3);
				s.resume();
			});
			var e;
			e = EnemyMgr.addEnemy(new Target(150, 300));
			wave.add(e);
			e = EnemyMgr.addEnemy(new Target(w-150, 300));
			wave.add(e);
			e = EnemyMgr.addEnemy(new Target(w/2, 250));
			wave.add(e);
		});
		s.wait(1);
		s.does(function(){
			Player.upgradePower();
			Player.upgradePower();
			Player.upgradePower();
			s.pause();
			Player.addPower(2000);
			e = EnemyMgr.addEnemy(new AllyTurret(w/2, 200));
			e.onDeath = function(){
				s.resume();
				
			};
		});
		
		s.wait(1);
		s.does(Level.finishLevel);
		
	},*/
	
	function testOne(script){
		Background.add(new BGImage(imagesURL + 'Ocean.jpg', .5));
		Background.add(new BGImage(imagesURL + 'Clouds.png', 15));
		
		Youtubes.loadVideos({
			q: 'space'
		});

		script.does(function(){
			EnemyMgr.addEnemy(new BigMonster(w/2, -100));
			EnemyMgr.addEnemy(new Sentry(150, 100, 50));
			EnemyMgr.addEnemy(new Sentry(500, 150));
			EnemyMgr.addEnemy(new Sentry(150, 200));
		});
		script.wait(250);
		
		script.does(function(){
			var e = null;
			var wave = new Wave();
			for(var i = 1; i < 4; i++){
				e = EnemyMgr.addEnemy(new Monster(220,-i*90));
				wave.add(e);
			}
			wave = new Wave();
			for(var i = 1; i < 4; i++){
				e = EnemyMgr.addEnemy(new Monster(w-220,-i*90));
				wave.add(e);
			}
		
		});
		
		script.wait(400);
		script.does(function(){
			var e = EnemyMgr.addEnemy(new GiantMonster());
		});
		script.wait(10);
		script.does(function(){
			script.pause();
			script.addCheck(function(){
				if(EnemyMgr.enemyCount == 0){
					script.resume();
				}
			});
		});
		script.wait(240);
		script.does(function(){
			Level.finishLevel();
		});
	},
	
	function testLevelThree(script){
		Background.add(new Starfield());
		
		Youtubes.loadVideos({
			q:'star'
		});
		
		script.does(function(){
			var e = null;
			for(var i = 0; i < 2; i++){
				e = EnemyMgr.addEnemy(new FlyingBox(150, -(i+1)*100, Youtubes.nextVideo()));
				Utils.fastForward(e, 100);
			}
			var wave = new Wave();
			for(var i = 0; i < 10; i++){
				e = EnemyMgr.addEnemy(new Ship(Ship.prototype.script1));
				e.script.jumpBy(-20*i);
				e.speed = 4;
				e.fires = true;
				wave.add(e);
			}
		});
		
		script.wait(10); 
		script.does(function(){
			script.pause();
			script.addCheck(function(){
				if(EnemyMgr.enemyCount == 0){
					script.resume();
				}
			});
		});
		script.wait(60);
		script.does(function(){
			Level.finishLevel();
		});
		
		
	},
	
	function testLevelOne(script){
		Background.add(new Starfield());
		
		Youtubes.loadVideos({
			q:'banana'
		});
		script.addInstruction(function(){
			for(var i = 0; i < 5; i++){
				EnemyMgr.addEnemy(new FlyingBox(150, -(i+1)*100, Youtubes.nextVideo()));
			}
		});
		script.wait(250);
		script.addInstruction(function(){
			for(var i = 0; i < 5; i++){
				EnemyMgr.addEnemy(new FlyingBox(350, -(i+1)*100, Youtubes.nextVideo()));
			}
		});
		script.wait(250);
		script.addInstruction(function(){
			for(var i = 0; i < 5; i++){
				EnemyMgr.addEnemy(new FlyingBox(250, -(i+1)*100, Youtubes.nextVideo()));
			}
		});
		script.wait(500);
		script.addInstruction(function(){
			script.jumpBy(-1001);
			for(var i = 0; i < 5; i++){
				EnemyMgr.addEnemy(new FlyingBox(450, -(i+1)*100, Youtubes.nextVideo()));
			}
		});
		
		var scoreTarget = Level.score + 5000;
		var ch = script.addCheck(function(){
			if(Level.score > scoreTarget){
				Level.finishLevel();
				script.removeCheck(ch);
			}
		});
	},
	
	function testLevelTwo(script){
		Background.add(new Starfield());
		
		Youtubes.loadVideos({
			q:'yeti'
		});
		script.addInstruction(function(){
			for(var i = 0; i < 5; i++){
				EnemyMgr.addEnemy(new FlyingBox(150, -(i+1)*100, Youtubes.nextVideo()));
			}
			for(var i = 0; i < 5; i++){
				EnemyMgr.addEnemy(new FlyingBox(500, -(i+1)*100, Youtubes.nextVideo()));
			}
		});
		script.wait(200);
		script.addInstruction(function(){
			for(var i = 1; i < 4; i++){
				EnemyMgr.addEnemy(new FlyingBox((i+2)*75, -(i+1)*100, Youtubes.nextVideo()));
			}
		});
		script.wait(500);
		script.addInstruction(function(){
			script.jumpTo(0);
		});
		
	}
];
