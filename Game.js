var b_climateFlag = 'user';
var s_moisture = 'normal';
var s_temperature = 'normal';

TreeRings.Game = function(game) {
    a_targetTree = new Tree();
    a_userTree = new Tree();
    a_tree = new Tree();
};

TreeRings.Game.prototype = {
	
	create: function() {
		this.buildWorld();
	},
	
	buildWorld: function() {
		this.add.image(0, 0, 'game_bg');
		
		// Buttons for selecting moisture level (dry, normal or wet)
		this.createMoistureButtons();
        
		// Text for growing one year
		var style = { font: "24px Arial", fill: "#006600", align: "center" };
		var text = this.add.text(50, 20, "Grow One Year", style);
        
		// Insert Grow One Year button
       	var growBtn = this.add.button(150, 100, 'button_spritesheet', this.growRingListener, this, 2, 1, 0);
        growBtn.name = 'growButton';
        growBtn.anchor.setTo(0.5, 0.5); // anchored on the center of the button
                
        // text for undo one year
        var style = { font: "24px Arial", fill: "#006600", align: "center" };
		var text = this.add.text(300, 20, "Remove One Year", style);
        
        // Insert undo One Year button
       	var undoBtn = this.add.button(400, 100, 'button_spritesheet', this.undoRingListener, this, 2, 1, 0);
        //growBtn = this.add.button(this.world.centerX, this.world.centerY, 'buttonGeneric', this.debug, this, 2, 1, 0);
        undoBtn.name = 'undoButton';
        // anchored on the center of the button
        undoBtn.anchor.setTo(0.5, 0.5);
        
        
        // text for swapping
        var style = { font: "24px Arial", fill: "#006600", align: "center" };
		var text = this.add.text(50, 320, "Swap Tree", style);
        
        // Insert Swap button
       	var swapBtn = this.add.button(150, 400, 'button_spritesheet', this.swapClimateListener, this, 2, 1, 0);
        //growBtn = this.add.button(this.world.centerX, this.world.centerY, 'buttonGeneric', this.debug, this, 2, 1, 0);
        swapBtn.name = 'swapButton';
        // anchored on the center of the button
        swapBtn.anchor.setTo(0.5, 0.5);
        

        var baseRadius = 0;    
        this.a_userTree = new Tree(this, 650, 250);
        this.a_targetTree = new Tree(this, 650, 250);        
        
	    this.buildTarget();
        
        this.a_tree = this.a_userTree;
        
        
        this.add.existing(this.a_tree);
        
		// Insert image of target tree ring pattern user should try to match
		this.add.image(650, 51, 'tree_ring_sample');

	},
	createMoistureButtons: function() {
		// Create buttons for selecting moisture level of dry, normal, or wet
		
		// Place three buttons on stage as sprites
		var moistureBtnDry = this.add.sprite(60, 150, 'moisture_btn_dry');
		var moistureBtnNormal = this.add.sprite(200, 150, 'moisture_btn_normal');
		var moistureBtnWet = this.add.sprite(340, 150, 'moisture_btn_wet');
		
		// Enable click/touch input
        moistureBtnDry.inputEnabled = true;
        moistureBtnNormal.inputEnabled = true;
        moistureBtnWet.inputEnabled = true;
		
		// Add listeners
        moistureBtnDry.events.onInputDown.add(this.moistureBtnDryListener,this); // phaser events: http://phaser.io/docs/2.4.2/Phaser.Events.html
        moistureBtnNormal.events.onInputDown.add(this.moistureBtnNormalListener,this);
        moistureBtnWet.events.onInputDown.add(this.moistureBtnWetListener,this);
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
		
	},
    buildTarget: function(){
        // initiate the Target
        //1
        this.a_targetTree.addRing('normal','normal');
        //2
        this.a_targetTree.addRing('warm','normal');
        //3
        this.a_targetTree.addRing('normal','normal');
        //4
        this.a_targetTree.addRing('warm','normal');
        //5
        this.a_targetTree.addRing('warm','dry');
        //6
        this.a_targetTree.addRing('warm','dry');
        //7
        this.a_targetTree.addRing('normal','dry');
        //8
        this.a_targetTree.addRing('normal','normal');
        //9
        this.a_targetTree.addRing('warm','normal');
        //10
        this.a_targetTree.addRing('normal','normal');
        //11
        this.a_targetTree.addRing('cool','wet');
        //12
        this.a_targetTree.addRing('normal','normal');
        //13
        this.a_targetTree.addRing('warm','normal');
        //14
        this.a_targetTree.addRing('warm','wet');
        // 15    
        this.a_targetTree.addRing('warm','wet');
    },
    /* listener functions */
    undoRingListener:  function(){
       if(this.a_tree.getRings().length > 0){
            this.a_tree.removeRing();
        }
    },
    growRingListener: function(){
        this.a_tree.addRing(s_temperature, s_moisture);
    } ,
    swapClimateListener:  function(){
        
        if(b_climateFlag == 'target'){
            b_climateFlag = 'user';
            // we are now using the user submitted climate
            this.a_targetTree.setExists(false);
            this.a_userTree.setExists(true);
            
            // change action reference
            this.a_tree = this.a_userTree;
            this.add.existing(this.a_tree);
            console.log('we are now using the user submitted climate');
        } else {
            b_climateFlag = 'target';
            // when using the target tree, reset and rebuild it
            this.a_targetTree.resetTree();
            this.buildTarget();
            
           // we are now using the target climate
            this.a_targetTree.setExists(true);
            this.a_userTree.setExists(false);
            
            // change action reference
            this.a_tree = this.a_targetTree;
            this.add.existing(this.a_tree);
            console.log('we are now using the target climate');
        }
    },
	moistureBtnDryListener: function(){
		s_moisture = 'dry';
	},
	moistureBtnNormalListener: function(){
		s_moisture = 'normal';
	},
	moistureBtnWetListener: function(){
		s_moisture = 'wet';
	},
    debug: function(){
        console.log(this);
    }
};

// outside function just to pick a random keyval
var randomProperty = function (obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};