"use strict";

var velocity = require('velocity-view');
var path = require("path");
var toolbox=require("../toolbox")

module.exports = function(app) {
    app.engine('.html', velocity.__express);
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, '../../views'));
    app.set('macros', "/macro/common.vm")
	app.set('toolbox',toolbox);
	app.use("/",function(req,res,next){
		res.addAttrs('toolbox',toolbox);
		next();
	})
    return app;
}
