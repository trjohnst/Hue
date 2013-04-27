//
//	Scenes
//

var timer;
var bgColors = {
	cyan: "#00aef0",
	magenta: "#ed008c",
	yellow:"#fff200",
	white:"#ffffff"
};

var blocks = {
	black: [],
	cyan: [],
	magenta: [],
	yellow: [],
	white: []
}
function clearBlocks() {
	while(blocks.black.pop()){}
	while(blocks.cyan.pop()) {}
	while(blocks.magenta.pop()) {}
	while(blocks.yellow.pop()) {}
	while(blocks.white.pop()) {}
}

function changeScene(newscene, oldscene) {
	$("#"+oldscene).hide();
	$("#"+oldscene).find('*').hide();
	$("#"+newscene).show();
	$("#"+newscene).find('*').show();
	Crafty.scene(newscene);
}

//loading
//   This is where assets are loaded
Crafty.scene("loading", function() { //init - run on transition to scene
	var toLoad = [];

	// Crafty.audio.add({
	// 	music:"assets/music/Rymdkraft - Mustaschvapnet.mp3"
	// });
	// Crafty.audio.play("music", -1);
	
	Crafty.background("#cccccc");
	Crafty.e("2D, DOM, Text")
		.attr({ w:100, h:20, x:150, y:120})
		.text("Loading")
		.css({"text-align":"center"});

	var load = [];

	load.push(game_path+"assets/img/logo.png");
	for(var iter in Crafty.assets){
        load.push(iter);
    }

    //load sprites
    Crafty.sprite(50, "assets/img/strip.png", {
		player: [0,0],
		cyan: [0,1],
		magenta: [0,2],
		yellow: [0,3],
		black: [0,4],
		white: [0,5]
	});

    Crafty.background("url("+game_path+"assets/img/logo.png) black");

	//after load go to main scene (menu)
	// Crafty.load(["assets/img/strip.png"], function () {
	// 	changeScene('main', 'loading');
	// });
	changeScene('main', 'loading');

});

//main
//  This is the main menu
Crafty.scene("main", function() {
	//reset viewport in case transitioning from a level
	Crafty.viewport.x = 0;
	Crafty.viewport.y = 0;

	// Crafty.background("#cccccc");
	Crafty.background("url("+game_path+"assets/img/logo.png) black");
});

//How to Play
//    Instructions on how to play the game
Crafty.scene("instructions", function() {

});

//Level Select
//    Links to each level
Crafty.scene("levelselect", function() {

});

//Credits
//    Credits for the game
Crafty.scene("credits", function() {

});

function generateLevel(levelptr, levelval) {
	Crafty('.obj').each(function() {this.destroy();});
	var px, py;
	var i = 0;
	for(i = 0; i < levelptr.length;i++) {
		for(var j = 0; j < levelptr[0].length; j++) {
			switch(levelptr[i][j]) {
				case 0: //none
					break;
				case 1: //k
					blocks.black.push(Crafty.e("2D, DOM, black, !c, !m, !y, !w")
						.attr({ w: 30, h:30,x: j * 30, y: i * 30, globalZ:1}));
					break;
				case 2: //c
					blocks.cyan.push(Crafty.e("2D, DOM,cyan, !m, !y, !w, !k, solid")
						.attr({ w: 30, h:30,x: j * 30, y: i * 30, globalZ:1}));
					break;
				case 3: //m
					blocks.magenta.push(Crafty.e("2D, DOM,magenta, !c, !y, !w, !k, solid")
						.attr({ w: 30, h:30,x: j * 30, y: i * 30, globalZ:1}));
					break;
				case 4: //y
					blocks.yellow.push(Crafty.e("2D, DOM,yellow, !c, !m, !w, !k, solid")
						.attr({ w: 30, h:30,x: j * 30, y: i * 30, globalZ:1}));
					break;
				case 5: //white
					blocks.white.push(Crafty.e("2D, DOM, white, !c, !m, !y, !k, solid")
						.attr({ w: 30, h:30,x: j * 30, y: i * 30, globalZ:1}));
					break;
				case 6: //player
					SX = j * 30;
					SY = i * 30;
					break;
				case 8: //transition
					Crafty.e("2D, DOM, transition")
						.attr({ w: 30, h:30,x: j * 30, y: i * 30, globalZ:1});
					break;
			}
		}
		player = Crafty.e("Player,Colorer,LevelChanger")
						.attr({w:30, h:30, x: SX, y: SY, _globalZ:2, level:levelval
						,c_key: c_key, m_key: m_key, y_key: y_key, w_key:w_key})
						.twoway(3,6)
						.gravity('!w');
	}

	LW = (j * 30) - W;
	Crafty.bind("EnterFrame", function() {
		if(!player) return;
		
		//position of the viewport
		var vpx = (player._x - HW),
			vpy = (player._y - HH);
		
		//move viewport 
		if(vpx > 0 && vpx < LW) {
			Crafty.viewport.x = -vpx;
		}
	});
}


Crafty.scene("play", function() {

	levelInit();

	Crafty.viewport.x = 0;
	Crafty.viewport.y = 0;
});

function levelInit() {
	switch(currentLevel) {
		case 0:
			Crafty.e("2D, DOM, Text")
				.attr({ w:200, h:20, x:150, y:150})
				.text("This is not a test")
				.css({"text-align":"center"});
			break;
		case 1:
			Crafty.e("2D, DOM, Text")
				.attr({ w:200, h:20, x:150, y:120})
				.text("Press A and D to move left and right and W to jump")
				.css({"text-align":"center"});
			Crafty.e("2D, DOM, Text")
				.attr({ w:200, h:20, x:650, y:120})
				.text("Press H, J, K and L to change the background colors")
				.css({"text-align":"center"});
			break;
		case 2:
			Crafty.e("2D, DOM, Text")
				.attr({ w:200, h:20, x:150, y:150})
				.text("Avoid those unnaccepting of your ways")
				.css({"text-align":"center"});
			break;
	}

	Crafty.background("#ffffff");
	generateLevel(levelMaps[currentLevel],currentLevel);
}

var level1map = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,1],
	[1,0,6,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,8,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var level2map = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,1,1,2,2,1,1,1,1,1,1,1,1,1,2,2,1,1,0,0,0,0,1],
	[1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1],
	[1,0,0,0,0,1,0,1,1,0,0,1,1,0,0,1,3,0,1,1,0,1,0,0,0,0,1],
	[1,0,0,0,0,1,0,1,1,0,0,3,3,0,0,3,3,0,1,3,0,1,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,3,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,0,0,0,0,1],
	[1,0,6,0,0,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,0,0,0,8,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var level3map = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,1,1,1,2,2,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,3,3,0,0,0,0,0,3,3,0,1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,1,1,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,6,0,0,1,1,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,8,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var level0map = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var levelMaps = new Array();
levelMaps.push(level0map);
levelMaps.push(level1map);
levelMaps.push(level2map);
levelMaps.push(level3map);
