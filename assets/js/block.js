//not in use
Crafty.c("Block", {
	color: "black",
	init:function(){
		var keyDown = false;
		this.requires("2D, DOM, " + this.color +
			", solid, Colorer")
		//.bind('setColor', function(value) {
		//	this.color = value;
		//});
	}
});

Crafty.c("Colorer", {
	setColor: function(value) {
		this.color = value;
		return this;
	}
});