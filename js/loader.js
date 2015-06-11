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
        'text': '../thirdparty/requirejs-text/text',
        css: '../thirdparty/require-css/css',
        'css-builder': '../thirdparty/require-css/css-builder',
        normalize: '../thirdparty/require-css/normalize',
        requirejs: '../thirdparty/requirejs/require',
        'domready': '../thirdparty/requirejs-domready/domReady',
        'react':'../thirdparty/react/react.js',
        'jquery.validation': '../thirdparty/jquery.validation/dist/jquery.validate',
        'jquery-validation.password': '../thirdparty/jquery-validation.password/jquery.validate.password',
        'jquery-cookie': '../thirdparty/jquery-cookie/jquery.cookie',
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
	//	console.log("callBack!",jQuery);
		require(['domready!','jquery.validation'],function(dom){
			//console.log(dom);
			jQuery(".validatorForm").validate();
		})
	}
});
