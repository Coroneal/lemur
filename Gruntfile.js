module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'src/**/*.js',
                dest: 'build/<%= pkg.name %>.<%= grunt.template.today("yyyy-mm-dd") %>.min.js'
            }
        },
        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    cleanTargetDir: true
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'src/main/webapp/resources/app/**/*.js']
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'src/main/webapp/dist/app.js'
            }
        },
        watch: {
            dev: {
                files: ['src/main/webapp/**/*.js', 'src/main/webapp/**/*.css', 'src/main/webapp/**/*.html'],
                tasks: ['jshint'],
                options: {
                    livereload: true,
                    atBegin: true
                }
            },
            min: {
                files: ['Gruntfile.js', 'app/*.js', '*.html'],
                tasks: ['jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'clean:temp', 'uglify:dist'],
                options: {
                    atBegin: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9000,
                    base: '.',
                    livereload: true
                }
            }
        },
        injector: {
            options: {
                transform: function (file, i, length) {
                    var base = 'src/main/webapp/';
                    return '<script src=' + file.substring(base.length) + '></script>';
                }
            },
            local_dependencies: {
                files: {
                    'src/main/webapp/resources/app/lemur/app.html': [
                        'src/main/webapp/resources/bower_components/angular/angular.js',
                        'src/main/webapp/resources/bower_components/angular-messages/angular-messages.js',
                        'src/main/webapp/resources/bower_components/angular-aria/angular-aria.js',
                        'src/main/webapp/resources/bower_components/angular-route/angular-route.js',
                        'src/main/webapp/resources/bower_components/angular-animate/angular-animate.js',
                        'src/main/webapp/resources/bower_components/angular-material/angular-material.js',
                        'src/main/webapp/resources/bower_components/spring-security-csrf-token-interceptor/dist/spring-security-csrf-token-interceptor.min.js',
                        'src/main/webapp/resources/bower_components/angular-cookies/angular-cookies.js',
                        'src/main/webapp/resources/bower_components/angular-resource/angular-resource.js',
                        'src/main/webapp/resources/bower_components/angular-sanitize/angular-sanitize.js',
                        'src/main/webapp/resources/bower_components/angular-touch/angular-touch.js',
                        'src/main/webapp/resources/bower_components/angular-ui-router/release/angular-ui-router.js',
                        'src/main/webapp/resources/bower_components/angular-material-sidenav/angular-material-sidenav.js',
                        'src/main/webapp/resources/app/**/*.js'
                    ],

                    'src/main/webapp/resources/app/login/login.html': [
                        'src/main/webapp/resources/bower_components/angular/angular.js',
                        'src/main/webapp/resources/bower_components/angular-messages/angular-messages.js',
                        'src/main/webapp/resources/bower_components/angular-aria/angular-aria.js',
                        'src/main/webapp/resources/bower_components/angular-route/angular-route.js',
                        'src/main/webapp/resources/bower_components/angular-animate/angular-animate.js',
                        'src/main/webapp/resources/bower_components/angular-material/angular-material.js',
                        'src/main/webapp/resources/bower_components/spring-security-csrf-token-interceptor/dist/spring-security-csrf-token-interceptor.min.js',
                        'src/main/webapp/resources/bower_components/angular-cookies/angular-cookies.js',
                        'src/main/webapp/resources/bower_components/angular-resource/angular-resource.js',
                        'src/main/webapp/resources/bower_components/angular-sanitize/angular-sanitize.js',
                        'src/main/webapp/resources/bower_components/angular-touch/angular-touch.js',
                        'src/main/webapp/resources/bower_components/angular-ui-router/release/angular-ui-router.js',
                        'src/main/webapp/resources/bower_components/angular-material-sidenav/angular-material-sidenav.js',
                        'src/main/webapp/resources/app/**/*.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-injector');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('install', ['bower']);
    grunt.registerTask('dev', ['bower', 'injector', 'jshint', 'connect', 'watch:dev']);
    grunt.registerTask('test', ['bower', 'jshint', 'karma:continuous']);
    grunt.registerTask('minified', ['bower', 'connect:server', 'watch:min']);
    grunt.registerTask('package', ['bower', 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'uglify:dist',
        'clean:temp', 'compress:dist']);

};