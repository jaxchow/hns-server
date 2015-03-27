/*
 *   UI framework module AMD
 *
 *
 */
require.config({
    baseUrl: '/js',
    shim: {
    	jquery: {
			exports: 'jQuery'
        },
    	bootstrap: [
            'jquery'
        ],
		'jquery.validation': [
            'jquery'
        ],
        'jquery-validation.password':['jquery.validation'],
		'widget/message':['bootstrap','requirejs-text!widget/message.html']
    },
    paths: {
        'bootstrap': '../thirdparty/bootstrap/dist/js/bootstrap',

        'jquery': '../thirdparty/jquery/jquery',
        'jquery.validation': '../thirdparty/jquery.validation/dist/jquery.validate',
        'css': '../thirdparty/require-css/css',
        'css-builder': '../thirdparty/require-css/css-builder',
        'normalize': '../thirdparty/require-css/normalize',
        'requirejs': '../thirdparty/requirejs/require',
        'requirejs-domready': '../thirdparty/requirejs-domready/domReady',
        'requirejs-text': '../thirdparty/requirejs-text/text',
        'webcomponentsjs': '../thirdparty/webcomponentsjs/webcomponents',
        'jquery-cookie': '../thirdparty/jquery-cookie/jquery.cookie',
        'jquery-validation.password': '../thirdparty/jquery-validation.password/jquery.validate.password',
        'css!jquery.validation.password-css': '../thirdparty/jquery-validation.password/jquery.validate.password',
        'jquery-dateFormat': '../thirdparty/jquery-dateFormat/dist/jquery-dateFormat',

        'requirejs-text!widget/message.html':'../js/widget/message',
        'widget/message':'../js/widget/message'
    },
    packages: [
        {
            name: 'module/index',
            location: 'www',
            main: 'module.index.js'
        },
          {
            name: 'module/register',
            location: 'www',
            main: 'module.register.js'
        }
    ],
    deps: [
        'jquery',
        'bootstrap'
    ],
    callback: function (jQuery){
		console.log("callBack!",jQuery);
		require(['module/register'],function(dom){

		})
	}
});

