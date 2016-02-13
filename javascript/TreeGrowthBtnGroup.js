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
	var growText = this.game.add.text(50, 10, "Grow One Year", style, this);
	//var growText = new Text(50, 10, "Grow 1 Year", style);
	//var growText = this.add.text(50, 10, "Grow 1 Year", style);
	
	// Insert Grow One Year button
	//var growBtn = new Button(this.game, 150, 80, 'button_spritesheet', this._growRingListener, this, 2, 1, 0);
	var growBtn = this.game.add.button(150, 80, 'button_spritesheet', this._growRingListener, this, 2, 1, 0);
	growBtn.name = 'growButton';
	growBtn.anchor.setTo(0.5, 0.5); // anchored on the center of the button
	this.add(growBtn);
	
    // Text for undo one year's growth
	var undoText = this.game.add.text(300, 10, "Remove One Year", style, this);
	
	// Insert undo One Year button
	var undoBtn = this.game.add.button(400, 80, 'button_spritesheet', this._undoRingListener, this, 2, 1, 0);
	undoBtn.name = 'undoButton';
	undoBtn.anchor.setTo(0.5, 0.5); // anchored on the center of the button
	this.add(undoBtn);
};



TreeGrowthBtnGroup.prototype._growRingListener = function() {
    //parent._playerTree.addRing(this.s_temperature, this.s_moisture);
	//console.log(this);
	//console.log(this.game.key);
	this.game._playerTree.addRing(this.game.s_temperature, this.game.s_moisture);
};

TreeGrowthBtnGroup.prototype._undoRingListener = function() {
    if(this.game._playerTree.getRings().length > 0){
    	this.game._playerTree.removeRing();
    };
};