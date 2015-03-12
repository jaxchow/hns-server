/**
 *  
 *
 *
 *
 *
 *
 **/
var env = process.env.NODE_ENV || 'development';
env = env.toLowerCase();
var HttpServer = require('./application');
//var session = require('express-session');
//var bodyParser = require('body-parser');
//var cookieParser= require("cookie-parser");
//var multiparty = require('connect-multiparty');
var logger = require('morgan');
//var proxy = require('hns-proxy')
var favicon = require('serve-favicon');

var app = HttpServer();

app.use(favicon(__dirname + './../favicon.ico'));
app.use(logger('dev'));
//app.favicon(__dirname + '../favicon.ico');
app.use(function(req, res, next) {
    res._attr = Object.create(null);
    res.addAttr = function(key, value) {
        this._attr[key] = value;
    };
    res.attr = res.addAttr;

	res.addAttrs=function(obj){
		for(var o in obj){
			this._attr[o] = obj[o];
		}
	};
    res.getAttr = function(key) {
        return this._attr[key];
    };
    res.getAttrs = function() {
        return this._attr;
    };
    next();
});
app.mw('mw.static');
app.mw('mw.template');
app.mw('mw.uploader');

if (app.get('env') === 'development' || app.get('env') === 'debug') {
	app.mw('mw.livereload');
}


//require("./manager").manager;
require('./controller/index')(app, HttpServer);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('404', {
        message: err.message,
        error: err
    });
});

app.startup(3000);
