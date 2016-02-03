TreeRings.GameLevel_4 = function(game) {
	this.game = game; // keep reference to main game object
	GameLevel.call(this, 4, 'game_level_4_bg');
};

TreeRings.GameLevel_4.prototype = Object.create(GameLevel.prototype);
TreeRings.GameLevel_4.prototype.constructor = TreeRings.GameLevel_4;

TreeRings.GameLevel_4.prototype.create = function() {
	GameLevel.prototype.create.apply(this);
	this.buildLevel();
};

TreeRings.GameLevel_4.prototype.buildLevel = function() { 
	var circle1 = this.add.graphics(0,0);
	circle1.lineStyle(2, 0x339933, 1);
	circle1.beginFill(0x99aa00);
	circle1.drawCircle(600, 50, 60);
};