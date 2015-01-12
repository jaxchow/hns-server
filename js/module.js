/*
 *   UI framework module AMD
 *
 *
 */
require.config({
    baseUrl:'/js',
   // urlArgs:"t="+(new Date()).getTime(),
    shim: {
        'jquery.validation':['jquery'],
        'bootstrap3':['jquery'],
    },
    paths: {
        'css': '../thirdparty/require-css/css',
        'domReady':'../thirdparty/requirejs-domready/domReady',
        'text':'../thirdparty/requirejs-text/text',
        'jquery': '../thirdparty/jquery/jquery',
        'bootstrap3':'../thirdparty/bootstrap/dist/js/bootstrap',
        'jquery.validation':'../thirdparty/jquery.validation/dist/jquery.validate',
    }
});

