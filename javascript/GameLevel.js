// GameLevel object - Parent for all specific game level children (e.g. GameLevel_1, GameLevel_2, etc.)

GameLevel = function(currentGameLevel, sBgImage) {
    this._currentLevel = currentGameLevel;
    this._sBgImage = sBgImage;
	
	this._instructions;
	this._credits;
	
	this.sMoisture;
	this.sTemperature = 'normal';
};

GameLevel.prototype.create = function() {
	this.add.image(0, 0, this._sBgImage);
	
	this._initInstructions();
	this._initCredits();
	this._initQuitLevel();
	this._initScoring();
};

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
	
	//console.log(climate + ' set to ' + state);
};

////////////////
// Tree Rings //
////////////////

//GameLevel.prototype.addRing = function(climate, state){
GameLevel.prototype.addRing = function(){
	//console.log("player tree = " + this._playerTree);
	//console.log("moisture = " + this.sMoisture);
	//console.log("temperature = " + this.sTemperature);
	this._playerTree.addRing(this.sTemperature, this.sMoisture);
};

GameLevel.prototype.removeRing = function(){
	if(this._playerTree.getRings().length > 0){
    	this._playerTree.removeRing();
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
	var scoreBtn = this.add.button(this.game.width - 200, this.game.height - 160, 'button_spritesheet_add_points', this._scorePoints, this, 2, 1, 0);
	//var scoreBtn = this.add.button(this.world.centerX, this.world.centerY, 'button_spritesheet_add_points', this._scorePoints, this, 2, 1, 0);
	scoreBtn.name = 'scoreButton';
	//scoreBtn.anchor.setTo(0.5, 0.5); // anchored on the center of the button
	
	// score text
    this._scoreText = this.add.text(this.world.centerX, this.world.centerY+200, "Score: " + this.game.score, { fontSize: '32px', fill: '#000' });
    this._scoreText.anchor.setTo(0.5, 0.5);
};

GameLevel.prototype._scorePoints = function(pointer) {
	this.changeScore('add', 10*this._currentLevel);
	this._scoreText.setText("Score: " + this.game.score);
};

//////////////////
// Instructions //
//////////////////

GameLevel.prototype._initInstructions = function() {
    // instructions button
	this._instructions = this.add.text(50, this.game.height-100, "Instructions", { fontSize: '32px', fill: '#000' });
	//this._instructions = this.add.text(100, this.world.height-50, "Instructions", { fontSize: '32px', fill: '#000' });
	//this._instructions.anchor.setTo(0.5, 0.5);
	this._instructions.inputEnabled = true;
	this._instructions.events.onInputDown.add(this._showInstructions, this);
};

GameLevel.prototype._showInstructions = function(pointer) {
    this._drawDialog('level' + this._currentLevel);
};

////////////////
// Quit Level //
////////////////

GameLevel.prototype._initQuitLevel = function() {
    // Button to Quit Level
	var quitBtn = this.add.button(this.game.width - 200, this.game.height - 80, 'button_spritesheet_finish_level', this._quitLevel, this, 2, 1, 0);
	//var quitBtn = this.add.button(this.world.centerX, this.world.centerY+100, 'button_spritesheet_finish_level', this._quitLevel, this, 2, 1, 0);
	quitBtn.name = 'quitButton';
	//quitBtn.anchor.setTo(0.5, 0.5); // anchored on the center of the button
};

GameLevel.prototype._quitLevel = function(pointer) {
    this.state.start('ReplayMenu');
};

/////////////
// Credits //
/////////////

GameLevel.prototype._initCredits = function() {
    this._credits = this.add.text(50, this.game.height-50, "Credits", { fontSize: '32px', fill: '#000' });
	//this._credits = this.add.text(this.world.width-100, this.world.height-50, "Credits", { fontSize: '32px', fill: '#000' });
	//this._credits.anchor.setTo(0.5, 0.5);
	this._credits.inputEnabled = true;
	this._credits.events.onInputDown.add(this._showCredits, this);
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
	this._instructions.inputEnabled = false;
	this._credits.inputEnabled = false;
	
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
	this._instructions.inputEnabled = true;
	this._credits.inputEnabled = true
};