myGame.GameLevel_1 = function(game) {
	this.game = game; // keep reference to main game object
	GameLevel.call(this, 1, 'game_level_1_bg');
};

myGame.GameLevel_1.prototype = Object.create(GameLevel.prototype);
myGame.GameLevel_1.prototype.constructor = myGame.GameLevel_1;

myGame.GameLevel_1.prototype.create = function() {
	GameLevel.prototype.create.apply(this);
	this.buildLevel();
};

myGame.GameLevel_1.prototype.buildLevel = function() { 
	var circle1 = this.add.graphics(0,0);
	circle1.lineStyle(2, 0x339933, 1);
	circle1.beginFill(0x99aa00);
	circle1.drawCircle(600, 50, 60);
};