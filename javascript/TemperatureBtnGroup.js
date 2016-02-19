// Temperature Button Group object/class
// Parameters: game instance
TemperatureBtnGroup = function(game) {
    Phaser.Group.call(this, game);
	this.game = game;
	
	this._coolBtn;
	this._normalBtn;
	this._warmBtn;
	
	this._init();
};

TemperatureBtnGroup.prototype = Object.create(Phaser.Group.prototype);
TemperatureBtnGroup.prototype.constructor = TemperatureBtnGroup;

// Initialize
TemperatureBtnGroup.prototype._init = function() {
    // Place three buttons on stage as sprites
	this._coolBtn = this.game.add.sprite(0, 0, 'temperature_btn_cool');
	this._normalBtn = this.game.add.sprite(140, 0, 'temperature_btn_normal');
	this._warmBtn = this.game.add.sprite(280, 0, 'temperature_btn_warm');
	
	// Add buttons to group
	this.add(this._coolBtn);
	this.add(this._normalBtn);
	this.add(this._warmBtn);
	
	// Enable click/touch input
	this._coolBtn.inputEnabled = true;
	this._normalBtn.inputEnabled = true;
	this._warmBtn.inputEnabled = true;
	
	// Add listeners
	this._coolBtn.events.onInputDown.add(this._temperatureBtnCoolListener,this); 
	this._normalBtn.events.onInputDown.add(this._temperatureBtnNormalListener,this);
	this._warmBtn.events.onInputDown.add(this._temperatureBtnWarmListener,this);
	
	// Highlight for selected button (highlight for other two hidden at start)
	this._coolBtn.highlight = this._coolBtn.addChild(this.game.make.sprite(0, 0, 'moisture_btn_selected_highlight'));
	this._normalBtn.highlight = this._normalBtn.addChild(this.game.make.sprite(0, 0, 'moisture_btn_selected_highlight'));
	this._warmBtn.highlight = this._warmBtn.addChild(this.game.make.sprite(0, 0, 'moisture_btn_selected_highlight'));
	
	// "Normal" moisture selected at startup; hide highlights of dry and wet buttons
	this.game.setClimate('temperature', 'normal');
	this._coolBtn.highlight.visible = false;
	this._warmBtn.highlight.visible = false;
};

TemperatureBtnGroup.prototype._temperatureBtnCoolListener = function(){
	this.game.setClimate('temperature', 'cool');
	this._coolBtn.highlight.visible = true;
	this._normalBtn.highlight.visible = false;
	this._warmBtn.highlight.visible = false;
};

TemperatureBtnGroup.prototype._temperatureBtnNormalListener = function(){
	this.game.setClimate('temperature', 'normal');
	this._normalBtn.highlight.visible = true;
	this._coolBtn.highlight.visible = false;
	this._warmBtn.highlight.visible = false;
};

TemperatureBtnGroup.prototype._temperatureBtnWarmListener = function(){
	this.game.setClimate('temperature', 'warm');
	this._warmBtn.highlight.visible = true;
	this._coolBtn.highlight.visible = false;
	this._normalBtn.highlight.visible = false;
};