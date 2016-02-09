TreeRings.GameLevel_4 = function(game) {
	this.game = game; // keep reference to main game object
	GameLevel.call(this, 4, 'game_bg');
	//GameLevel.call(this, 4, 'game_level_4_bg');
};

TreeRings.GameLevel_4.prototype = Object.create(GameLevel.prototype);
TreeRings.GameLevel_4.prototype.constructor = TreeRings.GameLevel_4;

TreeRings.GameLevel_4.prototype.create = function() {
	GameLevel.prototype.create.apply(this);
	this._buildLevel();
};

TreeRings.GameLevel_4.prototype._buildLevel = function() { 
	// Buttons for tree growth (Grow One Year or Remove One Year)
	this._createGrowthButtons();
	
	// Buttons for selecting moisture level (dry, normal or wet)
	this._createMoistureButtons();
		
	// Buttons for selecting temperature (cool, normal or warm)
	this._createTemperatureButtons();
		
	// Create trees - target and player's
	this._createTrees();
};

///////////
// Trees //
///////////

TreeRings.GameLevel_4.prototype._createTrees = function() {
	// Create trees - target and player's
        
	// Insert target tree ring pattern player should try to match
	this._targetTree = new Tree(this, 650, 250, 'right');   
	this._buildTargetTree();
	this.add.existing(this._targetTree);
	
	 
	// Create the player's tree that they will add rings to
	var baseRadius = 0;    
	this._playerTree = new Tree(this, 650, 250, 'left');
	this.add.existing(this._playerTree);
};

TreeRings.GameLevel_4.prototype._buildTargetTree = function() {
	// initiate the Target Tree
	this._targetTree.addRing('normal','wet'); // Year 1
	this._targetTree.addRing('normal','wet'); // Year 2
	this._targetTree.addRing('cool','dry'); // Year 3
	this._targetTree.addRing('cool','dry'); // Year 4
	this._targetTree.addRing('cool','dry'); // Year 5
	this._targetTree.addRing('cool','dry'); // Year 6
	this._targetTree.addRing('cool','dry'); // Year 7
	this._targetTree.addRing('cool','dry'); // Year 8
	this._targetTree.addRing('cool','dry'); // Year 9
	this._targetTree.addRing('cool','dry'); // Year 10
	this._targetTree.addRing('cool','dry'); // Year 11
	this._targetTree.addRing('cool','dry'); // Year 12
	this._targetTree.addRing('cool','dry'); // Year 13
	this._targetTree.addRing('cool','dry'); // Year 14
	this._targetTree.addRing('normal','wet'); // Year 15
};

////////////////////
// Growth Buttons //
////////////////////

TreeRings.GameLevel_4.prototype._createGrowthButtons = function() {
	// Create buttons for growing tree (add or remove rings)
        
	// Text for growing one year
	var style = { font: "24px Arial", fill: "#006600", align: "center" };
	var growText = this.add.text(50, 10, "Grow One Year", style);
	
	// Insert Grow One Year button
	var growBtn = this.add.button(150, 80, 'button_spritesheet', this._growRingListener, this, 2, 1, 0);
	growBtn.name = 'growButton';
	growBtn.anchor.setTo(0.5, 0.5); // anchored on the center of the button
	
	
    // Text for undo one year's growth
	//var style = { font: "24px Arial", fill: "#006600", align: "center" };
	var undoText = this.add.text(300, 10, "Remove One Year", style);
	
	// Insert undo One Year button
	var undoBtn = this.add.button(400, 80, 'button_spritesheet', this._undoRingListener, this, 2, 1, 0);
	undoBtn.name = 'undoButton';
	undoBtn.anchor.setTo(0.5, 0.5); // anchored on the center of the button
};

TreeRings.GameLevel_4.prototype._growRingListener = function() {
    this._playerTree.addRing(this.s_temperature, this.s_moisture);
};

TreeRings.GameLevel_4.prototype._undoRingListener = function() {
    //this.a_userTree.addRing(s_temperature, s_moisture);
	
	if(this._playerTree.getRings().length > 0){
    	this._playerTree.removeRing();
    };
	
	console.log('Remove one growth ring ' + this._playerTree.getRings().length);
};

//////////////////////
// Moisture Buttons //
//////////////////////

TreeRings.GameLevel_4.prototype._createMoistureButtons = function() {
	// Create buttons for selecting moisture level of dry, normal, or wet
	
	// Container for buttons
	moistureBtnGroup = this.add.sprite(60, 130);
	
	// Place three buttons on stage as sprites
	moistureBtnGroup.dryBtn = moistureBtnGroup.addChild(this.make.sprite(0, 0, 'moisture_btn_dry'));
	moistureBtnGroup.normalBtn = moistureBtnGroup.addChild(this.make.sprite(140, 0, 'moisture_btn_normal'));
	moistureBtnGroup.wetBtn = moistureBtnGroup.addChild(this.make.sprite(280, 0, 'moisture_btn_wet'));
	
	// Enable click/touch input
	moistureBtnGroup.dryBtn.inputEnabled = true;
	moistureBtnGroup.normalBtn.inputEnabled = true;
	moistureBtnGroup.wetBtn.inputEnabled = true;
	
	// Add listeners
	moistureBtnGroup.dryBtn.events.onInputDown.add(this._moistureBtnDryListener,this); // phaser events: http://phaser.io/docs/2.4.2/Phaser.Events.html
	moistureBtnGroup.normalBtn.events.onInputDown.add(this._moistureBtnNormalListener,this);
	moistureBtnGroup.wetBtn.events.onInputDown.add(this._moistureBtnWetListener,this);
	
	// Highlight for selected button (highlight for other two hidden at start)
	moistureBtnGroup.dryBtn.highlight = moistureBtnGroup.dryBtn.addChild(this.make.sprite(0, 0, 'moisture_btn_selected_highlight'));
	moistureBtnGroup.normalBtn.highlight = moistureBtnGroup.normalBtn.addChild(this.make.sprite(0, 0, 'moisture_btn_selected_highlight'));
	moistureBtnGroup.wetBtn.highlight = moistureBtnGroup.wetBtn.addChild(this.make.sprite(0, 0, 'moisture_btn_selected_highlight'));
	
	// "Normal" moisture selected at startup; hide highlights of dry and wet buttons
	this.s_moisture = 'normal';
	moistureBtnGroup.dryBtn.highlight.visible = false;
	moistureBtnGroup.wetBtn.highlight.visible = false;
};


