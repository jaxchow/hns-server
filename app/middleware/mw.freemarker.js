"use strict";

var freemarker = require('freemarker-view');
var path = require("path");
//var toolbox=require("../toolbox")

module.exports = function(app) {
    app.engine('ftl', freemarker);
    app.set('view engine', 'ftl');
    app.set('views', path.join(__dirname, '../../views'));
	/*
    app.set('macros', "/macro/common.vm")
	app.set('toolbox',toolbox);
	app.use("/",function(req,res,next){
		res.addAttrs('toolbox',toolbox);
		next();
	})
	*/
    return app;
}
