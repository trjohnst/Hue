var timer;
var bgColors = {
	cyan: "#00aef0",
	magenta: "#ed008c",
	yellow:"#fff200",
	white:"#ffffff"
};

Crafty.scene("loading", 
function() { //init - run on transition to scene
	var toLoad = [];

	// Crafty.audio.add({
	// 	music:"assets/music/Rymdkraft - Mustaschvapnet.mp3"
	// });
	// Crafty.audio.play("music", -1);

	//after load go to main scene (menu)
	Crafty.load(["assets/img/strip.png"], function () {
		Crafty.scene("main");
	});

	Crafty.background("#cccccc");
	Crafty.e("2D, DOM, Text")
		.attr({ w:100, h:20, x:150, y:120})
		.text("Loading")
		.css({"text-align":"center"});
}, 
function() { //uninit - run on transition from scene

});

Crafty.scene("main", function() {
	//reset viewport in case transitioning from a level
	Crafty.viewport.x = 0;
	Crafty.viewport.y = 0;

	Crafty.background("#cccccc");
	Crafty.e("2D, DOM, Text")
		.attr({ w:100, h:20, x:150, y:120})
		.text("Press Space to Play")
		.css({"text-align":"center"})
		.bind("KeyDown", function(e) {
			if(e.keyCode === Crafty.keys.SPACE)
				Crafty.scene("level1");
		});
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
					//Crafty.e("Block")
					//	.attr({ w: 30, h:30,x: j * 30, y: i * 30, z:1})
					//	.setColor('black');
					Crafty.e("2D, DOM, black, !c, !m, !y, !w")
						.attr({ w: 30, h:30,x: j * 30, y: i * 30, globalZ:1});
					break;
				case 2: //c
					Crafty.e("2D, DOM,cyan, !m, !y, !w, !k")
						.attr({ w: 30, h:30,x: j * 30, y: i * 30, globalZ:1});
					break;
				case 3: //m
					Crafty.e("2D, DOM,magenta, !c, !y, !w, !k")
						.attr({ w: 30, h:30,x: j * 30, y: i * 30, globalZ:1});
					break;
				case 4: //y
					Crafty.e("2D, DOM,yellow, !c, !m, !w, !k")
						.attr({ w: 30, h:30,x: j * 30, y: i * 30, globalZ:1});
					break;
				case 5: //white
					Crafty.e("2D, DOM, white, !c, !m, !y, !k")
						.attr({ w: 30, h:30,x: j * 30, y: i * 30, globalZ:1});
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
		player = Crafty.e("Player")
						.attr({w:30, h:30, x: SX, y: SY, _globalZ:2, level:levelval})
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

Crafty.scene("level1", function() {
	Crafty.e("2D, DOM, Text")
		.attr({ w:200, h:20, x:150, y:120})
		.text("Press A and D to move left and right and W to jump")
		.css({"text-align":"center"});
	Crafty.e("2D, DOM, Text")
		.attr({ w:200, h:20, x:650, y:120})
		.text("Press G, H, J and K to change the background colors")
		.css({"text-align":"center"});
	Crafty.background("#ffffff");
	generateLevel(level1map,1);

	Crafty.viewport.x = 0;
});

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

Crafty.scene("level2", function() {
	Crafty.background("#ffffff");
	Crafty.e("2D, DOM, Text")
		.attr({ w:200, h:20, x:150, y:150})
		.text("Avoid those unnaccepting of your ways")
		.css({"text-align":"center"});
	generateLevel(level2map,2);

	Crafty.viewport.x = 0;
});

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

Crafty.scene("level3", function() {
	Crafty.background("#ffffff");
	generateLevel(level3map,3);

	Crafty.viewport.x = 0;
});
