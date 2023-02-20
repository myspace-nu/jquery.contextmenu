module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*!\n' +
					' * jQuery Context Menu Plugin v<%= pkg.version %>\n' +
					' * https://github.com/myspace-nu\n' +
					' *\n' +
					' * Released under the MIT license\n' +
					' */\n'
			},
			build: {
				src: 'src/jquery.contextmenu.js',
				dest: 'dist/jquery.contextmenu.min.js'
			}
		},
		eslint: {
			target: ['src/jquery.contextmenu.js']
		},
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'dist/jquery.contextmenu.min.css': ['src/jquery.contextmenu.css']
				}
			}
		},
		copy: {
			files: {
				cwd: 'src/images',  // set working folder / root to copy
				src: '**/*',           // copy all files and subfolders
				dest: 'dist/images',    // destination folder
				expand: true           // required when using cwd
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default', ['eslint', 'uglify', 'cssmin', 'copy']);
};