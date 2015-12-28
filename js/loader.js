
 /**
 *
 *  widget       loader加载器
 *  author       @{author}
 *  modifyTime   @{modifyTime}
 *  version       @{version}
 *  description   自定义 validate rules
 *
 */
require.config({
    baseUrl: "/js/",
    waitSeconds: 15,
    shim: {
        'jquery': {
            exports: 'jQuery'

        }
    },
    paths: {
        
        'jquery': '../thirdparty/jquery/jquery.min',
        'jquery.validation': '../thirdparty/jquery.validation/dist/jquery.validate',
        'css': '../thirdparty/require-css/css',
        'css-builder': '../thirdparty/require-css/css-builder',
        'normalize': '../thirdparty/require-css/normalize',
        'requirejs': '../thirdparty/requirejs/require',
        'requirejs-domready': '../thirdparty/requirejs-domready/domReady',
        'requirejs-text': '../thirdparty/requirejs-text/text',
        'module.grared':'wechat/module.grared',      
        'module.redrian':'wechat/module.redrian', 
        'module.formdata':'wechat/module.formdata'

    },
    packages: [
        /*
        {
            name: 'module/member',
            location: 'www',
            main: 'module.member.js'
        }
        */
    ],
    deps: [
        'jquery'
    ],
    callback: function(jQuery) {
        var module = jQuery("body").data("module");
        require([module], function(dom, browserError) {});
    }
});