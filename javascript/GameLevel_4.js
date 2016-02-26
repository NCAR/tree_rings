TreeRings.GameLevel_4 = function(game) {
	this.game = game; // keep reference to main game object
	GameLevel.call(this, 4, 'game_bg');
};

TreeRings.GameLevel_4.prototype = Object.create(GameLevel.prototype);
TreeRings.GameLevel_4.prototype.constructor = TreeRings.GameLevel_4;

TreeRings.GameLevel_4.prototype.create = function() {
	GameLevel.prototype.create.apply(this);
	this._buildLevel();
};

TreeRings.GameLevel_4.prototype._buildLevel = function() { 
	// Buttons for tree growth (Grow One Year or Remove One Year)
	var treeGrowthBtns = new TreeGrowthBtnGroup(this);
	treeGrowthBtns.x = 260; treeGrowthBtns.y = 10;
	
	// Buttons for selecting moisture level (dry, normal or wet)
	var moistureBtns = new MoistureBtnGroup(this);
	moistureBtns.x = 60; moistureBtns.y = treeGrowthBtns.y + 120;
		
	// Buttons for selecting temperature (cool, normal or warm)
	var temperatureBtns = new TemperatureBtnGroup(this);
	temperatureBtns.x = moistureBtns.x; temperatureBtns.y = moistureBtns.y + 125;
	//this._createTemperatureButtons();
		
	// Create trees - target and player's
	this._createTrees();
		
	// Create bar graph of player's climate choices history
	this._graph = new Graph(this);
	this._graph.x = 500;
	//this.add.existing(this._graph);
	//var graph = new Graph(this);
};

///////////
// Trees //
///////////

TreeRings.GameLevel_4.prototype._createTrees = function() {
	// Create trees - target and player's
	
	// Target tree data from preloaded JSON file
	var targetTreeData = this._treesData["drought"];
        
	// Insert target tree ring pattern player should try to match
	this._targetTree = new Tree(this, 650, 250, 'right', targetTreeData);
	this.add.existing(this._targetTree);
	
	// Create the player's tree that they will add rings to
	var baseRadius = 0;
	var playerTreeData = new Array();
	this._playerTree = new Tree(this, 650, 250, 'left', playerTreeData);
	this.add.existing(this._playerTree);
};

/////////////////////////
// Temperature Buttons //
/////////////////////////


/*TreeRings.GameLevel_4.prototype._createTemperatureButtons = function() {
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
};*/