// Tree object
// game object, x coord, y coord
Tree = function(game, x, y) {
    Phaser.Graphics.call(this, game, x, y, 'tree');
    this.a_rings = [];
    this.exists = true;
}

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
// add a ring
Tree.prototype.addRing = function(s_temperature, s_moisture) {
    this.a_rings.push({s_temperature, s_moisture});
};
// add a ring
Tree.prototype.removeRing = function() {
   // this.subtractRadius();
    this.a_rings.pop();
};
// return the rings array
Tree.prototype.getRings = function() {
    return this.a_rings;
};
// provide a preset for rings
Tree.prototype.setRings = function(value){    
    this.a_rings = value;
}
// reset the tree to init conditions
Tree.prototype.resetTree = function(){
    this.setRings([]);
};
// provide a value for each temperature condition
Tree.prototype.ringTemperature = function(index) {
    switch (index) {
        case 'cool':
            return .5;
            break;
        case 'normal':
            return 5.5;
            break;
        case 'warm':
            return 7.5;
            break;
    }
    return 0;
};
// provide a value for each precipitation condition
Tree.prototype.ringPrecipitation = function(index) {
    switch (index) {
        case 'dry':
            return 1;
            break;
        case 'normal':
            return 5.5;
            break;
        case 'wet':
            return 8;
            break;
    }
    //return 0;
};

Tree.prototype.debug = function(){
    console.log(this);   
};
// draw the rings
Tree.prototype.update = function() {
    this.clear();
    var arrayLength = this.getRings().length;
    var a_treeRadius = new Array();
    
    // first create array of calculated progressive radii
    var i_prevRadius = 0;
    for(var i = 0; i < arrayLength; i++){
        var i_recentRadius = i_prevRadius + this.ringTemperature(this.getRings()[i]['s_temperature']) + this.ringPrecipitation(this.getRings()[i]['s_moisture']);
         a_treeRadius.push(i_recentRadius);
         i_prevRadius = i_recentRadius;
    }
  
    // now reverse array and draw it
    var arrayLength = a_treeRadius.length;
    for (var i = (arrayLength - 1); i >= 0; i--) {
        ringRadius = a_treeRadius[i];
       
        // Early, light growth
        this.beginFill(0xcccc99);
        this.arc(0, 0, ringRadius, Math.PI / 2, 3 * Math.PI / 2);
        this.endFill();

        // Dark, late growth
        this.lineStyle(2, 0x996633);
        this.arc(0, 0, ringRadius, Math.PI / 2, 3 * Math.PI / 2);
        this.endFill();
        //reset linestyle
        this.lineStyle(0);
    }
    
};
