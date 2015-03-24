/**
 *
 *	 @license Copyright (c) 2013-2015, The hundsun Foundation All Rights Reserved.
 *
 *	widget封装基本模型
 *  @Author：	zhouhuan@hundsun.com
 *  @CreateDate:2015.01.01
 *	@modifyTime: @{modifyTime}
 *	@descript:	这里是描述功能作用
 *
 * */

(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define("widget/formValidation", [
            'exports',
            'jquery',
			'requirejs-text!widget/formValidation.html',
			//other require  
            'jquery.validation',
			'css!widget/formValidation',
        ], factory);
    } else {
        // Browser globals:
        module.exports = factory(
            window.jQuery
        );
    }
}(function(exports, jQuery,n,template) {
	console.log(arguments);
   /* var validator = jQuery(".validatorForm").validate({
        // jquery.validaion config	
    });*/

   // return exports.validator = validator;
}));
