/**
 * Created by jonas on 2015-08-22.
 */

var Unit = function (game, cx, cy, spriteName) {

	Phaser.Sprite.call(this, game, cx, cy, spriteName);

	this.mySpeed = g_game.hozMove;

	this.animations.add('run');

	this.game.physics.enable(this);

	this.body.bounce.y = 0.1;
	this.body.gravity.y = g_game.gravity;
	this.anchor.setTo(0.5, 1); //so it flips around its middle

};

Unit.prototype = Object.create(Phaser.Sprite.prototype);
Unit.prototype.constructor = Unit;

Unit.prototype.runDirection = function(dir) {
	if (dir === 0) {
		g_game.player.animations.stop();
		g_game.player.frame = 0;
		this.body.velocity.x = 0;
		return;
	}
	this.body.velocity.x = dir * this.mySpeed;

	this.scale.x = dir; //flip sprite
	this.animations.play('run', 16, true);

};