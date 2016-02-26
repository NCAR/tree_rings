TreeRings.ReplayMenu = function(game) {
	this.game = game; // keep reference to main game object
}

TreeRings.ReplayMenu.prototype = {
	
	create: function() {
		// Background image
		var ReplayMenuBg = this.add.image(0, 0, 'replay_menu_bg');
		ReplayMenuBg.alpha = 0.4;

        // Screen Title Text
		var screenTitleStyle = {
            font: "40px Arial",
            fill: "#57350e"
        };
		
		var screenTitleText = this.add.text(50, 50, "Play Again - Choose a Level!", screenTitleStyle);

        // Game Level (or Sandbox) Selection Menu
		var style = {
            font: "40px Arial",
            fill: "#822a0b",
            align: "center"
        };
        var level1 = this.add.text(this.world.centerX, this.world.centerY, "Level 1", style);
        var level2 = this.add.text(this.world.centerX, this.world.centerY + 50, "Level 2", style);
        var level3 = this.add.text(this.world.centerX, this.world.centerY + 100, "Level 3", style);
        var level4 = this.add.text(this.world.centerX, this.world.centerY + 150, "Level 4", style);
        var sandBox = this.add.text(this.world.centerX, this.world.centerY + 200, "Sandbox", style);

        level1.anchor.setTo(0.5, 0.5);
        level2.anchor.setTo(0.5, 0.5);
        level3.anchor.setTo(0.5, 0.5);
        level4.anchor.setTo(0.5, 0.5);
        sandBox.anchor.setTo(0.5, 0.5);

        level1.inputEnabled = level2.inputEnabled = level3.inputEnabled = level4.inputEnabled = true;
        sandBox.inputEnabled = true;
        level1.events.onInputDown.addOnce(this.startLevel1, this);
        level2.events.onInputDown.addOnce(this.startLevel2, this);
        level3.events.onInputDown.addOnce(this.startLevel3, this);
        level4.events.onInputDown.addOnce(this.startLevel4, this);
        sandBox.events.onInputDown.addOnce(this.startSandBox, this);
	},
	
    startLevel1: function (pointer) {
        this.state.start('GameLevel_1');
    },
	
    startLevel2: function (pointer) {
        this.state.start('GameLevel_2');
    },
	
    startLevel3: function (pointer) {
        this.state.start('GameLevel_3');
    },
	
    startLevel4: function (pointer) {
        this.state.start('GameLevel_4');
    },
	
	startSandBox: function (pointer) {
        this.state.start('SandBox');
    },
	
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