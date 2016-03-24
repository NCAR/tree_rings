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
	treeGrowthBtns.x = 210; treeGrowthBtns.y = 10;
	
	// Buttons for selecting moisture level (dry, normal or wet)
	var moistureBtns = new MoistureBtnGroup(this);
	moistureBtns.x = 10; moistureBtns.y = treeGrowthBtns.y + 120;
		
	// Buttons for selecting temperature (cool, normal or warm)
	var temperatureBtns = new TemperatureBtnGroup(this);
	temperatureBtns.x = moistureBtns.x; temperatureBtns.y = moistureBtns.y + 125;
		
	// Create trees - target and player's
	this._createTrees();
		
	// Create bar graph of player's climate choices history
	this._graph = new Graph(this);
	this._graph.x = 450; this._graph.y = 450;
};

///////////
// Trees //
///////////

TreeRings.GameLevel_4.prototype._createTrees = function() {
	// Create trees - target and player's
	var treeLoc = {x: 675, y: 225};
	
	// Target tree data from preloaded JSON file
	var targetTreeData = this._treesData["drought"];
        
	// Insert target tree ring pattern player should try to match
	this._targetTree = new Tree(this, treeLoc.x, treeLoc.y, 'right', targetTreeData);
	this.add.existing(this._targetTree);
	
	// Create the player's tree that they will add rings to
	var baseRadius = 0;
	var playerTreeData = new Array();
	this._playerTree = new Tree(this, treeLoc.x, treeLoc.y, 'left', playerTreeData);
	this.add.existing(this._playerTree);
};