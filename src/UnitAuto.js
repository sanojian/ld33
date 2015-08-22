/**
 * Created by jonas on 2015-08-22.
 */

var UnitAuto = function (game, cx, cy, spriteName, team, actions) {

	Unit.call(this, game, cx, cy, spriteName, team);

	this.mySpeed = g_game.hozMove;

	this.actions = actions;
	this.actionCounter = 0;

};

UnitAuto.prototype = Object.create(Unit.prototype);
UnitAuto.prototype.constructor = UnitAuto;

UnitAuto.prototype.update = function() {

	if (!this.alive) {
		return;
	}
	if (this.actions[this.actionCounter] & 4) {
		this.runDirection(1);
	}
	else if (this.actions[this.actionCounter] & 8) {
		this.runDirection(-1);
	}
	else {
		this.runDirection(0);
	}

	if (this.actions[this.actionCounter] & 16) {
		this.jump();
	}
	if (this.actions[this.actionCounter] & 2) {
		this.fireGun();
	}
	this.actionCounter++;

	Unit.prototype.update.call(this);
};