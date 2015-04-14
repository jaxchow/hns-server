###
	web context router

###

exports=module.exports=(app,express)->
	manager={}
	root=express();

	app.use "/",root
	root.use "/",(req,res,next)->
		res.render "index"
	www = express()
	root.use "www",www
	app.use www.path(),www
	require("./www/index.router") www,manager 

	return
	
