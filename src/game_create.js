/**
 * Created by jonas on 2015-08-22.
 */

GameState.prototype.create = function() {

	this.game.stage.backgroundColor = '#FFFFFF';

	this.game.physics.startSystem(Phaser.Physics.ARCADE);

	var map = this.game.add.tilemap('map');
	map.addTilesetImage('level');
	g_game.layer = map.createLayer('Tile Layer 1');

	// Set the collision range
	//  Here, the range is from 0 (the first tile) to the fifth (last tile).
	map.setCollisionBetween(1, 5);

	// Tell the layer to resize the game 'world' to match its size
	g_game.layer.resizeWorld();

	g_game.player = this.game.add.sprite(2 * 48, 6 * 48, 'character');

	this.game.physics.enable(g_game.player);

	// Set the amount of bounce on the physics body of the 'player' sprite
	g_game.player.body.bounce.y = 0.1;

	g_game.player.body.gravity.y = g_game.gravity;

	this.game.camera.follow(g_game.player);

	g_game.cursors = this.game.input.keyboard.createCursorKeys();

	g_game.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
};