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

window.onload = function() {
	//init crafty
	Crafty.init(W,H);
	//init canvas
	Crafty.canvas.init();
	//set canvas zIndex
	Crafty.canvas._canvas.style.zIndex = '1';

	//setup on click events for buttons
	$('#play-btn').on('click',function(){
        changeScene('play', 'main');
    });
	$('#inst-btn').on('click', function() {
		changeScene('instructions', 'main');
	});
	$('#lvsl-btn').on('click', function() {

	});
	$('#cred-btn').on('click', function() {

	});

	//setup on click events for back buttons
	$('#instback-btn').bind('click',function(){
    	changeScene('main', 'instructions');
    });

    game_path = location.href.lastIndexOf("/") !== -1 ? location.href.substring(0,location.href.lastIndexOf("/") + 1) : location.href;

	//go to loading scene
	Crafty.scene("loading");
};