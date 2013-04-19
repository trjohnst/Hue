Crafty.c("Player", {
	sprite:"player",
	speed:20,
	active_color: '!w',
	inactive_color: 'white',
	colliding_with_inactive: false,
	color_change: false,
	level: 1,
	c_key: 0,
	m_key: 0,
	y_key: 0,
	w_key: 0,
	init:function(){
		this._active = true;
		this.active_color = '!w';
		this.requires("2D,Canvas,"+this.sprite
			+ ",Twoway,Collision,Gravity")
		.bind('Moved', function(from) {
			//if(this.x+this.w > Crafty.viewport.width) ||
			//	this.x+this.w < this.w ||
			//	this.y+this.h < this.h ||
			//	this.y+this.h > Crafty.viewport.height) {
			//	this.attr({x:from.x, y:from.y});
			//}

			if(this.hit(this.active_color) || this.hit('black')) {
				this.attr({x:from.x, y: from.y});
			}
		})
		.bind("KeyUp", function(e) {
			switch(e.keyCode) {
				case this.c_key: //c
					this.changeColor('!c', 'cyan',"#00aef0");
					this.color_change = true;
					break;
				case this.m_key:	//m
					this.changeColor('!m', 'magenta', "#ed008c");
					this.color_change = true;
					break;
				case this.y_key: //y
					this.changeColor('!y', 'yellow', "#fff200");
					this.color_change = true;
					break;
				case this.w_key: //w
					this.changeColor('!w', 'white', "#ffffff");
					this.color_change = true;
					break;
				case 48: //level changing
				case 49:
				case 50:
				case 51:
					this.level = e.keyCode - 48;
					currentLevel = this.level;
					Crafty.scene('play');
					this.destroy();
					break;

			}
		})
		.bind("EnterFrame", function(frame) {
			if(frame.frame%4 == 0) {
				var cols = this.hit(this.active_color);
				if(cols /*&& cols[0].overlap > 4*/) {
					// console.log(cols[0].overlap);
					this.x = SX;
					this.y = SY;
					Crafty.viewport.x = 0;

					//reset color
					this.changeColor('!w','white',"#ffffff");
				}
			} else if(frame.frame%8) {
				if(this.hit('transition')) {	
					if(++this.level > MAX_LEVELS) {
						currentLevel = 1;
						changeScene('main', 'play');
					} else {
						currentLevel++;
						changeScene('play', 'play');
					}
				}
			}

			// if(this.color_change && this.hit(this.inactive_color)) {
			// 	this.x = SX;
			// 	this.y = SY;
			// 	Crafty.viewport.x = 0;
			// } else {
			// 	this.color_change = false;
			// }
		});
		return this;
	},
	reset:function(){
		this.x = SX;
		this.y = SY;
		this.sprite = "player";
		this.speed = 2;
		this.antigravity(active_color);
		this.active_color = '!w';
		this.gravity(active_color);
		this.inactive_color = 'white';
	},
	changeColor:function(active, inactive, background) {
		Crafty.background(background);
		this.antigravity(this.active_color);
		this.active_color = active;
		this.gravity(this.active_color);
		this.inactive_color = inactive;
	}
});