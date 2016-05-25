TreeRings.GameLevel_2 = function (game) {
    this.game = game; // keep reference to main game object
    GameLevel.call(this, 2, 'game_bg');
};

TreeRings.GameLevel_2.prototype = Object.create(GameLevel.prototype);
TreeRings.GameLevel_2.prototype.constructor = TreeRings.GameLevel_2;

TreeRings.GameLevel_2.prototype.create = function () {
    GameLevel.prototype.create.apply(this);
    this._buildLevel();
    this._initGraph();
};
TreeRings.GameLevel_2.prototype._initGraph = function () {
    var width = 500;
    var height = 160;
    var margin = {
        top: 40,
        right: 20,
        bottom: 30,
        left: 70
    };
    var labels = {
        x: "Year",
        y1: "Temperature"
    };
    var colors = {
        y1: '#ff3333'
    };
    var init = {
        type: "t",
        labels: labels,
        colors: colors,
        margin: margin
    }
    this.D3Bar = new D3GroupedBar(width, height, init);
}

TreeRings.GameLevel_2.prototype._buildLevel = function () {
    // Buttons for tree growth (Grow One Year or Remove One Year)
    var treeGrowthBtns = new TreeGrowthBtnGroup(this);
    treeGrowthBtns.x = 210;
    treeGrowthBtns.y = 10;

    // Buttons for selecting moisture level (dry, normal or wet)
    //var moistureBtns = new MoistureBtnGroup(this);
    //moistureBtns.x = 60; moistureBtns.y = treeGrowthBtns.y + 120;
    this.setClimate('moisture', 'normal');

    // Buttons for selecting temperature (cool, normal or warm)
    var temperatureBtns = new TemperatureBtnGroup(this);
    //temperatureBtns.x = 60; temperatureBtns.y = treeGrowthBtns.y + 120;
    temperatureBtns.x = 10;
    temperatureBtns.y = treeGrowthBtns.y + 120;

    // Create trees - target and player's
    this._createTrees();

    // Create bar graph of player's climate choices history
    // Sharon commented out on 4-6-2016 for D3 Graph
    //this._graph = new Graph(this);
    //this._graph.x = 450; this._graph.y = 450;
};

///////////
// Trees //
///////////

TreeRings.GameLevel_2.prototype._createTrees = function () {
    // Create trees - target and player's
    var treeLoc = {
        x: 675,
        y: 225
    };

    // Target tree data from preloaded JSON file
    var targetTreeData = this._treesData["temperatureOnly"];

    // Insert target tree ring pattern player should try to match
    this._targetTree = new Tree(this, treeLoc.x, treeLoc.y, 'right', targetTreeData);
    this.add.existing(this._targetTree);

    // Create the player's tree that they will add rings to
    var baseRadius = 0;
    var playerTreeData = new Array();
    this._playerTree = new Tree(this, treeLoc.x, treeLoc.y, 'left', playerTreeData);
    this.add.existing(this._playerTree);
};