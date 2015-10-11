
var Youtubes = {
	videos: [],
	fetching: false,
	currIndex: 0,
	
	loadVideos: function(args, callback, urlExt){
		callback = callback || function(){};
		
		this.clearVideos();
		this.fetching = true;
		
		// make a query to the youtube api
		args.v = "2";
		args.safeSearch = "moderate";
		args.alt = "jsonc";
		
		var url = "https://gdata.youtube.com/feeds/api/";
		url += (urlExt ? urlExt : "videos");
		url += "?";
		
		//log(url);
		
		$.get(url, args, function(videos){
			log(videos.data.items[0]);
			var v;
			var i = 0;
			var l = videos.data.items.length;
			for(var i = 0; i < l; i++){
				v = videos.data.items[i];
				Youtubes.videos[i] = v;
				Resources.loadImage(v.thumbnail.sqDefault);
			}
			Youtubes.fetching = false;
			callback();
		});
		this.currIndex = 0;
	},
	
	nextVideo: function(){
		var ret = this.videos[this.currIndex];
		this.currIndex++;
		if(this.currIndex == this.videos.length){
			this.currIndex = 0;
		}
		return ret;
	},
	
	clearVideos: function(){
		this.videos = [];
	}
}