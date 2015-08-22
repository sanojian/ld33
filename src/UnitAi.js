/**
 * Created by jonas on 2015-08-22.
 */

var UnitAi = function (game, cx, cy, spriteName) {

	Unit.call(this, game, cx, cy, spriteName);

	this.mySpeed = g_game.hozMove/2;


};

UnitAi.prototype = Object.create(Unit.prototype);
UnitAi.prototype.constructor = UnitAi;

UnitAi.prototype.update = function() {

	if (this.x < g_game.player.x) {
		this.runDirection(1);
	}
	else if (this.x > g_game.player.x) {
		this.runDirection(-1);
	}

	Unit.prototype.update.call(this);
};