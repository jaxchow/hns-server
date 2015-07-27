env = process.env.NODE_ENV or 'development'

HttpServer = require './application'
logger = require 'morgan'
chalk= require 'chalk'
favicon = require 'serve-favicon'
hotswap = require 'hotswap'
routes = require './router'

hotswap.configure {
  extensions: {'.coffee': 'coffee'},
  watch: true,
  autoreload: true
}

app = HttpServer()

app.use favicon __dirname+'./../favicon.ico'
app.use logger 'dev'
app.use (req,res,next)->
	res._attr = Object.create(null)

	res.addAttr = (key,value) ->
		@._attr[key] =value

	res.attr =res.addAttr
	res.addAttrs = (object) ->
		@.attr item for child,item of object
		return

	res.getAttr = (key) ->
		return @._attr[key]

	res.getAttrs = ->
		return @._attr
	next()
	return

#app use middleware
app.mw 'mw.less2css'
app.mw 'mw.static'
#app.mw 'mw.freemarker'
app.mw 'mw.velocity'
#app.mw 'mw.uploader'

if env is 'development'
  browserSync = require 'browser-sync'
  bs = browserSync {logSnippet: true}
  app.use require('connect-browser-sync')(bs)


hotswap.on 'swap',->
	bs.reload();
	console.log("["+chalk.blue("HS")+"] "+"Reloading server file:"+arguments[0]);
app.use (req,res,next)->
  return routes(req,res,next)


app.use (req,res,next)->
  err = new Error 'Not Found'
  err.status = 404
  res.render '404',{ message:err.message, error:err }
  return


module.exports=exports=app;
