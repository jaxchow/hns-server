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
        define("module.index", [
			'exports',
			'require',
			'jquery',
            'widget/formValidation',
        ], factory);
    } else {
        // Browser globals:
        module.exports=factory(
            window.jQuery
        );
    }
}(function(exports,require,jQuery,valiator) {
    var React=require('react');
    var SSOLoginApp=require('jsx!SSOLoginApp');
    var $ssoLoginEle=jQuery("div");
    React.render(React.createElement(SSOLoginApp, null),$ssoLoginEle[0]);
    $ssoLoginEle.prependTo(document.body);
	var module={
		name:"member"
	};
	return module;
}));
