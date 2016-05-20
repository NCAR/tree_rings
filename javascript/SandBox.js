TreeRings.SandBox = function(game) {
	this.game = game; // keep reference to main game object
	
	this._creditsBtn;
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
	
	// Credits button and dialog box
	this._initCredits();
};

/////////////
// Credits //
/////////////

TreeRings.SandBox.prototype._initCredits = function() {
	var xLoc = 10;
	var yLoc = 200;
	//var xLoc = this._helpBtn.x + this._helpBtn.width + 10;
	this._creditsBtn = this.add.button(xLoc, yLoc, 'credits_btn_spritesheet', this._showCredits, this, 2, 1, 0);
	this._creditsBtn.name = 'creditsBtn';
};

TreeRings.SandBox.prototype._showCredits = function(pointer) {
    //this._drawDialog('credits');
	console.log("Credits");
};