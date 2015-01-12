/**
 *	express 应用扩展组件
 *	author : jaxchow@gmail.com
 *	date : 2014-11-08
 *	description : express 组件扩展增强自定义功能
 *
 * */
var express = require('express');
var utils=require("./utils");



express.application.mw=function(mw){
	var mw=require('./middleware/'+mw)(this);
}
express.application.startup = function(port) {
    this.listen(port, function(error) {
		console.log('hns listening on port:' + port);
    });
};

express.application.connect=function(){
	
}

express.response.render = function(view, options, fn) {
    options = options || {};
    var self = this;
    var req = this.req;
    var app = req.app;
    utils.mixin(options, this.getAttrs());
    // support callback function as second arg
    if ('function' == typeof options) {
        fn = options, options = {};
    };

    // merge res.locals
    options._locals = self.locals;
    // default callback to respond
    fn = fn || function(err, str) {
        if (err) return req.next(err);
        self.send(str);
    };
    app.render(view, options, fn);
};

exports= module.exports =express;

