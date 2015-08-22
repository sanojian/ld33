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

		if (g_game.facing !== "left") {
			g_game.facing = "left";
		}
	}
	else if (g_game.cursors.right.isDown)
	{
		g_game.player.body.velocity.x = g_game.hozMove;

		if (g_game.facing !== "right") {
			g_game.facing = "right";
		}
	}

	if (g_game.facing === "left") {
		g_game.player.frame = 1;
	} else {
		g_game.player.frame = 0;
	}

};
