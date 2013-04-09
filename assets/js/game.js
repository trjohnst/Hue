var player,
	H = 360,
	W = 600,
	HW = W / 2,
	HH = H /2,
	LW = 0,
	LH = 0,
	UW = 30, //unit width (size of blocks)
	UH = 30, //unit height
	SX = 0, //start x for player
	SY = 0, //start y for player
	currentLevel = 1,
	MAX_LEVELS = 3,
	c_key = Crafty.keys.H,
	m_key = Crafty.keys.J,
	y_key = Crafty.keys.K,
	w_key = Crafty.keys.L;

$(document).ready(function() {
	//init crafty
	Crafty.init(W,H);
	//init canvas
	Crafty.canvas.init();
	//set canvas zIndex
	Crafty.canvas._canvas.style.zIndex = '1';

	$('#play').bind('click',function(){
        changeScene('play', 'main');
    });

	//go to loading scene
	Crafty.scene("loading");
});