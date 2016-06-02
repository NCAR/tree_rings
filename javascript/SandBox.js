TreeRings.SandBox = function(game) {
	this.game = game; // keep reference to main game object
	
	this._currentLevel = 0;
	
	this._helpBtn;
	this._helpDialogBox;
	
	this._creditsBtn;
	this._creditsDialogBox;
};

TreeRings.SandBox.prototype.create = function() {
	this.buildLevel();
};

TreeRings.SandBox.prototype.buildLevel = function() {
	
	// Background image
	var sandboxBg = this.add.image(0, 0, 'sandbox_bg');
	sandboxBg.alpha = 0.8;
		
	// Draw something
	//var circle1 = this.add.graphics(0,0);
	//circle1.lineStyle(2, 0x663300, 1);
	//circle1.beginFill(0xcc9900);
	//circle1.drawCircle(600, 50, 60);
	
	// Help/instructions button and dialog box
	this._initHelp();
	
	// Credits button and dialog box
	this._initCredits();
};

//////////
// Help //
//////////

TreeRings.SandBox.prototype._initHelp = function() {
    // help button using parent DialogBox class
	var xLoc = 10;
	this._helpBtn = this.add.button(xLoc, this.game.height - 60, 'help_btn_spritesheet', this._toggleHelp, this, 2, 1, 0);
	this._helpBtn.name = 'helpBtn';
	
	// Help dialog box
	this._helpDialogBox = new HelpDialog(this);
	this._helpDialogBox.visible = false;
};

TreeRings.SandBox.prototype._toggleHelp = function(pointer) {
	this._creditsDialogBox.visible = false;
	
    if (this._helpDialogBox.visible) {
		this._helpDialogBox.visible = false;
	} else {
		this._helpDialogBox.visible = true;
	}
};

/////////////
// Credits //
/////////////

TreeRings.SandBox.prototype._initCredits = function() {
	// Credits button
	var xLoc = this._helpBtn.x + this._helpBtn.width + 10;;
	var yLoc = this._helpBtn.y;
	//var xLoc = this._helpBtn.x + this._helpBtn.width + 10;
	this._creditsBtn = this.add.button(xLoc, yLoc, 'credits_btn_spritesheet', this._toggleCredits, this, 2, 1, 0);
	this._creditsBtn.name = 'creditsBtn';
	
	// Credits dialog box
	this._creditsDialogBox = new CreditsDialog(this);
	this._creditsDialogBox.visible = false;
};

TreeRings.SandBox.prototype._toggleCredits = function(pointer) {
	this._helpDialogBox.visible = false;
	
	if (this._creditsDialogBox.visible) {
		this._creditsDialogBox.visible = false;
	} else {
		this._creditsDialogBox.visible = true;
	}
};