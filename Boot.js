var TreeRings = {};

TreeRings.Boot = function(game) {
	// variables
	// this.var_name;
};

TreeRings.Boot.prototype = {
	create: function() {
        this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;		
        this.scale.scaleMode = Phaser.ScaleManager.aspectRatio;
        this.scale.minWidth = 270;
        this.scale.minHeight = 480;
        this.game.stage.scale.maxWidth = 900;
        this.game.stage.scale.maxHeight = 600;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.stage.forcePortrait = true;
		//this.scale.setScreenSize(true);

		this.input.addPointer();
		this.stage.backgroundColor = '#ffffff';
		
		this.state.start('Preloader');
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
		this.load.image('preloaderBar', 'assets/images/loader_bar.png');
		this.load.image('titleimage', 'assets/images/TitleImage.png');
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