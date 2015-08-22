/**
 * Created by jonas on 2015-08-22.
 */


GameState.prototype.update = function() {

	// Using the physics.arcade system, check if 'player' is colliding
	//  with any tiles within 'layer'. If so, seperate them.
	this.game.physics.arcade.collide(g_game.player, g_game.layer);

	// Reset the x (horizontal) velocity
	g_game.player.body.velocity.x = 0;

	if (g_game.cursors.up.isDown && g_game.player.body.onFloor() && this.game.time.now > g_game.jumpTimer) {
		g_game.player.body.velocity.y = g_game.vertMove;
		g_game.jumpTimer = this.game.time.now + 150;

	}
	if (g_game.cursors.left.isDown) {
		g_game.player.body.velocity.x = -g_game.hozMove;

		g_game.player.scale.x = -1; //flip sprite
		g_game.player.animations.play('run', 16, true);
	}
	else if (g_game.cursors.right.isDown)
	{
		g_game.player.body.velocity.x = g_game.hozMove;

		g_game.player.scale.x = 1; //facing default direction
		g_game.player.animations.play('run', 16, true);

	}
	else {
		g_game.player.animations.stop();
	}

};
