/**
 * Created by jonas on 2015-08-22.
 */

var GameState = function(game) {
};

function init() {


	var Boot = function(game) {};
	Boot.prototype = {
		preload: function() {

			//this.load.image('preloaderBar', 'assets/gfx/loading-bar.png');
			//this.load.image('splashBackground', 'assets/gfx/Background.png');

		},
		create: function() {

			this.game.stage.smoothed = false;
			this.scale.minWidth = g_game.baseWidth;
			this.scale.minHeight = g_game.baseHeight;
			this.scale.maxWidth = g_game.baseWidth * 3;
			this.scale.maxHeight = g_game.baseHeight * 3;
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
			//this.scale.setScreenSize(true);
			this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); };

			this.state.start('game');
		}
	};

	var width = navigator.isCocoonJS ? window.innerWidth : g_game.baseWidth;
	var height = navigator.isCocoonJS ? window.innerHeight : g_game.baseHeight;

	g_game.phaserGame = new Phaser.Game(width, height, Phaser.CANVAS,   '',     null,       false,          false);
	g_game.phaserGame.state.add('Boot', Boot);
	g_game.phaserGame.state.add('game', GameState);
	g_game.phaserGame.state.start('Boot');

	/*WebFontConfig = {

		//  'active' means all requested fonts have finished loading
		//  We set a 1 second delay before calling 'createText'.
		//  For some reason if we don't the browser cannot render the text the first time it's created.
		active: createText, //function() { g_game.phaserGame.time.events.add(Phaser.Timer.SECOND, createText, this); },

		//  The Google Fonts we want to load (specify as many as you like in the array)
		google: {
			families: ['Press Start 2P']
		}

	};*/

	/*var game = new Phaser.Game(
		720, 384, // The width and height of the game in pixels
		Phaser.AUTO, // The type of graphic rendering to use
		// (AUTO tells Phaser to detect if WebGL is supported.
		//  If not, it will default to Canvas.)
		'phaser-game', // The parent element of the game
		{preload: preload, // The preloading function
			create: create, // The creation function
			update: update}); // The update (game-loop) function
*/


}

window.g_game = {
	baseWidth: 16*48,
	baseHeight: 9*48,

	gravity: 1200,
	facing: "left",
	hozMove: 160,
	vertMove: -360,
	jumpTimer: 0

};
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

	g_game.player = this.game.add.sprite(4 * 48, 6 * 48, 'character');
	g_game.player.animations.add('run');

	this.game.physics.enable(g_game.player);

	g_game.player.body.bounce.y = 0.1;
	g_game.player.body.gravity.y = g_game.gravity;
	g_game.player.anchor.setTo(0.5, 1); //so it flips around its middle
	this.game.camera.follow(g_game.player);

	g_game.cursors = this.game.input.keyboard.createCursorKeys();

	g_game.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
};
/**
 * Created by jonas on 2015-08-22.
 */


GameState.prototype.preload = function() {
	this.game.load.tilemap('map', 'assets/map.json?' + Math.random(), null, Phaser.Tilemap.TILED_JSON);

	this.game.load.image('level', 'assets/level.png');

	this.game.load.spritesheet('character', 'assets/character.png', 30, 48);
};

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
