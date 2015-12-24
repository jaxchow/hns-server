var assert = require('assert'),
	Browser= require('zombie'),
	CoffeeScript=require("coffee-script"),
	browser,app;

	CoffeeScript.register();

var	app	= require("../../../app.coffee");
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
	before('visit:/m/index.html',function(done){
		browser.visit("http://localhost:3333/m/index.html",function(err,browser){
			if(err){throw err;}
			done();
		});
	})

	it("visit:/m/index.html",function(done){
    		browser.assert.success();
			done();
	});
});

describe('sign up user',function(){
	it("fetch:/m/signup.do",function(done){
		browser.fetch("/m/signup.do")
		  .then(function(response) {
		    console.log('Status code:', response.status);
		    if (response.status === 200)
		      return response.text();
			done();
		  })
	});
});
