TreeRings.GameLevel_3 = function(game) {
	this.game = game; // keep reference to main game object
	GameLevel.call(this, 3, 'game_bg');
};

TreeRings.GameLevel_3.prototype = Object.create(GameLevel.prototype);
TreeRings.GameLevel_3.prototype.constructor = TreeRings.GameLevel_3;

TreeRings.GameLevel_3.prototype.create = function() {
	GameLevel.prototype.create.apply(this);
	this._buildLevel();
};

TreeRings.GameLevel_3.prototype._buildLevel = function() { 
	// Buttons for tree growth (Grow One Year or Remove One Year)
	var treeGrowthBtns = new TreeGrowthBtnGroup(this);
	treeGrowthBtns.x = 260; treeGrowthBtns.y = 10;
	
	// Buttons for selecting moisture level (dry, normal or wet)
	var moistureBtns = new MoistureBtnGroup(this);
	moistureBtns.x = 60; moistureBtns.y = treeGrowthBtns.y + 120;
		
	// Buttons for selecting temperature (cool, normal or warm)
	var temperatureBtns = new TemperatureBtnGroup(this);
	temperatureBtns.x = moistureBtns.x; temperatureBtns.y = moistureBtns.y + 125;
		
	// Create trees - target and player's
	this._createTrees();
		
	// Create bar graph of player's climate choices history
	this._graph = new Graph(this);
	this._graph.x = 500; this._graph.y = 10;
};

///////////
// Trees //
///////////

TreeRings.GameLevel_3.prototype._createTrees = function() {
	// Create trees - target and player's
	
	// Target tree data from preloaded JSON file
	var targetTreeData = this._treesData["allClimates"];
        
	// Insert target tree ring pattern player should try to match
	this._targetTree = new Tree(this, 650, 250, 'right', targetTreeData);
	this.add.existing(this._targetTree);
	
	// Create the player's tree that they will add rings to
	var baseRadius = 0;
	var playerTreeData = new Array();
	this._playerTree = new Tree(this, 650, 250, 'left', playerTreeData);
	this.add.existing(this._playerTree);
};