TreeRings.GameLevel_4.prototype._moistureBtnDryListener = function(){
	this.s_moisture = 'dry';
	moistureBtnGroup.dryBtn.highlight.visible = true;
	moistureBtnGroup.normalBtn.highlight.visible = false;
	moistureBtnGroup.wetBtn.highlight.visible = false;
};

TreeRings.GameLevel_4.prototype._moistureBtnNormalListener = function(){
	this.s_moisture = 'normal';
	moistureBtnGroup.normalBtn.highlight.visible = true;
	moistureBtnGroup.dryBtn.highlight.visible = false;
	moistureBtnGroup.wetBtn.highlight.visible = false;
};
TreeRings.GameLevel_4.prototype._moistureBtnWetListener = function(){
	this.s_moisture = 'wet';
	moistureBtnGroup.wetBtn.highlight.visible = true;
	moistureBtnGroup.dryBtn.highlight.visible = false;
	moistureBtnGroup.normalBtn.highlight.visible = false;
};

/////////////////////////
// Temperature Buttons //
/////////////////////////


TreeRings.GameLevel_4.prototype._createTemperatureButtons = function() {
	// Create buttons for selecting temperature level of cool, normal, or warm
	
	// Container for buttons
	temperatureBtnGroup = this.add.sprite(60, 270);
	
	// Place three buttons on stage as sprites
	temperatureBtnGroup.coolBtn = temperatureBtnGroup.addChild(this.make.sprite(0, 0, 'temperature_btn_cool'));
	temperatureBtnGroup.normalBtn = temperatureBtnGroup.addChild(this.make.sprite(140, 0, 'temperature_btn_normal'));
	temperatureBtnGroup.warmBtn = temperatureBtnGroup.addChild(this.make.sprite(280, 0, 'temperature_btn_warm'));
	
	// Enable click/touch input
	temperatureBtnGroup.coolBtn.inputEnabled = true;
	temperatureBtnGroup.normalBtn.inputEnabled = true;
	temperatureBtnGroup.warmBtn.inputEnabled = true;
	
	// Add listeners
	temperatureBtnGroup.coolBtn.events.onInputDown.add(this._temperatureBtnCoolListener,this);
	temperatureBtnGroup.normalBtn.events.onInputDown.add(this._temperatureBtnNormalListener,this);
	temperatureBtnGroup.warmBtn.events.onInputDown.add(this._temperatureBtnWarmListener,this);
	
	// Highlight for selected button (highlight for other two hidden at start)
	temperatureBtnGroup.coolBtn.highlight = temperatureBtnGroup.coolBtn.addChild(this.make.sprite(0, 0, 'moisture_btn_selected_highlight'));
	temperatureBtnGroup.normalBtn.highlight = temperatureBtnGroup.normalBtn.addChild(this.make.sprite(0, 0, 'moisture_btn_selected_highlight'));
	temperatureBtnGroup.warmBtn.highlight = temperatureBtnGroup.warmBtn.addChild(this.make.sprite(0, 0, 'moisture_btn_selected_highlight'));
	
	// "Normal" temperature selected at startup; hide highlights of cool and warm buttons
	this.s_temperature = 'normal';
	temperatureBtnGroup.coolBtn.highlight.visible = false;
	temperatureBtnGroup.warmBtn.highlight.visible = false;
};


TreeRings.GameLevel_4.prototype._temperatureBtnCoolListener = function(){
	this.s_temperature = 'cool';
	temperatureBtnGroup.coolBtn.highlight.visible = true;
	temperatureBtnGroup.normalBtn.highlight.visible = false;
	temperatureBtnGroup.warmBtn.highlight.visible = false;
};

TreeRings.GameLevel_4.prototype._temperatureBtnNormalListener = function(){
	this.s_temperature = 'normal';
	temperatureBtnGroup.normalBtn.highlight.visible = true;
	temperatureBtnGroup.coolBtn.highlight.visible = false;
	temperatureBtnGroup.warmBtn.highlight.visible = false;
};

TreeRings.GameLevel_4.prototype._temperatureBtnWarmListener = function(){
	this.s_temperature = 'warm';
	temperatureBtnGroup.warmBtn.highlight.visible = true;
	temperatureBtnGroup.coolBtn.highlight.visible = false;
	temperatureBtnGroup.normalBtn.highlight.visible = false;
};