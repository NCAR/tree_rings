TreeRings.Game = function(game) {
	// variables
	// this.var_name;
};

TreeRings.Game.prototype = {
	
	create: function() {
		this.buildWorld();
	},
	
	buildWorld: function() {
		this.add.image(0, 0, 'game_bg');
		
		// Insert calendar sprite/button
		var growSprite = this.add.sprite(50, 50, 'calendar_icon');
        growSprite.inputEnabled = true; // indicate that the sprite can have click/touch input events
        growSprite.events.onInputDown.add(this.growSpriteListener,this); // phaser events: http://phaser.io/docs/2.4.2/Phaser.Events.html
		
		// Text beneath calendar sprite
		var style = { font: "24px Arial", fill: "#006600", align: "center" };
		var text = this.add.text(50, 200, "Grow One Year", style);
		
		// Insert image of target tree ring pattern user should try to match
		this.add.image(650, 51, 'tree_ring_sample');
		
        
		// Insert Grow One Year button
       	var growBtn = this.add.button(150, 300, 'button_spritesheet', this.debug, this, 2, 1, 0);
        //growBtn = this.add.button(this.world.centerX, this.world.centerY, 'buttonGeneric', this.debug, this, 2, 1, 0);
        growBtn.name = 'growButton';
        // anchored on the center of the button
        growBtn.anchor.setTo(0.5, 0.5);
        
		// Graphics objects
        
        // Curved line arc
        /*var treeRingArc = this.add.graphics(400, 250);
        treeRingArc.lineStyle(8, 0x339933);
        treeRingArc.arc(0, 0, 100, Math.PI/2, 3*Math.PI/2, false);*/
		
		// Filled semi-circle
        /*var treeRingSemiCircle = this.add.graphics(400, 250);
		treeRingSemiCircle.beginFill(0x996633);
		treeRingSemiCircle.arc(0, 0, 50, Math.PI/2, 3*Math.PI/2);
		treeRingSemiCircle.endFill();*/
		
		// Add new ring with early/light and late/dark growth
		//this.addTreeRing();
	},
	
	addTreeRing: function() {
		//var treeRing = ;
		
		//this.playerTreeRings.addChild(treeRing);
		
		var treeRing = this.add.graphics(650, 250);
		
		// Dark, late growth
		treeRing.beginFill(0x996633);
		treeRing.arc(0, 0, 22, Math.PI/2, 3*Math.PI/2);
		treeRing.endFill();
		
		// Early, light growth
		treeRing.beginFill(0xcccc99);
		treeRing.arc(0, 0, 20, Math.PI/2, 3*Math.PI/2);
		treeRing.endFill();
		
		// Dark, late growth
		treeRing.beginFill(0x996633);
		treeRing.arc(0, 0, 12, Math.PI/2, 3*Math.PI/2);
		treeRing.endFill();
		
		// Early, light growth
		treeRing.beginFill(0xcccc99);
		treeRing.arc(0, 0, 10, Math.PI/2, 3*Math.PI/2);
		treeRing.endFill();
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
    
    /* listener functions */
    
    growSpriteListener: function(){
        this.debug();
    },
    debug: function(){
        console.log('Sprite or Button clicked');
		this.addTreeRing();
    }
};