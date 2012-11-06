Crafty.scene("loading", function() {
	//after load go to main scene (menu)
	Crafty.load(["assets/images/strip.png"], function () {
		Crafty.scene("main");
	});

	Crafty.background("#000");
	Crafty.e("2D, DOM, Text")
		.attr({ w:100, h:20, x:150, y:120})
		.text("Loading")
		.css({"text-align":"center"});
});

Crafty.scene("main", function() {
	Crafty.background("#cccccc");
	Crafty.e("2D, DOM, Text")
		.attr({ w:100, h:20, x:150, y:120})
		.text("Press Space to Play (WASD to move)")
		.css({"text-align":"center"})
		.bind("KeyDown", function(e) {
			if(e.keyCode === Crafty.keys.SPACE)
				Crafty.scene("level1");
		});
		//.bind("onclick", Crafty.scene("level1"));
});

var player;

function generateLevel(levelptr) {
	for(var i = 0; i < levelptr.length;i++) {
		for(var j = 0; j < levelptr[0].length; j++) {
			switch(levelptr[i][j]) {
				case 0: //none
					break;
				case 1: //k
					//Crafty.e("Block")
					//	.attr({ w: 30, h:30,x: j * 30, y: i * 30, z:1})
					//	.setColor('black');
					Crafty.e("2D, DOM, black, solid, !c, !m, !y, !w")
						.attr({ w: 30, h:30,x: j * 30, y: i * 30, z:1});
					break;
				case 2: //c
					Crafty.e("2D, DOM, cyan, solid, !m, !y, !w, !k")
						.attr({ w: 30, h:30,x: j * 30, y: i * 30, z:1});
					break;
				case 3: //m
					Crafty.e("2D, DOM, magenta, solid, !c, !y, !w, !k")
						.attr({ w: 30, h:30,x: j * 30, y: i * 30, z:1});
					break;
				case 4: //y
					Crafty.e("2D, DOM, yellow, solid, !c, !m, !w, !k")
						.attr({ w: 30, h:30,x: j * 30, y: i * 30, z:1});
					break;
				case 5: //white
					Crafty.e("2D, DOM, white, solid, !c, !m, !y, !k")
						.attr({ w: 30, h:30,x: j * 30, y: i * 30, z:1});
					break;
				case 6: //player
					player = Crafty.e("Player")
						.attr({w:30, h:30, x: j * 30, y: i * 30, z:0})
						.twoway(3,5)
						.gravity('solid');
					break;
				case 7: //world edge
					Crafty.e("2D, DOM, black, solid, edge, !c, !m, !y, !k,!w")
						.attr({ w: 30, h:30,x: j * 30, y: i * 30, z:1});
					break;
				case 8: //transition
					Crafty.e("2D, DOM,solid, transition")
						.attr({ w: 30, h:30,x: j * 30, y: i * 30, z:1});
					break;
			}
		}
	}
}

var level1map = [
	[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
	[7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
	[7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
	[7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
	[7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
	[7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
	[7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,7],
	[7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,7],
	[7,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,8,7],
	[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7]
];

Crafty.scene("level1", function() {
	Crafty.e("2D, DOM, Text")
		.attr({ w:200, h:20, x:150, y:120})
		.text("Press G, H, J and K to change the background colors")
		.css({"text-align":"center"});
	Crafty.background("#ffffff");
	generateLevel(level1map);
});

var level2map = [
	[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
	[7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
	[7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
	[7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
	[7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
	[7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
	[7,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
	[7,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
	[7,0,6,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
	[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7]
];

Crafty.scene("level2", function() {
	Crafty.background("#ffffff");
	generateLevel(level2map);
});