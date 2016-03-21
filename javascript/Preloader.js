TreeRings.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
};

TreeRings.Preloader.prototype = {

	create: function() {
		this.preloadBar.cropEnabled = false;
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
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);
		
		this.titleText = this.add.image(this.world.centerX, this.world.centerY-100, 'titleimage');
		this.titleText.anchor.setTo(0.5, 0.5);
		
		// For MultiLevel version
		this.load.json('dialog', 'assets/data/dialog.json');
		this.load.json('treesData', 'assets/data/trees.json');
		// End new code for MultiLevel version
		
		// For improved multilevel version
		this.load.image('start_menu_bg', 'assets/images/start_menu_bg_900x600.jpg');
		this.load.image('replay_menu_bg', 'assets/images/replay_menu_bg_900x600.jpg');
		//this.load.image('replay_menu_bg', 'assets/images/replay_menu_bg_900x500.jpg');
		//this.load.image('start_menu_bg', 'assets/images/start_menu_bg_900x500.jpg');
		
		this.load.image('sandbox_bg', 'assets/images/sandbox_bg_900x600.jpg');
		//this.load.image('sandbox_bg', 'assets/images/sandbox_bg_900x500.jpg');
		this.load.image('game_level_4_bg', 'assets/images/game_level_4_bg.png');
		// End new code for improved multilevel version
		
		this.load.image('titlescreen', 'assets/images/TitleBG.jpg');
		this.load.bitmapFont('desyrel', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
		this.load.image('game_bg', 'assets/images/game_bg_900x600.png');
		//this.load.image('game_bg', 'assets/images/game_bg_900x500.png');
		//this.load.image('phaser_logo', 'assets/images/phaser_logo.png');
		//this.load.image('tree_ring_sample', 'assets/images/tree_ring_sample_330x330.png');
		this.load.image('tree_ring_sample', 'assets/images/tree_ring_sample_02_200x400.png');
		this.load.image('calendar_icon', 'assets/images/calendar_icon_128x128.png');
		
		this.load.image('moisture_btn_dry', 'assets/images/moisture_btn_dry_120x120.png');
		this.load.image('moisture_btn_normal', 'assets/images/moisture_btn_normal_120x120.png');
		this.load.image('moisture_btn_wet', 'assets/images/moisture_btn_wet_120x120.png');
		
		this.load.image('temperature_btn_cool', 'assets/images/temperature_btn_cool_120x120.png');
		this.load.image('temperature_btn_normal', 'assets/images/temperature_btn_normal_120x120.png');
		this.load.image('temperature_btn_warm', 'assets/images/temperature_btn_warm_120x120.png');
		
		this.load.image('moisture_btn_selected_highlight', 'assets/images/moisture_btn_selected_highlight_120x120.png');
		
		// New buttons March 2016
		this.load.spritesheet('help_btn_spritesheet', 'assets/images/spritesheets/help_btn_spritesheet.png', 50, 50);
		this.load.spritesheet('credits_btn_spritesheet', 'assets/images/spritesheets/credits_btn_spritesheet.png', 150, 50);
		this.load.spritesheet('score_btn_spritesheet', 'assets/images/spritesheets/score_btn_spritesheet.png', 50, 50);
		this.load.spritesheet('home_btn_spritesheet', 'assets/images/spritesheets/home_btn_spritesheet.png', 50, 50);
		
        // 193x71 is the size of each frame.
        this.load.spritesheet('button_spritesheet', 'assets/images/spritesheets/button_sprite_sheet.png', 193, 71);
		
		
		// For MultiLevel version
		
		//this.load.image('game_start_bkg', 'assets/images/game_start_bkg.png');
		this.load.image('game_play_again_bkg', 'assets/images/game_play_again_bkg.png');
		this.load.image('game_bg_level1', 'assets/images/game_bg_level1.png');
		this.load.image('game_bg_level2', 'assets/images/game_bg_level2.png');
		this.load.image('game_bg_level3', 'assets/images/game_bg_level3.png');
		//this.load.image('game_bg', 'assets/images/game_bg_900x500.png');
		
        // 193x71 is the size of each frame
        this.load.spritesheet('button_spritesheet_finish_level', 'assets/images/spritesheets/button_sprite_sheet_finish_level.png', 193, 71);
        this.load.spritesheet('button_spritesheet_add_points', 'assets/images/spritesheets/button_sprite_sheet_add_points.png', 193, 71);
        this.load.spritesheet('button_spritesheet_close_dialog', 'assets/images/spritesheets/button_sprite_sheet_close_dialog.png', 193, 71);
		// End new code for MultiLevel version
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
		this.ready = true;
		this.state.start('StartMenu');
	}
};