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
		'react':{
			exports:'React'
		},
        jquery: {
            exports: 'jQuery'
        }
    },
	jsx: {
       fileExtension: '.jsx'
    },
    paths: {
        bootstrap: '../thirdparty/bootstrap/dist/js/bootstrap',
        jquery: '../thirdparty/jquery/jquery',
        'text': '../thirdparty/requirejs-text/text',
        css: '../thirdparty/require-css/css',
        'css-builder': '../thirdparty/require-css/css-builder',
        'jsx':"../thirdparty/requirejs-react-jsx/jsx",
        normalize: '../thirdparty/require-css/normalize',
        requirejs: '../thirdparty/requirejs/require',
        'domready': '../thirdparty/requirejs-domready/domReady',
        'react':'../thirdparty/react/react',
        'JSXTransformer':"../thirdparty/react/JSXTransformer",
        'react-bootstrap':"../thirdparty/react-bootstrap/react-bootstrap",
		'es5-shim':"../thirdparty/es5-shim/es5-shim",
		'es5-sham':"../thirdparty/es5-shim/es5-sham",
        'classnames':"../thirdparty/classnames/index",
        'jquery.validation': '../thirdparty/jquery.validation/dist/jquery.validate',
        'jquery-validation.password': '../thirdparty/jquery-validation.password/jquery.validate.password',
        'jquery-cookie': '../thirdparty/jquery-cookie/jquery.cookie',
        'jquery-dateFormat': '../thirdparty/jquery-dateFormat/dist/jquery-dateFormat',
		'markdown':"./react/markdown.react",
    },
    packages: [
        {
            name: 'module.index',
            location: 'www',
            main: 'module.index.js'
        },{
            name:'SSOLoginApp',
            location:'react',
            main:'SSOLoginApp.react'
        }
    ],
    deps: [
        'jquery',
        'bootstrap'
    ],
    callback: function (jQuery){
		require(['domready!','module.index'],function(dom){

		});
	}
});
