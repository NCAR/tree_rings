TreeRings.StartMenu = function(game) {
    this.startBG;
    this.startPrompt;
	
	// For MultiLevel version
	this.game = game; // keep reference to main game object
    this._selectedLevel = 0;
	// End new code for MultiLevel version
}

TreeRings.StartMenu.prototype = {
	
	create: function() {
		//startBG = this.add.image(0, 0, 'titlescreen');
		//startBG.inputEnabled = true;
		//startBG.events.onInputDown.addOnce(this.startGame, this);
      
		//startPrompt = this.add.bitmapText(this.world.centerX-105, this.world.centerY+180, 'desyrel', 'Touch to Start!', 24);
        ////var style = { font: "50px Arial", fill: "#000066", align: "center" };
        ////startPrompt = this.add.text(this.world.centerX-155, this.world.centerY+180, "Touch to Start!", style);    
    	////this.state.start('Game');
		
		
        // For MultiLevel version
		if(this._selectedLevel == 0){
            startBG = this.add.image(0, 0, 'titlescreen');
            //var startBG = this.add.image(0, 0, 'game_start_bkg');
        } else {
            startBG = this.add.image(0, 0, 'game_play_again_bkg');
            //var startBG = this.add.image(0, 0, 'game_play_again_bkg');
        }

        var style = {
            font: "50px Arial",
            fill: "#000066",
            align: "center"
        };
        var level1 = this.add.text(this.world.centerX, this.world.centerY + 80, "Level 1", style);
        var level2 = this.add.text(this.world.centerX, this.world.centerY + 130, "Level 2", style);
        var level3 = this.add.text(this.world.centerX, this.world.centerY + 180, "Level 3", style);

        level1.anchor.setTo(0.5, 0.5);
        level2.anchor.setTo(0.5, 0.5);
        level3.anchor.setTo(0.5, 0.5);

        level1.inputEnabled = level2.inputEnabled = level3.inputEnabled = true;
        level1.events.onInputDown.addOnce(this.startLevel1, this);
        level2.events.onInputDown.addOnce(this.startLevel2, this);
        level3.events.onInputDown.addOnce(this.startLevel3, this);
		// End new code for MultiLevel version
	},

	startGame: function (pointer) {
        // For MultiLevel version
		// send the current level to the game state
        this.game.state.states['Game']._currentLevel = this._selectedLevel;
		// End new code for MultiLevel version
		
		this.state.start('Game');
	},
	
	// For MultiLevel version
    //startLevel1: function (pointer) {
    startLevel1: function () {
        this._selectedLevel = 1;
        this.startGame();
		console.log('Player chose level one');
    },
    startLevel2: function (pointer) {
        this._selectedLevel = 2;
        this.startGame();
		console.log('Player chose level two');
    },
    startLevel3: function (pointer) {
        this._selectedLevel = 3;
        this.startGame();
		console.log('Player chose level three - 3');
    },
	// End new code for MultiLevel version
	
	
	init: function() {
		
	},
	loadRender: function(){
		
		
	},
	loadUpdate: function() {
		
	},
	paused: function() {
		
	},
	pauseUpdate: function() {
		
	},
	preload: function() {
		  
	},
	preRender: function() {
		
	},
	render: function (){
		
	},
	resize: function() {
		
	},
	resumed: function() {
		
	},
	shutdown: function() {
		
	},
	update: function () {
		
	}
};