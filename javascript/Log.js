// Tree Class - extends Sprite class

Log = function(game, x, y, treeRadius) {
    //this._currentLevel = currentGameLevel;
	
	Phaser.Sprite.call(this, game, x, y);
	
    this._treeRadius = treeRadius;
};

Log.prototype.create = function() {
	console.log('Tree/Log class instance created, extending Sprite class');
	
	var circle1 = this.add.graphics(0,0);
	circle1.lineStyle(2, 0x339933, 1);
	circle1.beginFill(0x99aa00);
	circle1.drawCircle(600, 50, this._treeRadius);
};