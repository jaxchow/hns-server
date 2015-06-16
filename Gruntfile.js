module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            livereload: {
                files: ['css/**/*.less', 'views/**/*.html'],
                options: {
                    livereload: true,
                }
            }
        },
        requirejs: {
          compile: {
            options: {
              baseUrl: "path/to/base",
              mainConfigFile: "path/to/config.js",
              name: "path/to/almond", // assumes a production build using almond
              out: "path/to/optimized.js"
            }
          }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    //初始化symlink 建立
    grunt.registerTask('default', ['watch']);
};
