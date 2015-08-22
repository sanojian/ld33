/**
 * Created by jonas on 2015-08-22.
 */

module.exports = function(grunt) {

	// Load Grunt tasks declared in the package.json file
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({

		watch: {
			scripts: {
				files: [
					'src/*.js'
				],
				tasks: ['build']
			}
		},
		jshint: {
			options: {
				evil: true
			},
			all: ['src/*.js']
		},
		concat: {
			basic_and_extras: {
				files: {
					'dist/ld33.js': [
						'src/main.js',
						'src/*.js'
					]
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-ssh');
	grunt.registerTask('monitor', [
		'watch'
	]);

	grunt.registerTask('build', ['jshint', 'concat']);
	grunt.registerTask('default', ['build','monitor']);

};
