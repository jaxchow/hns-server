var assert = require('assert'),
	Browser= require('zombie'),
	CoffeeScript=require("coffee-script"),
	browser,app;

	CoffeeScript.register();

var HttpServer = require('../../app/application')
var	app	= HttpServer();
	app.mw('mw.attr');
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

describe('测试mw.attr组件',function(){

	it('should be successful',function(done){
		console.log(app.response.app);
		done();
	});

});
