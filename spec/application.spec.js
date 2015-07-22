var assert = require('assert'),
	CoffeeScript=require("coffee-script");
	CoffeeScript.register();

var	Application= require("../app/application.coffee");


describe('start app',function(){

	it("application.mw",function(done){
		done();
	});

	it("application:startup 3000",function(done){
		var httpServer=Application();
		var app=httpServer.startup(3000);
		done();
	});
});
