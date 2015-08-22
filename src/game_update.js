/**
 * Created by jonas on 2015-08-22.
 */


GameState.prototype.update = function() {

	// Using the physics.arcade system, check if 'player' is colliding
	//  with any tiles within 'layer'. If so, seperate them.
	this.game.physics.arcade.collide(g_game.friendlyUnits, g_game.layer);
	this.game.physics.arcade.collide(g_game.enemyUnits, g_game.layer);
	this.game.physics.arcade.collide(g_game.friendlyBullets, g_game.layer, bulletHitWall);
	this.game.physics.arcade.collide(g_game.friendlyBullets, g_game.enemyUnits, bulletHitEnemy);

	// Reset the x (horizontal) velocity
	g_game.player.body.velocity.x = 0;

	if (g_game.cursors.up.isDown && g_game.player.body.onFloor() && this.game.time.now > g_game.jumpTimer) {
		g_game.player.body.velocity.y = g_game.vertMove;
		g_game.jumpTimer = this.game.time.now + 150;

	}
	if (g_game.cursors.left.isDown) {
		g_game.player.runDirection(-1);
	}
	else if (g_game.cursors.right.isDown)
	{
		g_game.player.runDirection(1);
	}
	else {
		g_game.player.runDirection(0);
	}

	if (g_game.fireButton.isDown && this.game.time.now > g_game.shootTimer) {
		fireGun(this.game, g_game.player.scale.x);
	}

};

function bulletHitEnemy(bullet, enemy) {
	bullet.kill();
	enemy.kill();
}

function bulletHitWall(bullet, wall) {
	bullet.kill();
}

function fireGun(game, dir) {
	var bullet = g_game.friendlyBullets.getFirstDead();

	if (bullet) {
		//  And bring it back to life
		bullet.reset(g_game.player.x, g_game.player.y - g_game.player.height/2);
		game.physics.enable(bullet);
		bullet.body.velocity.x = dir * 600;

		g_game.shootTimer = game.time.now + 150;

	}
}