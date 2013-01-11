Crafty.c("Player", {
	sprite:"player",
	speed:20,
	active_color: '!w',
	inactive_color: 'white',
	colliding_with_inactive: false,
	color_change: false,
	level: 1,
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
				case Crafty.keys.H: //c
					Crafty.background("#00aef0");
					this.antigravity(this.active_color);
					this.active_color = '!c';
					this.gravity(this.active_color);
					this.inactive_color = 'cyan';
					this.color_change = true;
					break;
				case Crafty.keys.J:	//M
					Crafty.background("#ed008c");
					this.antigravity(this.active_color);
					this.active_color = '!m';
					this.gravity(this.active_color);
					this.inactive_color = 'magenta';
					this.color_change = true;
					break;
				case Crafty.keys.K: //Y
					Crafty.background("#fff200");
					this.antigravity(this.active_color);
					this.active_color = '!y';
					this.gravity(this.active_color);
					this.inactive_color = 'yellow';
					this.color_change = true;
					break;
				case Crafty.keys.L: //W
					Crafty.background("#ffffff");
					this.antigravity(this.active_color);
					this.active_color = '!w';
					this.gravity(this.active_color);
					this.inactive_color = 'white';
					this.color_change = true;
					break;
				case 49:
					this.level = 1;
					Crafty.scene("level1");
					this.destroy();
					break;
				case 50:
					this.level = 2;
					Crafty.scene("level2");
					this.destroy();
					break;
				case 51:
					this.level = 3;
					Crafty.scene("level3");
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

					//reset color - not working
					Crafty.background("#ffffff");
					this.antigravity(this.active_color);
					this.active_color = '!w';
					this.gravity(this.active_color);
					this.inactive_color = 'white';
				}
			} else if(frame.frame%8) {
				if(this.hit('transition')) {	
					if(++this.level > MAX_LEVELS) {
						Crafty.scene('main');
					} else {
						Crafty.scene("level" + (this.level));
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
		this.inactive_color = 'white';
	}

});