module.exports = function (grunt) {

    // Displays the elapsed execution time of grunt tasks
    require('time-grunt')(grunt);

    // Load NPM Tasks
    require('load-grunt-tasks')(grunt, ['grunt-*']);

    // Project configuration.
    grunt.initConfig({

        // Store your Package file so you can reference its specific data whenever necessary
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            /*
                Note:
                In case there is a /release/ directory found, we don't want to lint that
                so we use the ! (bang) operator to ignore the specified directory
            */
            files: ['Gruntfile.js', './assets/**/*.js'],
            options: {
                curly:   true,
                eqeqeq:  true,
                immed:   true,
                latedef: true,
                newcap:  true,
                noarg:   true,
                sub:     true,
                undef:   true,
                boss:    true,
                eqnull:  true,
                browser: true,

                globals: {
                    // AMD
                    module:     true,
                    require:    true,
                    requirejs:  true,
                    define:     true,

                    // Environments
                    console:    true,

                    // General Purpose Libraries
                    $:          true,
                    jQuery:     true,

                    // Testing
                    sinon:      true,
                    describe:   true,
                    it:         true,
                    expect:     true,
                    beforeEach: true,
                    afterEach:  true
                }
            }
        },
        sass: {
            dist: {
                expand: true,
                cwd: './assets/sass/',
                src: ['*.scss'],
                dest: './assets/css/',
                ext: '.css'
            },
            dev: {
                options: {
                    style: 'expanded',
                    debugInfo: true,
                    lineNumbers: true
                },
                files: {
                    './assets/css/app.css': './assets/sass/app.scss',
                    './assets/css/hotella-res.css': './assets/sass/iframe.scss'
                }
                /*expand: true,
                cwd: './assets/sass/',
                src: ['*.scss'],
                dest: './assets/css/',
                ext: '.css'*/
            }
        },
        // Run: `grunt watch` from command line for this section to take effect
        watch: {
            files: ['<%= jshint.files %>', './assets/sass/app.scss', './assets/sass/iframe.scss'],
            options: { livereload: true },
            tasks: ['default']
        },

        //Run express server for livereload purposes
        express: {
            all: {
                options: {
                    port: 9000,
                    bases: ['.'],
                    livereload: true
                }
            }
        },

        open: {
            all: {
                path: 'http://localhost:<%= express.all.options.port %>'
            }
        }

    });

    // Default Task
    grunt.registerTask('default', ['jshint', 'sass:dev']);

    grunt.registerTask('serve', ['jshint', 'sass:dev', 'express', 'open', 'watch']);

    // Release Task
    grunt.registerTask('release', ['jshint', 'test', 'requirejs', 'sass:dist', 'imagemin', 'htmlmin']);

};
