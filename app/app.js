/**
 *  
 *
 *
 *
 *
 *
 **/
var HttpServer = require('./application');
//var session = require('express-session');
//var bodyParser = require('body-parser');
//var cookieParser= require("cookie-parser");
//var multiparty = require('connect-multiparty');
var logger = require('morgan');
//var proxy = require('hns-proxy')

var app = HttpServer();

//app.use(cookieParser());

app.use(logger('dev'));
/*
app.use(session({
    secret: 'ihomskey',
    cookie: {
        maxAge: 60000
    }
}));
*/

//app.use(bodyParser());
// static 
app.mw('mw.static');
app.mw('mw.template');
app.mw('mw.uploader');

app.use(function(req, res, next) {
    res._attr = Object.create(null);
    res.addAttr = function(key, value) {
        this._attr[key] = value;
    };
    res.attr = res.addAttr;
    res.getAttr = function(key) {
        return this._attr[key];
    };
    res.getAttrs = function() {
        return this._attr;
    };
    next();
});

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
