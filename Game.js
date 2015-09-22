var b_climateFlag = 'user';
var s_moisture = 'normal';
var s_temperature = 'normal';

var b_showInstructions = true;

// instructions is global
var instructionsImage;

// which tree is target
var s_targetTreeID = 'aspen';
var s_targetTreeID_prior = 'aspen';

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
       $(document).ready(function(){
            var data = {
                'aspen': 'aspen',
                'beech': 'beech',
                'oak' : 'oak',
                'redwood': 'redwood'
            }
            var tree_select = $('<select />').attr('id','tree_selector');
            for(var val in data) {
                $('<option />', {value: val, text: data[val]}).appendTo(tree_select);
            }
            tree_select.appendTo('body'); // or wherever it should be
           
           // add change listener
           
           $('#tree_selector').on('change', function(e){
               s_targetTreeID_prior = s_targetTreeID;
               s_targetTreeID = $( "#tree_selector option:selected" ).val();
           });
       });
        
        
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
        
        // add instructions image
        instructionsImage = this.add.image(0,0, 'instructions1');

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
        
        
        // if instructions are showing, and the mouse is clicked, hide the instructions
        // and set the instructions flag to false
        if(b_showInstructions == true){
            if (this.input.activePointer.isDown)
            {
                b_showInstructions = false;
                instructionsImage.kill();
            }
        }
        
        if(s_targetTreeID != s_targetTreeID_prior){
            this.buildTarget();
            s_targetTreeID = s_targetTreeID_prior;
        }
	},
    buildTarget: function(){
        this.a_targetTree.resetTree();
        // initiate the Target
        var a_targetRings = [];
        switch(s_targetTreeID){         
            case 'aspen':
                 a_targetRings = [['normal','normal'],
                             ['warm','normal'],
                             ['normal','normal'],
                             ['warm','normal'],
                             ['warm','dry'],
                             ['warm','dry'],
                             ['normal','dry'],
                             ['normal','normal'],
                             ['warm','normal'],
                             ['normal','normal'],
                             ['cool','wet'],
                             ['normal','normal'],
                             ['warm','normal'],
                             ['warm','wet'],
                             ['warm','wet']
                            ];
                break;
            case 'beech':
                 a_targetRings = [['normal','normal'],
                             ['warm','normal'],
                             ['normal','normal'],
                             ['warm','normal'],
                             ['warm','dry'],
                             ['warm','dry'],                           
                             ['warm','dry'],
                             ['warm','dry'],
                             ['warm','dry'],
                             ['warm','dry'],
                             ['warm','dry'],
                             ['warm','dry'],
                             ['warm','dry'],
                             ['warm','dry'],
                             ['warm','dry']
                            ];
                break;
            case 'oak':
                 a_targetRings = [['normal','normal'],                            
                             ['warm','wet'],
                             ['warm','wet'],
                             ['warm','wet'],
                             ['warm','wet'],
                             ['warm','wet'],
                             ['normal','dry'],
                             ['normal','normal'],
                             ['warm','normal'],
                             ['normal','normal'],
                             ['cool','wet'],
                             ['normal','normal'],
                             ['warm','normal'],
                             ['warm','wet'],
                             ['warm','wet']
                            ];
                break;
            case 'redwood':
                 a_targetRings = [['normal','normal'],
                             ['warm','normal'],
                             ['normal','normal'],                           
                             ['normal','normal'],
                             ['normal','normal'],
                             ['normal','normal'],
                             ['normal','normal'],
                             ['normal','normal'],
                             ['warm','normal'],
                             ['normal','normal'],
                             ['cool','wet'],
                             ['normal','normal'],
                             ['warm','normal'],
                             ['warm','wet'],
                             ['warm','wet']
                            ];
                break;
        }
        
        var i_total_rings = a_targetRings.length;
        for(var i=0; i< i_total_rings; i++){
            this.a_targetTree.addRing(a_targetRings[i][0],a_targetRings[i][1]); 
        }
        
        
        
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