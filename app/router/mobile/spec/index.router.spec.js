var assert = require('assert'),
	Browser= require('zombie'),
	CoffeeScript=require("coffee-script"),
	browser,app;

	CoffeeScript.register();

/*
var	app	= require("../../../app.coffee");
var server=app.listen(3333,function(){
	console.log("test server runing!");
});
*/
//Browser.localhost('http://localhost/', 80);
before(function(done){
	browser = new Browser({site: 'http://127.0.0.1:3000', debug : true});
	done();
});
/*
after(function(done){
	server.close(function(){
		console.log("test server is shutdown!");
	});
	browser=null;
	done();
});
*/

describe('start app',function(){
	before('visit:index.html',function(done){
		browser.visit("http://127.0.0.1:3000/m/index.html",function(err,browser){
			if(err){throw err;}
			done();
		});
	})

	it("visit:/m/index.html",function(done){
    		browser.assert.success();
			done();
	});

	it("fetch:/m/signup.do",function(done){
		browser.fetch("http://127.0.0.1:3000/m/signup.do",{
			method: 'post',
		//	headers: { "Content-Type" : "text/plain" },
		//	body:"username=陈先&mobile=13911111111",
			body: JSON.stringify({
			    username: '陈先',
			    mobile: '1391111111',
				store:'宁波',
				wxid:'s29s39f'
			})
		})
		.then(function(response) {
	//		console.log('Status code:', response.status);
			if (response.status === 200)
			  return response.text();
			done();
		})
	});
});
