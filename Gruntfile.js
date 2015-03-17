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
        bower: {
            install: {
                options: {
                    targetDir: './thirdparty/',
                }
            }
        },

        bowerRequirejs: {
            install: {
                rjsConfig: 'js/loader.js',
                options: {

                }
            }
        },
        //	less:{}
        //	requirejs: {}
        open: {
            browser: {
                path: 'http://127.0.0.1:3000/',
                app: 'Google Chrome'
            },
        },
        notify: {
            serveReady: {
                options: {
                    // Task-specific options go here. 
                    enabled: true,
                    max_jshint_notifications: 5, // maximum number of notifications from jshint output 
                    title: "hns server", // defaults to the name in package.json, or will use project directory's name 
                    success: true, // whether successful grunt executions should be notified automatically 
                    duration: 3,
                    message: 'Server is ready! http://localhost:3000/'
                }
            }
        },
        supervisor: {
            options: {
                script: "./app/app.js",
            },
            dev: {
                script: "./app/app.js",
                options: {
                    args: ["development"],
                    watch: ["app"],
                    pollInterval: 500,
                    extensions: ["js"],
                    exec: "node",
                    noRestartOn: "exit",
                    quiet: true,
                    forceSync: true
                }
            },
            prod: {
                script: "./app/app.js",
                options: {
                    args: ["production"],
                    quiet: true,
                    forceWatch: true,
                    forceSync: true
                }
            },
            debug: {
                script: "./app/app.js",
                options: {
                    args: ["debug"],
                    watch: ["app"],
                    ignore: ["test"],
                    pollInterval: 500,
                    extensions: ["js"],
                    exec: "node",
                    debug: true,
                    debugBrk: true,
                    harmony: true,
                    noRestartOn: "exit",
                    forceWatch: true,
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
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-open');

    //初始化symlink 建立
    grunt.registerTask('serve:debug', ['supervisor:debug', 'watch:livereload']);
    grunt.registerTask('serve:dev', ['supervisor:dev', 'notify:serveReady','open:browser','watch:livereload']);
    grunt.registerTask('serve:prod', ['supervisor:prod']);
    grunt.registerTask('default', ['watch']);
};
