// Tree Growth Button Group object/class
// Parameters: game instance
TreeGrowthBtnGroup = function(game) {
    Phaser.Group.call(this, game);
	this.game = game;
	this._init();
};

TreeGrowthBtnGroup.prototype = Object.create(Phaser.Group.prototype);
TreeGrowthBtnGroup.prototype.constructor = TreeGrowthBtnGroup;

// Initialize
TreeGrowthBtnGroup.prototype._init = function() {
    // Text for growing one year
	var style = { font: "24px Arial", fill: "#006600", align: "center" };
	var growText = this.game.add.text(0, 0, "Grow One Year", style, this);
	growText.anchor.setTo(0.5, 0.5);
	//var growText = this.game.add.text(50, 10, "Grow One Year", style, this);
	
	// Insert Grow One Year button
	var growBtn = this.game.add.button(0, 0, 'button_spritesheet', this._growRingListener, this, 2, 1, 0);
	//var growBtn = this.game.add.button(100, growText.x + 70, 'button_spritesheet', this._growRingListener, this, 2, 1, 0);
	//var growBtn = this.game.add.button(150, 80, 'button_spritesheet', this._growRingListener, this, 2, 1, 0);
	growBtn.name = 'growButton';
	growBtn.anchor.setTo(0.5, 0.5); // anchored on the center of the button
	this.add(growBtn);
	
    // Text for undo one year's growth
	var undoText = this.game.add.text(0, 0, "Remove One Year", style, this);
	undoText.anchor.setTo(0.5, 0.5);
	//var undoText = this.game.add.text(growText.x + 250, growText.y, "Remove One Year", style, this);
	//var undoText = this.game.add.text(300, 10, "Remove One Year", style, this);
	
	// Insert undo One Year button
	var undoBtn = this.game.add.button(0, 0, 'button_spritesheet', this._undoRingListener, this, 2, 1, 0);
	//var undoBtn = this.game.add.button(undoText.x + 50, growBtn.y, 'button_spritesheet', this._undoRingListener, this, 2, 1, 0);
	//var undoBtn = this.game.add.button(400, 80, 'button_spritesheet', this._undoRingListener, this, 2, 1, 0);
	undoBtn.name = 'undoButton';
	undoBtn.anchor.setTo(0.5, 0.5); // anchored on the center of the button
	this.add(undoBtn);
	
	// Position buttons and text
	var centerMargin = 20; // Spacing between left and right button/text
	var xOffset = (growBtn.width + centerMargin)/2;
	var textBtnSpacing = 1.5 * growText.height + 20;
	
	growText.x = -xOffset; growText.y = growText.height/2;
	growBtn.x = -xOffset; growBtn.y = textBtnSpacing;
	undoText.x = xOffset; undoText.y = growText.height/2;
	undoBtn.x = xOffset; undoBtn.y = textBtnSpacing;
};



TreeGrowthBtnGroup.prototype._growRingListener = function() {
	this.game.addRing();
};

TreeGrowthBtnGroup.prototype._undoRingListener = function() {
	this.game.removeRing();
};