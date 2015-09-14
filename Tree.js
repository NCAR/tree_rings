// Tree object
// game object, x coord, y coord, radius, climateHistory object
Tree = function(game, x, y, radius, climateHistory) {
    Phaser.Graphics.call(this, game, x, y, 'tree');
    this.i_radius = 0;
    this.a_rings = [];
    this.baseRadius = radius;
    this.a_climateHistory = climateHistory;
}

Tree.prototype = Object.create(Phaser.Graphics.prototype);
Tree.prototype.constructor = Tree;

// add to the radius
Tree.prototype.addRadius = function() {
    this.i_radius += this.baseRadius;
};
// subtract from the radius
Tree.prototype.subtractRadius = function() {
    this.i_radius -= this.baseRadius;
    if (this.i_radius < 0) {
        this.i_radius = 0;
    }
};
// add a ring
Tree.prototype.addRing = function(s_temperature, s_moisture) {
    //this.addRadius();
    this.a_climateHistory.addYear(s_temperature, s_moisture);
    this.a_rings.push({s_temperature, s_moisture});
};
// add a ring
Tree.prototype.removeRing = function() {
    this.subtractRadius();
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
// provide a preset for radius
Tree.prototype.setRadius = function(value){
    this.i_radius = value;
};
// return radius
Tree.prototype.getRadius = function(){
    return this.i_radius;
};
// reset the tree to init conditions
Tree.prototype.resetTree = function(){
    this.setRings([]);
    this.setRadius(0);  
};
// provide a value for each temperature condition
Tree.prototype.ringTemperature = function(index) {
    //var cond = this.a_climateHistory.getAnnualConditions();

    //var type = cond[index][0];
    switch (index) {
        case 'cool':
            return .5;
            break;
        case 'normal':
            return 2;
            break;
        case 'warm':
            return 3;
            break;
    }
    return 0;
};
// provide a value for each precipitation condition
Tree.prototype.ringPrecipitation = function(index) {
   // var cond = this.a_climateHistory.getAnnualConditions();
   // var type = cond[index][1];
    switch (index) {
        case 'dry':
            return 1;
            break;
        case 'normal':
            return 4;
            break;
        case 'wet':
            return 8;
            break;
    }
    //return 0;
};
// swap out climateHistory
Tree.prototype.changeClimateHistory = function(newClimateHistory){
    this.a_climateHistory = newClimateHistory;
    this.resetTree();
    
    // redo rings for current climatehistory
    var arrayLength = this.a_climateHistory.getAnnualConditions().length;
    for (var i = (arrayLength - 1); i >= 0; i--) {
           this.addRing();
    }
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
  
    var arrayLength = a_treeRadius.length;
    for (var i = (arrayLength - 1); i >= 0; i--) {

        ringRadius = a_treeRadius[i];
       // console.log('Ring '+i+': Precip: '+this.ringPrecipitation(i)+' Temp: '+ this.ringTemperature(i)+' baseRadius: '+this.getRings()[i]+' for total ring radius: '+ringRadius);

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
