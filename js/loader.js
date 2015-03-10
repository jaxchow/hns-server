/*
 *   UI framework module AMD
 *
 *
 */
require.config({
    baseUrl:'/jsc',
   // urlArgs:"t="+(new Date()).getTime(),
//	less: {
//		relativeUrls: true
//	},
    shim: {
        'jquery.validation':['jquery'],
        'bootstrap3':['jquery'],
		'jquery':{
			exports:'jQuery'
		}
    },
    paths: {
        'css': '../thirdparty/require-css/css',
		'css-builder': '../thirdparty/require-css/css-builder',
		'normalize': '../thirdparty/require-css/normalize',
        'domReady':'../thirdparty/requirejs-domready/domReady',
        'text':'../thirdparty/requirejs-text/text',
        'jquery': '../thirdparty/jquery/jquery',
        'bootstrap3':'../thirdparty/bootstrap/dist/js/bootstrap',
        'jquery.validation':'../thirdparty/jquery.validation/dist/jquery.validate',
		'widget.formValidation':'widget/formValidation'
    },
	packages: [{
            name: 'module/index',
			location:"www",
            main: 'module.index.js'
	}],
	deps:['jquery','bootstrap3'],
	callback:function(jQuery){
		console.log("callBack!",jQuery);
		require(['domReady!','module/index'],function(dom){
			console.log(dom);
		})
	}
});

