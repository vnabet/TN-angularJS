module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        assetsDir: 'app',
        distDir: 'dist',

        'bower-install': {
            target: {
                html: '<%= assetsDir %>/index.html',
                ignorePath: '<%= assetsDir %>/',
                jsPattern: '<script type="text/javascript" src="{{filePath}}"></script>',
                cssPattern: '<link rel="stylesheet" href="{{filePath}}" >'
            }
        },
        clean: {
            dist: ['.tmp', '<%= distDir %>']
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= assetsDir %>',
                    dest: '<%= distDir %>/',
                    src: [
                        'index.html',
                        'img/**'
                    ]
                }]
            }
        },
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/js',
                    src: '*.js',
                    dest: '.tmp/concat/js'
                }]
            }
        },
        useminPrepare: {
            html: '<%= assetsDir %>/index.html'
        },
        usemin: {
            html: '<%= distDir %>/index.html'
        },
        browser_sync: {
            dev: {
                bsFiles: {
                    src : ['<%= assetsDir %>/**/*.html', '<%= assetsDir %>/**/*.js', '<%= assetsDir %>/**/*.css']
                },
                options: {
                    watchTask: true,
                        ghostMode: {
                        clicks: true,
                            scroll: true,
                            links: false,
                            forms: true
                    },
                    server: {
                        baseDir: "<%= assetsDir %>"
                    }
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all : {
                src : ['<%= assetsDir %>/js/**/*.js']
            }
        },
        watch: {
            options : {
                interrupt: true
            },
            js: {
                files: ['<%= assetsDir %>/js/**/*.js'],
                tasks: ['newer:jshint' ]
            },
            html : {
                files: ['<%= assetsDir %>/**/*.html']
            },
            css: {
                files: ['<%= assetsDir %>/css/**/*.css']
            }
        },
        connect: {
            test : {
                options: {
                    port: 8887,
                        base: '<%= assetsDir %>',
                        keepalive: false,
                        livereload: false,
                        open: false
                }
            }
        }
    });

    
    
    
    grunt.registerTask('dev', ['browser_sync',  'watch']);
    grunt.registerTask('package', ['jshint', 'clean', 'useminPrepare', 'copy', 'concat', 'ngmin', 'uglify',  'cssmin' , , 'usemin']);
    grunt.registerTask('default', ['package'   ]);


};