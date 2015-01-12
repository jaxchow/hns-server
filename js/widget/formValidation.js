(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define("widget/formValiation", [
            'bootstrap3','jquery.validation'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.jQuery
        );
    }
}(function(jQuery) {
	jQuery(".formValidation").validation({
	});	
})
