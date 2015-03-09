
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define("module/index", [
            'bootstrap3','jquery.validation','widget.validation'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.jQuery
        );
    }
}(function(jQuery) {
	console.log("module/index");
}));
