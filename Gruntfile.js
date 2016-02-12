module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.renameTask('watch', 'delta');
    grunt.initConfig({
        express: {
            devServer: {
                options: {
                    port: 9000,
                    hostname: '0.0.0.0',
                    serverreload: false,
                    bases: '.',
                    livereload: true
                }
            }
        },
        delta: {
            css: {
                files: 'css/**/*.css',
                options: {
                    livereload: true,
                },
            },
            src: {
                files: ['**/*.html', 'Gruntfile.js', 'js/**/*.js'],
            },
            options: {
                livereload: true
            }
        }
    });
    grunt.registerTask('watch', [ 'express', 'delta' ]);


    grunt.registerTask('default', ['watch']);

};