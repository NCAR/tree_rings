// Moisture Button Group object/class
// Parameters: game instance
MoistureBtnGroup = function(game) {
    Phaser.Group.call(this, game);
	this.game = game;
	
	this._dryBtn;
	this._normalBtn;
	this._wetBtn;
	
	this._init();
};

MoistureBtnGroup.prototype = Object.create(Phaser.Group.prototype);
MoistureBtnGroup.prototype.constructor = MoistureBtnGroup;

// Initialize
MoistureBtnGroup.prototype._init = function() {
    // Place three buttons on stage as sprites
	this._dryBtn = this.game.add.sprite(0, 0, 'moisture_btn_dry');
	this._normalBtn = this.game.add.sprite(140, 0, 'moisture_btn_normal');
	this._wetBtn = this.game.add.sprite(280, 0, 'moisture_btn_wet');
	
	// Add buttons to group
	this.add(this._dryBtn);
	this.add(this._normalBtn);
	this.add(this._wetBtn);
	
	// Enable click/touch input
	this._dryBtn.inputEnabled = true;
	this._normalBtn.inputEnabled = true;
	this._wetBtn.inputEnabled = true;
	
	// Add listeners
	this._dryBtn.events.onInputDown.add(this._moistureBtnDryListener,this); 
	this._normalBtn.events.onInputDown.add(this._moistureBtnNormalListener,this);
	this._wetBtn.events.onInputDown.add(this._moistureBtnWetListener,this);	
	
	// Highlight for selected button (highlight for other two hidden at start)
	this._dryBtn.highlight = this._dryBtn.addChild(this.game.make.sprite(0, 0, 'moisture_btn_selected_highlight'));
	this._normalBtn.highlight = this._normalBtn.addChild(this.game.make.sprite(0, 0, 'moisture_btn_selected_highlight'));
	this._wetBtn.highlight = this._wetBtn.addChild(this.game.make.sprite(0, 0, 'moisture_btn_selected_highlight'));
	
	// "Normal" moisture selected at startup; hide highlights of dry and wet buttons
	this.game.setClimate('moisture', 'normal');
	//this.s_moisture = 'normal';
	this._dryBtn.highlight.visible = false;
	this._wetBtn.highlight.visible = false;
};

MoistureBtnGroup.prototype._moistureBtnDryListener = function(){
	this.game.setClimate('moisture', 'dry');
	this._dryBtn.highlight.visible = true;
	this._normalBtn.highlight.visible = false;
	this._wetBtn.highlight.visible = false;
};

MoistureBtnGroup.prototype._moistureBtnNormalListener = function(){
	this.game.setClimate('moisture', 'normal');
	this._normalBtn.highlight.visible = true;
	this._dryBtn.highlight.visible = false;
	this._wetBtn.highlight.visible = false;
};

MoistureBtnGroup.prototype._moistureBtnWetListener = function(){
	this.game.setClimate('moisture', 'wet');
	this._wetBtn.highlight.visible = true;
	this._dryBtn.highlight.visible = false;
	this._normalBtn.highlight.visible = false;
};