Crafty.c("Player", {
	sprite:"player",
	speed:20,
	effects: {},
	isOnGround: true,
	active: '!w',
	level: 1,
	//jumpkey:Crafty.keys.UP_ARROW,
	init:function(){
		var keyDown = false;
		this.active = '!w';
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
				Crafty.scene("level" + (++this.level));
			}
			if(this.hit('edge') || this.hit(this.active)) {
				this.attr({x:from.x, y: from.y});
			}
		})
		.bind("KeyDown", function(e) {
			if(e.keyCode === Crafty.keys.W) {
				keyDown = true;
			}
			switch(e.keyCode) {
				case Crafty.keys.G: //c
					Crafty.background("#00aef0");
					this.active = '!c';
					//this.gravity('!c');
					break;
				case Crafty.keys.H:	//M
					Crafty.background("#ed008c");
					this.active = '!m';
					//this.gravity('!m');
					break;
				case Crafty.keys.J: //Y
					Crafty.background("#fff200");
					this.active = '!y';
					//this.gravity('!y');
					break;
				case Crafty.keys.K: //W
					Crafty.background("#ffffff");
					this.active = '!w';
					//this.gravity('!w');
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
		this.sprite = "player";
		this.speed = 2;
		this.active = '!w';
	}

});