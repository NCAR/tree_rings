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
		// Background image
		var startMenuBg = this.add.image(0, 0, 'start_menu_bg');
		startMenuBg.alpha = 0.4;

        // Screen Title Text
		var screenTitleStyle = {
            font: "40px Arial",
            fill: "#57350e"
        };
		
		var screenTitleText = this.add.text(50, 50, "Decoding Past Climate with Tree Rings", screenTitleStyle);


        // Game Level (or Sandbox) Selection Menu
		var style = {
            font: "40px Arial",
            fill: "#822a0b",
            align: "center"
        };
        var level1 = this.add.text(this.world.centerX, this.world.centerY, "Level 1", style);
        var level2 = this.add.text(this.world.centerX, this.world.centerY + 50, "Level 2", style);
        var level3 = this.add.text(this.world.centerX, this.world.centerY + 100, "Level 3", style);
		var sandBox = this.add.text(this.world.centerX, this.world.centerY + 150, "Sandbox", style);
        var level4 = this.add.text(this.world.centerX, this.world.centerY + 200, "Level 4", style);

        level1.anchor.setTo(0.5, 0.5);
        level2.anchor.setTo(0.5, 0.5);
        level3.anchor.setTo(0.5, 0.5);
        sandBox.anchor.setTo(0.5, 0.5);
        level4.anchor.setTo(0.5, 0.5);

        level1.inputEnabled = level2.inputEnabled = level3.inputEnabled = sandBox.inputEnabled = level4.inputEnabled = true;
        level1.events.onInputDown.addOnce(this.startLevel1, this);
        level2.events.onInputDown.addOnce(this.startLevel2, this);
        level3.events.onInputDown.addOnce(this.startLevel3, this);
        sandBox.events.onInputDown.addOnce(this.startSandBox, this);
        level4.events.onInputDown.addOnce(this.startLevel4, this);
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
    },
    startLevel2: function (pointer) {
        this._selectedLevel = 2;
        this.startGame();
    },
    startLevel3: function (pointer) {
        this._selectedLevel = 3;
        this.startGame();
    },
    startSandBox: function (pointer) {
        this.state.start('SandBox');
    },
    startLevel4: function (pointer) {
        this.state.start('GameLevel_4');
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