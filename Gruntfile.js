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
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    //初始化symlink 建立
    grunt.registerTask('default', ['watch']);
};
