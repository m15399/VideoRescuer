
var UserData = {
	
	highScores: [0, 0, 0, 0, 0],
	levelsUnlocked: 1,
	
	valid: false
	
}

function unlockLevel(n){
	if(n > UserData.levelsUnlocked){
		UserData.levelsUnlocked = n;
		saveUserData();
	}
}

function isHighScore(n){
	var hs = UserData.highScores;
	if(n > hs[hs.length-1]){
		return true;
	} else {
		return false;
	}
}

function addHighScore(n){
	if(!isHighScore(n)){
		return false;
	}
	
	var hs = UserData.highScores;
	
	// determine correct position
	var pos = -1;
	for(var i = hs.length-1; i >= 0; i--){
		if(n > hs[i]){
			pos = i;
		} else {
			break;
		}
	}
	
	// add score
	for(var i = hs.length-2; i >= pos; i--){
		UserData.highScores[i+1] = hs[i];
	}
	UserData.highScores[pos] = n;
	
	return true;
	
}



function saveUserData(callback){
	callback = callback || function(){};
	
	UserData.valid = true;
	
	localStorage.MG_VRSave = JSON.stringify(UserData);
	callback();
	
}

function loadUserData(callback){
	callback = callback || function(){};
	
	UserData.valid = false;
	if(localStorage.MG_VRSave)
		UserData = JSON.parse(localStorage.MG_VRSave);
	else
		saveUserData();
	callback();
}