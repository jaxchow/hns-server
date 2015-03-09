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
        //	less:{}
        //	requirejs: {}
		/*
        express: {
            options: {
                // Override defaults here 
                script: './app/app.js',
                background: false,
            },
            dev: {
                options: {
                    node_env: 'develop'
                }
            },
            prod: {
                options: {
                    node_env: 'production'
                }
            },
            test: {}
        },
		*/
        supervisor: {
            target: {
                script: "./app/app.js",
                options: {
                    args: ["develop"],
                    watch: ["app"],
                    // ignore: ["test"],
                    pollInterval: 500,
                    extensions: ["js"],
                    exec: "node",
                   // debug: true,
                   // debugBrk: true,
                   // harmony: true,
                    noRestartOn: "exit",
                   // forceWatch: true,
                    quiet: true,
                    forceSync: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-supervisor');
    //初始化symlink 建立
    grunt.registerTask('default', ['watch']);
};
