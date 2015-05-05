/*
 * grunt-contrib-typescript-module-path
 *
 * https://github.com/la-haute-societe/grunt-contrib-typescript-module-path
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt)
{
	grunt.initConfig({
        // Configure our custom plugin
		jsModulePath: {
			src: 'test/output/amd-modules.js',
            options: {
                varName: "__varName"
            }
		},

        // Clean output files
        clean: {
            src: 'test/output/*.js'
        },

		// Unit tests
		nodeunit: {
			tests: ['test/js-module-path-test.js']
		}
	});

    // Load our custom module
	grunt.loadTasks('tasks');

    // Load grunt tasks
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-clean');

    // Register copy task
	grunt.registerTask('copy', 'Copy test file', function()
    {
        // Copy our test file to the output directory
		grunt.file.copy('test/input/amd-modules.js', 'test/output/amd-modules.js');
	});

    // Register jsModulePath plugin test task
	grunt.registerTask('test', ['clean', 'copy', 'jsModulePath', 'nodeunit']);
};