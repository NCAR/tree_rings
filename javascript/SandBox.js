TreeRings.SandBox = function(game) {
	this.game = game; // keep reference to main game object
};

TreeRings.SandBox.prototype.create = function() {
	this.buildLevel();
};

TreeRings.SandBox.prototype.buildLevel = function() {
	
	// Background image
	var sandboxBg = this.add.image(0, 0, 'sandbox_bg');
	sandboxBg.alpha = 0.8;
		
	// Draw something
	var circle1 = this.add.graphics(0,0);
	circle1.lineStyle(2, 0x663300, 1);
	circle1.beginFill(0xcc9900);
	circle1.drawCircle(600, 50, 60);
};