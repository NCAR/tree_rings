// GameLevel object - Parent for all specific game level children (e.g. GameLevel_1, GameLevel_2, etc.)

GameLevel = function (currentGameLevel, sBgImage) {
    this._currentLevel = currentGameLevel;
    this._sBgImage = sBgImage;

    this._quitBtn;
    this._helpBtn;
	this._helpDialogBox;
    this._creditsBtn;
	this._creditsDialogBox;

    this.sMoisture;
    this.sTemperature = 'normal';
};

GameLevel.prototype.create = function () {
    this.add.image(0, 0, this._sBgImage);

    this._initHelp();
    //this._initInstructions();
    this._initCredits();
    this._initQuitLevel();
    this._initScoring();
};

GameLevel.prototype.preload = function () {
    // load the JSON data files for Instructions & Credits dialog boxes and tree ring data
    this._dialog = this.cache.getJSON('dialog');
    this._treesData = this.cache.getJSON('treesData');
};

/////////////////////
// Current Climate //
/////////////////////

GameLevel.prototype.setClimate = function (climate, state) {
    if (climate == 'moisture') {
        this.sMoisture = state;
    } else {
        this.sTemperature = state;
    }
};

////////////////
// Tree Rings //
////////////////

GameLevel.prototype.addRing = function () {
    this._playerTree.addRing(this.sTemperature, this.sMoisture);
    this._scoreGrow();
    var temperature = null;
    var moisture = null;
    switch (this.sTemperature) {
    case 'warm':
        temperature = 3;
        break;
    case 'normal':
        temperature = 2;
        break;
    case 'cool':
        temperature = 1;
        break;
    }
    switch (this.sMoisture) {
    case 'wet':
        moisture = 3;
        break;
    case 'normal':
        moisture = 2;
        break;
    case 'dry':
        moisture = 1;
        break;
    }

    if (this.D3Bar) {
        var val = {
            "Temperature": temperature,
            "Moisture": moisture
        };
        this.D3Bar.addValue(val);
    }
};

GameLevel.prototype.removeRing = function () {
    if (this._playerTree.getRings().length > 0) {
        this._playerTree.removeRing();
        if (this.D3Bar) {
            this.D3Bar.removeValue();
        }
    };
};

///////////
// Score //
///////////

GameLevel.prototype.changeScore = function (sWhichChange, points) {
    switch (sWhichChange) {
    case 'replace':
        this.game.score = points;
        break;
    case 'add':
        this.game.score += points;
        break;
    case 'subtract':
        this.game.score -= points;
        break;
    default:
        this.game.score = 0;
    }
};

GameLevel.prototype._initScoring = function () {
    //button to add points
    var xLoc = this._quitBtn.x + this._quitBtn.width + 10;
    var scoreBtn = this.add.button(xLoc, this._helpBtn.y, 'score_btn_spritesheet', this._scorePoints, this, 2, 1, 0);
    scoreBtn.name = 'scoreButton';

    // score text
    //xLoc += scoreBtn.width + 10;
    this._scoreText = this.add.text(10, this.game.height - 100, "Score: " + this.game.score, {
        fontSize: '32px',
        fill: '#000'
    });
    //this._scoreText.anchor.setTo(0.5, 0.5);
};

GameLevel.prototype._scorePoints = function (pointer) {
    this.changeScore('add', 10 * this._currentLevel);
    this._scoreText.setText("Score: " + this.game.score);
};

GameLevel.prototype._scoreGrow = function () {
    //console.log("You scored some points for growing a new ring!");

    // Get full climate data arrays for player's tree and target tree
    var playerTreeData = this._playerTree.getRings();
    var targetTreeData = this._targetTree.getRings();

    // Current (most recently added) year/ring in player's tree
    var currentYear = playerTreeData.length;

    // Climate data for current year (player's and target)
    var playerYearData = playerTreeData[currentYear - 1];
    var targetYearData = targetTreeData[currentYear - 1];

    //console.log("Player data, most recent year = " + playerYearData);
    //console.log("Target data, most recent year = " + targetYearData);

    // Check whether player's climate data for most recently added ring
    // matches the target tree climate data for the same ring
    if ((playerYearData[0] == targetYearData[0]) && (playerYearData[1] == targetYearData[1])) {
        this.changeScore('add', 100);
    } else {
        this.changeScore('subtract', 20);
    }

    this._scoreText.setText("Score: " + this.game.score);
};

//////////
// Help //
//////////

GameLevel.prototype._initHelp = function() {
    // help button using parent DialogBox class
	var xLoc = 10;
	var yLoc = this.game.height - 60;
	this._helpBtn = this.add.button(xLoc, yLoc, 'help_btn_spritesheet', this._toggleHelp, this, 2, 1, 0);
	this._helpBtn.name = 'helpBtn';
	
	// Help dialog box
	this._helpDialogBox = new HelpDialog(this);
	this._helpDialogBox.visible = false;
};

GameLevel.prototype._toggleHelp = function(pointer) {
	this._creditsDialogBox.visible = false;
	this.world.bringToTop(this._helpDialogBox);
	console.log("Help dialog z-index = " + this._helpDialogBox.z);
	//var zIndexGraph = document.getElementById("BarChartSVG").style.zIndex;
	//console.log("Graph z-index = " + zIndexGraph);
	
    if (this._helpDialogBox.visible) {
		this._helpDialogBox.visible = false;
	} else {
		this._helpDialogBox.visible = true;
	}
};

////////////////
// Quit Level //
////////////////

GameLevel.prototype._initQuitLevel = function () {
    // Button to Quit Level
    var xLoc = this._creditsBtn.x + this._creditsBtn.width + 10;
    this._quitBtn = this.add.button(xLoc, this._helpBtn.y, 'home_btn_spritesheet', this._quitLevel, this, 2, 1, 0);
    //var quitBtn = this.add.button(this.game.width - 200, this.game.height - 80, 'button_spritesheet_finish_level', this._quitLevel, this, 2, 1, 0);
    this._quitBtn.name = 'quitButton';
    //quitBtn.anchor.setTo(0.5, 0.5); // anchored on the center of the button
};

GameLevel.prototype._quitLevel = function (pointer) {
    this.state.start('ReplayMenu');
    if (this.D3Bar) {
        this.D3Bar.remove();
    }
};

/////////////
// Credits //
/////////////

//////////

GameLevel.prototype._initCredits = function() {
	// Credits button
	var xLoc = this._helpBtn.x + this._helpBtn.width + 10;;
	var yLoc = this._helpBtn.y;
	this._creditsBtn = this.add.button(xLoc, yLoc, 'credits_btn_spritesheet', this._toggleCredits, this, 2, 1, 0);
	this._creditsBtn.name = 'creditsBtn';
	
	// Credits dialog box
	this._creditsDialogBox = new CreditsDialog(this);
	this._creditsDialogBox.visible = false;
};

GameLevel.prototype._toggleCredits = function(pointer) {
	this._helpDialogBox.visible = false;
	this.world.bringToTop(this._creditsDialogBox);
	
	if (this._creditsDialogBox.visible) {
		this._creditsDialogBox.visible = false;
        document.getElementById('BarChartSVG').style.display = '';
	} else {
		this._creditsDialogBox.visible = true;
        document.getElementById('BarChartSVG').style.display = 'none'
	}
};