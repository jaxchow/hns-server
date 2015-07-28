var assert = require('assert'),
	Browser= require('zombie'),
	CoffeeScript=require("coffee-script"),
	browser,app;

	CoffeeScript.register();

var HttpServer = require('../../app/application')
var	app	= new HttpServer();
	app.mw('mw.attr');
	app.mw('mw.velocity');
	app.mw('mw.404');
var server=app.listen(3333,function(){
	console.log("test server runing!");
});
Browser.localhost('example.com', 3333);
before(function(done){
	browser= new Browser();
	done();
});

after(function(done){
	server.close(function(){
		console.log("test server is shutdown!");
	});
	browser=null;
	done();
});

describe('测试404组件可用性，访问/www/index.html 不存在route',function(){
	before('visit:/sigup',function(done){
		browser.visit('/signup', done);
	});

	it('should be successful',function(done){
		browser.assert.success();
		done();
	});

	it('page title is "404 page"', function(done) {
		 browser.assert.text('title', '404 page');
		 done();
   	});
});
