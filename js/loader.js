/*
 *   UI framework module AMD
 *
 *
 */
require.config({
    baseUrl: '/js',
    shim: {
        'jquery.validation': [
            'jquery'
        ],
        bootstrap: [
            'jquery'
        ],
        jquery: {
            exports: 'jQuery'
        }
    },
    paths: {
        bootstrap: '../thirdparty/bootstrap/dist/js/bootstrap',
        jquery: '../thirdparty/jquery/jquery',
        'jquery.validation': '../thirdparty/jquery.validation/dist/jquery.validate',
        css: '../thirdparty/require-css/css',
        'css-builder': '../thirdparty/require-css/css-builder',
        normalize: '../thirdparty/require-css/normalize',
        requirejs: '../thirdparty/requirejs/require',
        'requirejs-domready': '../thirdparty/requirejs-domready/domReady',
        'requirejs-text': '../thirdparty/requirejs-text/text',
        webcomponentsjs: '../thirdparty/webcomponentsjs/webcomponents',
        'jquery-cookie': '../thirdparty/jquery-cookie/jquery.cookie',
        'jquery-validation.password': '../thirdparty/jquery-validation.password/jquery.validate.password',
        'jquery-dateFormat': '../thirdparty/jquery-dateFormat/dist/jquery-dateFormat'
    },
    packages: [
        {
            name: 'module/index',
            location: 'www',
            main: 'module.index.js'
        }
    ],
    deps: [
        'jquery',
        'bootstrap'
    ],
    callback: function (jQuery){
		console.log("callBack!",jQuery);
		require(['domReady!','module/index'],function(dom){
			console.log(dom);
		})
	}
});

