module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            livereload: {
                files: ['views/**/*.less'],
                options: {
                    livereload:false,
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
	//初始化symlink 建立
	grunt.registerTask('default',['watch']);
};
