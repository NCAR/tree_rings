a_climateHistory = new ClimateHistory();
a_climateHistoryTarget = new ClimateHistory();
a_activeClimateHistory = a_climateHistory;
b_climateFlag = 'user';

TreeRings.Game = function(game) {
	this.buildTarget();
};

TreeRings.Game.prototype = {
	
	create: function() {
		this.buildWorld();
	},
	
	buildWorld: function() {
		this.add.image(0, 0, 'game_bg');
        
		// Text for growing one year
		var style = { font: "24px Arial", fill: "#006600", align: "center" };
		var text = this.add.text(50, 20, "Grow One Year", style);
        
		// Insert Grow One Year button
       	var growBtn = this.add.button(150, 100, 'button_spritesheet', this.growRingListener, this, 2, 1, 0);
        //growBtn = this.add.button(this.world.centerX, this.world.centerY, 'buttonGeneric', this.debug, this, 2, 1, 0);
        growBtn.name = 'growButton';
        // anchored on the center of the button
        growBtn.anchor.setTo(0.5, 0.5);
                
        // text for undo one year
        var style = { font: "24px Arial", fill: "#006600", align: "center" };
		var text = this.add.text(50, 175, "Remove One Year", style);
        
        // Insert undo One Year button
       	var undoBtn = this.add.button(150, 250, 'button_spritesheet', this.undoRingListener, this, 2, 1, 0);
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
        

        var baseRadius = 12;    
        this.a_tree = new Tree(this, 650, 250,baseRadius,a_activeClimateHistory);
        this.add.existing(this.a_tree);
        
		// Insert image of target tree ring pattern user should try to match
		this.add.image(650, 51, 'tree_ring_sample');

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
        a_climateHistoryTarget.resetClimateHistory();
        // initiate the Target
        //1
        a_climateHistoryTarget.addYear('normal','normal');
        //2
        a_climateHistoryTarget.addYear('warm','normal');
        //3
        a_climateHistoryTarget.addYear('normal','normal');
        //4
        a_climateHistoryTarget.addYear('warm','normal');
        //5
        a_climateHistoryTarget.addYear('warm','dry');
        //6
        a_climateHistoryTarget.addYear('warm','dry');
        //7
        a_climateHistoryTarget.addYear('normal','dry');
        //8
        a_climateHistoryTarget.addYear('normal','normal');
        //9
        a_climateHistoryTarget.addYear('warm','normal');
        //10
        a_climateHistoryTarget.addYear('normal','normal');
        //11
        a_climateHistoryTarget.addYear('cool','wet');
        //12
        a_climateHistoryTarget.addYear('normal','normal');
        //13
        a_climateHistoryTarget.addYear('warn','normal');
        //14
        a_climateHistoryTarget.addYear('warm','wet');
        // 15    
        a_climateHistoryTarget.addYear('warm','wet');
    },
    /* listener functions */
    undoRingListener:  function(){
       if(this.a_tree.getRings().length > 0){
            this.a_tree.removeRing();
            a_activeClimateHistory.removeYear();
        }
    },
    growRingListener: function(){
        this.a_tree.addRing();

        // for now, just randomly picking temperature and precipitation
        // ultimately this will be retrieved from user manipulated input
        a_activeClimateHistory.addYear(randomProperty(a_activeClimateHistory.getTemperatures()),randomProperty(a_activeClimateHistory.getPrecipitation()));
    } ,
    swapClimateListener:  function(){
        
        if(b_climateFlag == 'target'){
            b_climateFlag = 'user';
            a_activeClimateHistory = a_climateHistory;
            // we are now using the user submitted climate
            // reset target
            this.buildTarget();
        } else {
            b_climateFlag = 'target';
            a_activeClimateHistory = a_climateHistoryTarget;
            // we are now using the target climate
        }
            this.a_tree.changeClimateHistory(a_activeClimateHistory);
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