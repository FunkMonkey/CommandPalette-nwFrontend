module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-typescript');

	// TODO: currently uses custom grunt-grunt, fix it!
	grunt.loadNpmTasks('grunt-grunt');
	//grunt.loadNpmTasks('grunt-tslint');
	
	// Project configuration.
	grunt.initConfig({

		grunt: {
			backend : {
				gruntfile: 'node_modules/CommandPalette-Backend/Gruntfile.js',
				task: 'typescript:declarations'
			}
		},
		
		typescript: {
			frontend: {
				src: ['source/**/*.ts'],
				dest: 'lib',
				options: {
					module: 'commonjs', //or commonjs
					target: 'es5', //or es3
					base_path: 'source',
					sourcemap: false,
					declaration: false
				}
			}
		},
		
		/*tslint: {
			options: {
				configuration: {
					curly: true,
					quotemark: true,
					"no-eval": true
				} //grunt.file.readJSON(".tslintrc")
			},
			files: {
				src: [ 'source/test.ts' ]
			}
		},*/
		
		watch:{

			typescript: {
				files: [ 'source/**/*.ts' ],
				tasks: ['typescript']
			},

			typescriptAll: {
				files: [ 'source/**/*.ts', 'node_modules/CommandPalette-Backend/source/**/*.ts' ],
				tasks: ['typescriptAll']
			}
		}
	});
	
	grunt.registerTask('typescriptAll', ['grunt:backend', 'typescript:frontend']);
	grunt.registerTask('default', [ 'typescript', 'watch:typescriptAll' ]);
};