// To do:
//   Add parameter to specify graphing of moisture or temperature or both
//   Add parameter to specify # of years along the x-axis
//   Maybe add parameter to specify graph paper size


// Graph class/object
// Parameters: game object, x coord, y coord
Graph = function(game) {
	this.game = game;
    Phaser.Group.call(this, game);
	this._init();
};

Graph.prototype = Object.create(Phaser.Group.prototype);
Graph.prototype.constructor = Graph;

// Inititalize
Graph.prototype._init = function() {
	// Size (x- and y-dimensions) of graph "paper"
	this.a_paperSize = [450, 150];
	
	// Margins between graphing area and surrounding graph 'paper'
	this._margins = {left: 110, top: 10, right: 10, bottom: 40};
	
	// Size (x- and y-dimensions) of graph area
	this.a_graphSize = [this.a_paperSize[0] - (this._margins.left + this._margins.right), this.a_paperSize[1] - (this._margins.top + this._margins.bottom)];
	
	// Coordinates (pixels) of graph origin point
	this.a_origin = [this._margins.left, this.a_paperSize[1] - this._margins.bottom];
	
	/////////////////////////////////////////////////////////////
	// Temporary for development - draw outline of graph paper //
	/////////////////////////////////////////////////////////////
	this._drawPaper();
	/////////////////////////////////////////////////////////////
	
	this._drawAxes();
};

Graph.prototype._drawAxes = function() {
	this._axes = this.game.add.graphics(this.a_origin[0], this.a_origin[1]);
	this.add(this._axes);
	
	this._axes.lineStyle(1, 0x000000, 1);
	
	// Draw x-axis
	this._axes.moveTo(0, 0);
	this._axes.lineTo(this.a_graphSize[0], 0);
	
	// Draw y-axis
	this._axes.moveTo(0, 0);
	this._axes.lineTo(0, -1 * this.a_graphSize[1]);
	
	// X-axis title
	var style = { font: "14px Arial", fill: "#000000", align: "center" };
	//var style = { font: "14px Arial", fill: "#000000", align: "center", backgroundColor: "#cccccc" };
	var xAxisTitleLoc = [this._margins.left + (0.5 * this.a_graphSize[0]), this.a_paperSize[1]];
	var xAxisTitle = this.game.add.text(xAxisTitleLoc[0], xAxisTitleLoc[1], "Year", style);
	xAxisTitle.anchor.setTo(0.5, 1);
	this.add(xAxisTitle);
	
	// X-axis value labels
	style = { font: "12px Arial", fill: "#000000", align: "center" };
	//style = { font: "12px Arial", fill: "#000000", align: "center", backgroundColor: "#aaaaaa" };
	var xAxisValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	var xValuesVerticalLoc = this.a_paperSize[1] - this._margins.bottom;
	var xValuesMargin = 20; // Indent (on both left and right ends) of first/last value label
	var xValuesSpacing = (this.a_graphSize[0] - (2 * xValuesMargin))/(xAxisValues.length - 1);
	for (i = 0; i < xAxisValues.length; i++) {
		xLoc = this.a_origin[0] + xValuesMargin + (i * xValuesSpacing);
		valueLabel = this.game.add.text(xLoc, xValuesVerticalLoc, xAxisValues[i].toString(), style);
		valueLabel.anchor.setTo(0.5, 0);
		this.add(valueLabel);
	}
	
	// Y-axis value labels
	style = { font: "14px Arial", fill: "#cc6666", align: "right" };
	//style = { font: "14px Arial", fill: "#cc6666", align: "right", backgroundColor: "#ffcccc" };
	var yAxisValues = ["Cool", "Normal", "Warm"];
	var yValuesHorizontalLoc = 50;
	var yValuesMargin = 20; // Indent (on both top and bottom) of first/last value label
	var yValuesSpacing = (this.a_graphSize[1] - (2 * yValuesMargin))/(yAxisValues.length - 1);
	for (i = 0; i < yAxisValues.length; i++) {
		yLoc = this.a_origin[1] - (yValuesMargin + (i * yValuesSpacing));
		valueLabel = this.game.add.text(yValuesHorizontalLoc, yLoc, yAxisValues[i], style);
		valueLabel.anchor.setTo(1, 0.5);
		this.add(valueLabel);
	}
	
	style = { font: "14px Arial", fill: "#6666cc", align: "right" };
	//style = { font: "14px Arial", fill: "#6666cc", align: "right", backgroundColor: "#ccccff" };
	yAxisValues = ["Dry", "Normal", "Wet"];
	yValuesHorizontalLoc = 105;
	for (i = 0; i < yAxisValues.length; i++) {
		yLoc = this.a_origin[1] - (yValuesMargin + (i * yValuesSpacing));
		valueLabel = this.game.add.text(yValuesHorizontalLoc, yLoc, yAxisValues[i], style);
		valueLabel.anchor.setTo(1, 0.5);
		this.add(valueLabel);
	}
	
};

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

Graph.prototype._drawPaper = function() {
	var paper = this.game.add.graphics(0, 0);
	this.add(paper);
	paper.beginFill(0xccffcc);
	paper.drawRect(0, 0, this.a_paperSize[0], this.a_paperSize[1]);
	paper.endFill();
};