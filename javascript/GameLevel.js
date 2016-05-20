// GameLevel object - Parent for all specific game level children (e.g. GameLevel_1, GameLevel_2, etc.)

GameLevel = function(currentGameLevel, sBgImage) {
    this._currentLevel = currentGameLevel;
    this._sBgImage = sBgImage;
	
	this._quitBtn;
	this._helpBtn;
	this._creditsBtn;
	
	this.sMoisture;
	this.sTemperature = 'normal';
};

GameLevel.prototype.create = function() {
	this.add.image(0, 0, this._sBgImage);
	
	this._initInstructions();
	this._initCredits();
	this._initQuitLevel();
	this._initScoring();
    this._initGraph();
};

GameLevel.prototype._initGraph = function(){
    var labels = {
            x:"Year",
            y1:"Temperature",
            y2:"Moisture"
        };
    this.D3Bar = new D3GroupedBar(480, 160, labels);
}

GameLevel.prototype.preload = function() {
	// load the JSON data files for Instructions & Credits dialog boxes and tree ring data
	this._dialog = this.cache.getJSON('dialog');
	this._treesData = this.cache.getJSON('treesData');
};

/////////////////////
// Current Climate //
/////////////////////

GameLevel.prototype.setClimate = function(climate, state){
	if (climate == 'moisture'){
		this.sMoisture = state;
	} else {
		this.sTemperature = state;
	}
};

////////////////
// Tree Rings //
////////////////

GameLevel.prototype.addRing = function(){
	this._playerTree.addRing(this.sTemperature, this.sMoisture);
	this._scoreGrow();
    var temperature = null;
    var moisture = null;
    switch(this.sTemperature){
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
    switch(this.sMoisture){
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
    
    var val = {
        "Temperature": temperature,
        "Moisture": moisture
    };
    this.D3Bar.addValue(val);
};

GameLevel.prototype.removeRing = function(){
	if(this._playerTree.getRings().length > 0){
    	this._playerTree.removeRing();        
        this.D3Bar.removeValue();
    };
};

///////////
// Score //
///////////

GameLevel.prototype.changeScore = function(sWhichChange, points) {
	switch(sWhichChange){
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

GameLevel.prototype._initScoring = function() {
    //button to add points
	var xLoc = this._quitBtn.x + this._quitBtn.width + 10;
	var scoreBtn = this.add.button(xLoc, this._helpBtn.y, 'score_btn_spritesheet', this._scorePoints, this, 2, 1, 0);
	scoreBtn.name = 'scoreButton';
	
	// score text
	//xLoc += scoreBtn.width + 10;
    this._scoreText = this.add.text(10, this.game.height - 100, "Score: " + this.game.score, { fontSize: '32px', fill: '#000' });
    //this._scoreText.anchor.setTo(0.5, 0.5);
};

GameLevel.prototype._scorePoints = function(pointer) {
	this.changeScore('add', 10*this._currentLevel);
	this._scoreText.setText("Score: " + this.game.score);
};

GameLevel.prototype._scoreGrow = function() {
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
	if ((playerYearData[0] == targetYearData[0]) && (playerYearData[1] == targetYearData[1])){
		this.changeScore('add', 100);
	} else {
		this.changeScore('subtract', 20);
	}
	
	this._scoreText.setText("Score: " + this.game.score);
};

//////////////////
// Instructions //
//////////////////

GameLevel.prototype._initInstructions = function() {
    // instructions button
	this._helpBtn = this.add.button(10, this.game.height - 60, 'help_btn_spritesheet', this._showHelp, this, 2, 1, 0);
	this._helpBtn.name = 'helpBtn';
};

GameLevel.prototype._showHelp = function(pointer) {
    this._drawDialog('level' + this._currentLevel);
};

////////////////
// Quit Level //
////////////////

GameLevel.prototype._initQuitLevel = function() {
    // Button to Quit Level
	var xLoc = this._creditsBtn.x + this._creditsBtn.width + 10;
	this._quitBtn = this.add.button(xLoc, this._helpBtn.y, 'home_btn_spritesheet', this._quitLevel, this, 2, 1, 0);
	//var quitBtn = this.add.button(this.game.width - 200, this.game.height - 80, 'button_spritesheet_finish_level', this._quitLevel, this, 2, 1, 0);
	this._quitBtn.name = 'quitButton';
	//quitBtn.anchor.setTo(0.5, 0.5); // anchored on the center of the button
};

GameLevel.prototype._quitLevel = function(pointer) {
    this.state.start('ReplayMenu');
    if (this.D3Bar) {
        this.D3Bar.remove();
    }
};

/////////////
// Credits //
/////////////

GameLevel.prototype._initCredits = function() {
	var xLoc = this._helpBtn.x + this._helpBtn.width + 10;
	this._creditsBtn = this.add.button(xLoc, this._helpBtn.y, 'credits_btn_spritesheet', this._showCredits, this, 2, 1, 0);
	this._creditsBtn.name = 'creditsBtn';
};

GameLevel.prototype._showCredits = function(pointer) {
    this._drawDialog('credits');
};

////////////////////////////////////////////
// Dialog box for Credits or Instructions //
////////////////////////////////////////////

GameLevel.prototype._drawDialog = function(key) {
	// pause game and disable the instructions and credits button
	this.paused = true;
	this._helpBtn.inputEnabled = false;
	this._creditsBtn.inputEnabled = false;
	
	// draw outline box
	this.dialogBox = this.add.graphics(0,0);
	this.dialogBox.beginFill(0x3b639a);
	this.dialogBox.lineStyle(2, 0x2d5082, 1);
	this.dialogBox.drawRect(200, 50, 500, 400);
			
	// draw text
	var style = { font: 'bold 20pt Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 450 };
	this.dialogText = this.add.text(this.world.centerX, this.world.centerY, this._dialog[key], style);
	this.dialogText.anchor.set(0.5, 0.5);
	this.dialogText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
	
	//draw close button
	this.dialogCloseBtn = this.add.button(this.world.centerX, this.world.centerY+150, 'button_spritesheet_close_dialog', this._closeDialog, this, 2, 1, 0);
	this.dialogCloseBtn.anchor.setTo(0.5, 0.5);
	this.dialogCloseBtn.name = 'closeButton';
	this.dialogCloseBtn.anchor.setTo(0.5, 0.5); // anchored on the center of the button
};

GameLevel.prototype._closeDialog = function(){
	// kill off the dialog box, text, and close button
	// re-enable the instructions and credits button
	// unpause the game
	this.dialogBox.kill();
	this.dialogCloseBtn.kill();
	this.dialogText.kill();
	this.paused = false;
	this._helpBtn.inputEnabled = true;
	this._creditsBtn.inputEnabled = true
};