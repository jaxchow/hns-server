var assert = require('assert'),
	Browser= require('zombie'),
	CoffeeScript=require("coffee-script"),
	browser,app;

	CoffeeScript.register();

	app	= require("../app/app.coffee");
	var server=app.listen(3333,function(){
		console.log("test server runing!");
	});
	Browser.localhost('http://localhost', 3333);
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

	describe('首页单元测试',function(){
		before(function(done){
			browser.visit("http://localhost:3333/www/index.do",function(err,browser){
				if(err){throw err;}
//				browser.assert.success();
				done();
			});

		});

		it("网站访问首页",function(done){
			browser.assert.text('title', 'hns-demo');
			done();
		});

		it('验证legend表单存在',function(done){
			browser.assert.element("#legend","表单LEGEND 不存在");
			done();
		});

		it('填写单表内容',function(done){
			browser.fill("support","this is text");
			browser.assert.input('form input[name=support]', 'this is text');
			done();
		});

	});

	describe('测试表单校验',function(){

		before(function(done){
			browser.visit("http://localhost:3333/www/index.do",function(err,browser){
				if(err){throw err;}
				done();
			});

		});

		it("表单填写不通过",function(done){
			browser.fill("support","this is text").pressButton('save');
			browser.assert.hasClass("input[name='support']", 'error');
			done();
		});

		after(function(done){
			browser.fire(browser.$$('.validatorForm'),'reset');
			//browser.assert.input('form input[name=support]', '');
			done();
		});

	});

	describe("测式页面JS组件响应",function(done){

		before(function(done){
			browser.visit("http://localhost:3333/www/index.do",function(err,browser){
				if(err){throw err;}
				done();
			});
		});
		//[data-target="#myModal"] 比 class 来的可靠
		it("dialog open",function(done){
			browser.click(browser.$$('[data-target="#myModal"]'));
			//验证DIALOG class in 为显示状态
			browser.assert.hasClass("#myModal",'in');
			browser.assert.style('#myModal', 'display', '');
			done();
		});
		//同上
		it("dialog close on close",function(done){
			browser.click(browser.$$('#myModal [data-dismiss="modal"]'));
			browser.assert.hasNoClass("#myModal","in");
			browser.assert.style('#myModal', 'display', 'none');
			done();
		});

	});
