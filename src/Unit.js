/**
 * Created by jonas on 2015-08-22.
 */

var Unit = function (game, cx, cy, spriteName, team) {

	Phaser.Sprite.call(this, game, cx, cy, spriteName);

	this.mySpeed = g_game.hozMove;
	this.actions = [];
	this.myTeam = team;

	this.animations.add('run');

	this.game.physics.enable(this);

	this.body.bounce.y = 0.1;
	this.body.gravity.y = g_game.gravity;
	this.anchor.setTo(0.5, 1); //so it flips around its middle

};

Unit.prototype = Object.create(Phaser.Sprite.prototype);
Unit.prototype.constructor = Unit;

Unit.prototype.jump = function() {
	this.body.velocity.y = g_game.vertMove;

};

Unit.prototype.fireGun = function() {
	var bullet;

	if (this.myTeam === 'enemy') {
		bullet = g_game.enemyBullets.getFirstDead();
	}
	else {
		bullet = g_game.friendlyBullets.getFirstDead();
	}

	if (bullet) {
		//  And bring it back to life
		bullet.reset(this.x, this.y - this.height/2);
		this.game.physics.enable(bullet);
		bullet.body.velocity.x = this.scale.x * 600;
	}

};

Unit.prototype.runDirection = function(dir) {
	if (dir === 0) {
		this.animations.stop();
		this.frame = 0;
		this.body.velocity.x = 0;
		return;
	}
	this.body.velocity.x = dir * this.mySpeed;

	this.scale.x = dir; //flip sprite
	this.animations.play('run', 16, true);

};