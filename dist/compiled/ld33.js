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

	g_game.phaserGame = new Phaser.Game(width, height, Phaser.AUTO,   '',     null,       false,          false);
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
	jumpTimer: 0,
	shootTimer: 0

};
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
	g_game.enemyUnits.add(new UnitAi(this.game, 16 * 48, 6 * 48, 'enemy'));
	g_game.enemyUnits.add(new UnitAi(this.game, 22 * 48, 6 * 48, 'enemy'));

	g_game.cursors = this.game.input.keyboard.createCursorKeys();

	g_game.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.C);

	//  Create a group
	g_game.friendlyBullets = this.game.add.group();

	//  Add 20 sprites to it - the 'false' parameter sets them all to dead
	g_game.friendlyBullets.createMultiple(20, 'bullet', 0, false);
	this.game.physics.enable(g_game.friendlyBullets);
	g_game.friendlyBullets.setAll('anchor.x', 0.5);
	g_game.friendlyBullets.setAll('anchor.y', 0.5);
	g_game.friendlyBullets.setAll('outOfBoundsKill', true);

};
/**
 * Created by jonas on 2015-08-22.
 */


GameState.prototype.preload = function() {
	this.game.load.tilemap('map', 'assets/map.json?' + Math.random(), null, Phaser.Tilemap.TILED_JSON);

	this.game.load.image('level', 'assets/level.png');

	this.game.load.image('bullet', 'assets/bullet.png');

	this.game.load.spritesheet('character', 'assets/character.png', 30, 48);
	this.game.load.spritesheet('enemy', 'assets/enemy.png', 30, 48);
};

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