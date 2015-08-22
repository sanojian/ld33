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