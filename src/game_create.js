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

	//g_game.player = this.game.add.sprite(4 * 48, 6 * 48, 'character');
	g_game.friendlyUnits = this.game.add.group();
	g_game.player = new Unit(this.game, 4 * 48, 6 * 48, 'character');
	g_game.friendlyUnits.add(g_game.player);
	this.game.camera.follow(g_game.player);

	g_game.enemyUnits = this.game.add.group();
	g_game.enemyUnits.add(new UnitAi(this.game, 16 * 48, 6 * 48, 'enemy', 'enemy'));
	g_game.enemyUnits.add(new UnitAi(this.game, 22 * 48, 6 * 48, 'enemy', 'enemy'));

	g_game.cursors = this.game.input.keyboard.createCursorKeys();

	g_game.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
	g_game.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	//  Create a group
	g_game.friendlyBullets = this.game.add.group();

	//  Add 20 sprites to it - the 'false' parameter sets them all to dead
	g_game.friendlyBullets.createMultiple(20, 'bullet', 0, false);
	this.game.physics.enable(g_game.friendlyBullets);
	g_game.friendlyBullets.setAll('anchor.x', 0.5);
	g_game.friendlyBullets.setAll('anchor.y', 0.5);
	g_game.friendlyBullets.setAll('outOfBoundsKill', true);

	//  Create a group
	g_game.enemyBullets = this.game.add.group();

	//  Add 20 sprites to it - the 'false' parameter sets them all to dead
	g_game.enemyBullets.createMultiple(20, 'enemybullet', 0, false);
	this.game.physics.enable(g_game.friendlyBullets);
	g_game.enemyBullets.setAll('anchor.x', 0.5);
	g_game.enemyBullets.setAll('anchor.y', 0.5);
	g_game.enemyBullets.setAll('outOfBoundsKill', true);

	var self = this;
	setTimeout(function() {
		g_game.enemyUnits.add(new UnitAuto(self.game, 4 * 48, 6 * 48, 'enemy', 'enemy', g_game.player.actions));
	}, 3000);
};