###
	web context router

###

exports=module.exports=(app,express)->
	manager={}
	root=express();
	app.use "/",root


	www=express();
	root.use "www",www
	app.use www.path(),www
	(require './www/index.router') www,manager
	demo=express()
	root.use "demo",demo
	app.use demo.path(),demo
	(require './demo/index.router') demo,manager
	return app

	
