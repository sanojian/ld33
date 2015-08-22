/**
 * Created by jonas on 2015-08-22.
 */


GameState.prototype.preload = function() {
	this.game.load.tilemap('map', 'assets/map.json?' + Math.random(), null, Phaser.Tilemap.TILED_JSON);

	this.game.load.image('level', 'assets/level.png');

	this.game.load.image('bullet', 'assets/bullet.png');
	this.game.load.image('enemybullet', 'assets/enemybullet.png');

	this.game.load.spritesheet('character', 'assets/character.png', 30, 48);
	this.game.load.spritesheet('enemy', 'assets/enemy.png', 30, 48);
};
