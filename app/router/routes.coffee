
express = require 'express'

exports=module.exports=(app)->
	www = express()
	root.use "www",www
	app.use www.path(),www
##	require("./www/index.router") www,manager 
#	console.dir(www);

	return www
