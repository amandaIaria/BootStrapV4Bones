module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'style.css' : 'assets/style/style.scss'
				}
			}
		},
		php : {
			files_std : ['*.php', '**/*.php', '!node_modules/**/*.php'], // Standard file match
			files : '<%= paths.php.files_std %>' // Dynamic file match
		},
		js : {
			base : 'js', //Base dir
			src : '<%= paths.js.base %>/dev', // Development code
			dest : '<%= paths.js.base %>/prod', // Production code
			files_std : '**/<%= paths.js.src %>/**/*.js', // Standard file match
			files : '<%= paths.js.files_std %>' // Dynamic file match
		},
		jshint : {
			files : '<%= paths.js.files_std %>',
			tasks : ['jshint:all'],
			options : {
				spawn : false
			}
		},
		phplint : {
			files : '<%= paths.php.files_std %>',
			tasks : ['phplint'],
			options : {
				spawn : false
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'assets/scripts/src/<%= pkg.name %>.js',
				dest: 'assets/scripts/build/<%= pkg.name %>.min.js'
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			},
		//	php: {
		//		files: '**/*.php',
		//		tasks: ['phplint']
		//	},
			scripts: {
				files: 'assets/scripts/src/**/*.js',
				tasks: ['uglify']
				// tasks: ['jshint']
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks("grunt-phplint");
	grunt.loadNpmTasks('grunt-contrib-watch');

	//grunt.loadTasks("./tasks");
	grunt.registerTask('default',[ 'watch' ]);

};