Crafty.c("Player", {
	sprite:"player",
	speed:20,
	effects: {},
	isOnGround: true,
	active_color: '!w',
	inactive_color: 'w',
	colliding_with_inactive: false,
	color_change: false,
	level: 1,
	init:function(){
		var keyDown = false;

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
			if(this.hit('transition')) {
				if(++this.level > MAX_LEVELS) {
					
					Crafty.scene('main');
				} else {
					Crafty.scene("level" + (this.level));
				}

			}

			if(this.hit('edge') || this.hit(this.active_color)) {
				this.attr({x:from.x, y: from.y});
			}

			// if(this.color_change && this.hit(this.inactive_color)) {
			// 	this.x = SX;
			// 	this.y = SY;
			// 	Crafty.viewport.x = 0;
			// } else {
			// 	this.color_change = false;
			// }
		})
		.bind("KeyUp", function(e) {
			if(e.keyCode === Crafty.keys.W) {
				keyDown = true;
			}
			switch(e.keyCode) {
				case Crafty.keys.G: //c
					Crafty.background("#00aef0");
					this.antigravity(this.active_color);
					this.active_color = '!c';
					this.gravity(this.active_color);
					this.inactive_color = 'c';
					this.color_change = true;
					break;
				case Crafty.keys.H:	//M
					Crafty.background("#ed008c");
					this.antigravity(this.active_color);
					this.active_color = '!m';
					this.gravity(this.active_color);
					this.inactive_color = 'm';
					this.color_change = true;
					break;
				case Crafty.keys.J: //Y
					Crafty.background("#fff200");
					this.antigravity(this.active_color);
					this.active_color = '!y';
					this.gravity(this.active_color);
					this.inactive_color = 'y';
					this.color_change = true;
					break;
				case Crafty.keys.K: //W
					Crafty.background("#ffffff");
					this.antigravity(this.active_color);
					this.active_color = '!w';
					this.gravity(this.active_color);
					this.inactive_color = 'w';
					this.color_change = true;
					break;
				case 49:
					Crafty.scene("level1");
					this.destroy();
					break;
				case 50:
					Crafty.scene("level2");
					this.destroy();
					break;
				case 51:
					Crafty.scene("level3");
					this.destroy();
					break;

			}
		})
		.bind("KeyUp", function(e) {
			
		})
		.bind("EnterFrame", function(frame) {
		});
		//.reset();
		return this;
	},
	reset:function(){
		this.x = SX;
		this.y = SY;
		this.sprite = "player";
		this.speed = 2;
		this.antigravity(active_color);
		this.gravity(active_color);
		this.active_color = '!w';
		this.inactive_color = 'w';
	}

});