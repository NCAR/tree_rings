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
        var sandBox = this.add.text(this.world.centerX, this.world.centerY, "Sandbox", style);
        var level4 = this.add.text(this.world.centerX, this.world.centerY + 50, "Level 4", style);

        sandBox.anchor.setTo(0.5, 0.5);
        level4.anchor.setTo(0.5, 0.5);

        sandBox.inputEnabled = level4.inputEnabled = true;
        sandBox.events.onInputDown.addOnce(this.startSandBox, this);
        level4.events.onInputDown.addOnce(this.startLevel4, this);
	},
	
	startSandBox: function (pointer) {
        this.state.start('SandBox');
    },
	
    startLevel4: function (pointer) {
        this.state.start('GameLevel_4');
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