env = process.env.NODE_ENV or 'development'

HttpServer = require './application'
logger = require 'morgan'
chalk = require 'chalk'
favicon = require 'serve-favicon'
hotswap = require 'hotswap'
routes = require './router'

app = HttpServer()

hotswap.configure {
    extensions: {'.coffee': 'coffee'},
    watch: true,
    autoreload: true
}
hotswap.on 'swap', ->
	app.get('bs').reload();
	console.log "Reloading server file:" + arguments[0]

app.use favicon __dirname + './../favicon.ico'
app.use logger 'dev'
app.mw 'mw.attr'
#app use middleware
app.mw 'mw.ipaddress'
app.mw 'mw.less2css'
app.mw 'mw.webpack'
app.mw 'mw.static'
#app.mw 'mw.freemarker'

app.mw 'mw.velocity'
#app.mw 'mw.uploader'
###
if env is 'development'
    app.mw 'mw.browsersync'
###
app.use (req,res,next)->
  return routes(req,res,next)

app.mw 'mw.404'

module.change_code = 1
module.exports = exports = app;
