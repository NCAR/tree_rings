// Tree object
// game object, x coord, y coord, right or left semicircle, climate history data for rings
Tree = function(game, x, y, side, aClimateData) {
    Phaser.Graphics.call(this, game, x, y, 'tree');
	
    this.a_climateYearly = aClimateData;
    this.exists = true;
	this.darkRingThickness = 2;
	this.s_side = side;
};

Tree.prototype = Object.create(Phaser.Graphics.prototype);
Tree.prototype.constructor = Tree;

// set exists property, which controls visibility on the main game
Tree.prototype.setExists = function(b_bool){
    if(b_bool == true){
        this.exists = true;
    } else {
        this.exists = false;
    }
};
// Add a ring
Tree.prototype.addRing = function(s_temperature, s_moisture) {
    this.a_climateYearly.push([s_temperature, s_moisture]);
};
// Remove a ring
Tree.prototype.removeRing = function() {
    this.a_climateYearly.pop();
};
// return the rings array
Tree.prototype.getRings = function() {
    return this.a_climateYearly;
};
// provide a preset for rings
Tree.prototype.setRings = function(value){  
    this.a_climateYearly = value;
}
// reset the tree to init conditions
Tree.prototype.resetTree = function(){
    this.setRings([]);
};
// provide a value for each temperature condition
Tree.prototype.ringTemperature = function(index) {
    switch (index) {
        case 'cool':
            return 2; // 5
            break;
        case 'normal':
            return 8; // 7
            break;
        case 'warm':
            return 5; // 6
            break;
    }
    return 0;
};
// provide a value for each precipitation condition
Tree.prototype.ringPrecipitation = function(index) {
    switch (index) {
        case 'dry':
            return 3; // 2
            break;
        case 'normal':
            return 5; // 5
            break;
        case 'wet':
            return 7; // 8
            break;
    }
};

// draw the rings
Tree.prototype.update = function() {
    this.clear();
    var arrayLength = this.getRings().length;
    var a_treeRadius = new Array();
    
    // first create array of calculated progressive radii
    var i_prevRadius = 0;
    for(var i = 0; i < arrayLength; i++){
		var i_recentRadius = i_prevRadius + this.ringTemperature(this.getRings()[i][0]) + this.ringPrecipitation(this.getRings()[i][1]);
		 //var i_recentRadius = i_prevRadius + this.ringTemperature(this.getRings()[i]['s_temperature']) + this.ringPrecipitation(this.getRings()[i]['s_moisture']);
		 a_treeRadius.push(i_recentRadius);
		 i_prevRadius = i_recentRadius;
    }
  
    // now reverse array and draw it
	var arrayLength = a_treeRadius.length;
    for (var i = (arrayLength - 1); i >= 0; i--) {
        ringRadius = a_treeRadius[i];
       
        // Dark, late growth
        this.beginFill(0x996633);
		if (this.s_side == 'left') {
			this.arc(0, 0, ringRadius, Math.PI/2, 3*Math.PI/2);
		} else {
			this.arc(0, 0, ringRadius, -Math.PI/2, Math.PI/2);
		}
        this.endFill();
       
        // Early, light growth
        this.beginFill(0xcccc99);
		if (this.s_side == 'left') {
			this.arc(0, 0, ringRadius - this.darkRingThickness, Math.PI/2, 3*Math.PI/2);
		} else {
			this.arc(0, 0, ringRadius - this.darkRingThickness, -Math.PI/2, Math.PI/2);
		}
        this.endFill();
    }
};

Tree.prototype.debug = function(){
    console.log(this);   
};