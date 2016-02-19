// Graph class/object
// Parameters: game object, x coord, y coord
Graph = function(game, x, y) {
	this.game = game;
	
    Phaser.Graphics.call(this, game, x, y, 'graph');
	
    //this.exists = true;
	
	this._init();
};

Graph.prototype = Object.create(Phaser.Graphics.prototype);
Graph.prototype.constructor = Graph;

// Inititalize
Graph.prototype._init = function() {
	// Size (x- and y-dimensions) of graph "paper"
	this.a_paperSize = [350, 150];
	
	// Margins between graphing area and surrounding graph 'paper'
	this._margins = {left: 10, top: 10, right: 10, bottom: 10};
	
	// Size (x- and y-dimensions) of graph area
	this.a_graphSize = [this.a_paperSize[0] - (this._margins.left + this._margins.right), this.a_paperSize[1] - (this._margins.top + this._margins.bottom)];
	
	// Coordinates (pixels) of graph origin point
	this.a_origin = [this._margins.left, this.a_paperSize[1] - this._margins.bottom];
	
	this._drawAxes();
};

Graph.prototype._drawAxes = function() {
	this.lineStyle(1, 0x000000, 1);
	
	// Draw x-axis
	this.moveTo(this.a_origin[0], this.a_origin[1]);
	this.lineTo(this.a_origin[0] + this.a_graphSize[0], this.a_origin[1]);
	
	// Draw y-axis
	this.moveTo(this.a_origin[0], this.a_origin[1]);
	this.lineTo(this.a_origin[0], this.a_origin[1] - this.a_graphSize[1]);
	
	// X-axis title
	var style = { font: "12px Arial", fill: "#000000", align: "center" };
	var xAxisTitleLoc = [this._margins.left + (0.5 * this.a_graphSize[0]), this.a_paperSize[1]];
	//var xTitle = this._margins.left + (0.5 * this.a_graphSize[0]);
	//var yTitle = this.a_paperSize[1];
	var xAxisTitle = this.game.add.text(xAxisTitleLoc[0], xAxisTitleLoc[1], "Year", style);
	//var xAxisTitle = this.add.text(0, 0, "Year", style, this);
	xAxisTitle.anchor.setTo(0.5, 1);
}

// reset the Graph to init conditions
Graph.prototype.resetGraph = function(){
    //this.setRings([]);
};

// Draw the Graph
/*Graph.prototype.update = function() {
    this.clear();
	
	this.beginFill(0x996633);
	this.arc(0, 0, 100, Math.PI/2, 3*Math.PI/2);
	this.endFill();
};*/

Graph.prototype.debug = function(){
    console.log(this);   
};