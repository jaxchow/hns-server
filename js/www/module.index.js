/**
 *
 *	 @license Copyright (c) 2013-2015, The hundsum Foundation All Rights Reserved.
 *
 *	模块封装基本模型
 *  @Author：	zhouhuan@hundsun.com
 *  @Descript:
 *	@modifyTime: @{modifyTime}
 *	@descript:	这里是描述功能作用
 *
 * */

(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define("module/index", [
			'exports',
			'jquery',
            'widget/formValidation'
        ], factory);
    } else {
        // Browser globals:
        module.exports=factory(
            window.jQuery
        );
    }
}(function(exports,jQuery,valiator) {
	console.log(arguments);
	var module={
		name:"member"
	};
	return module;
}));
