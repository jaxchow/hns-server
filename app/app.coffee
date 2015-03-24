env = process.env.NODE_ENV or 'development'

HttpServer = require './application'
logger = require 'morgan'
favicon = require 'serve-favicon'

app = HttpServer();

app.use favicon __dirname+'./../favicon.ico'
app.use logger 'dev'
app.use (req,res,next)->
	res._attr = Object.create null
	
	res.addAttr = (key,value) ->
		@._attr[key] =value

	res.attr =res.addAttr
	res.addAttrs = (object) ->
		@.attr item for child,item of object 
		return

	res.getAttr = (key) ->
		@._attr[key]

	res.getAttrs = ->
		return @._attr

#app use middleware
app.mw 'mw.less2css'
app.mw 'mw.static'
#app.mw 'mw.freemarker'
app.mw 'mw.velocity'
#app.mw 'mw.uploader'

if app.get 'env' is 'development' or app.get 'env' is 'debug' then app.mw 'mw.livereload'

require('./controller/index') app,HttpServer

app.use (req,res,next)->
	err = new Error 'Not Found'
	err.status = 404;
	res.render '404',{ message:err.message, error:err }
	return

app.startup 3000




