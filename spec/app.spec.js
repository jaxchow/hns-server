var assert = require('assert'),
	Browser= require('zombie'),
	CoffeeScript=require("coffee-script"),
	browser,app;

	CoffeeScript.register();

var	app	= require("../app/app.coffee");
var server=app.listen(3333,function(){
	console.log("test server runing!");
});
//Browser.localhost('http://localhost', 3333);
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

describe('start app',function(){
	before(function(done){
		browser.visit("http://localhost:3333/www/index.html",function(err,browser){
			if(err){throw err;}
			done();
		});

	});

	it("visit:/www/index.html",function(done){
		browser.assert.success();
		done();
	});
});
