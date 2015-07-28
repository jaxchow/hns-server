env = process.env.NODE_ENV or 'development'

HttpServer = require './application'
logger = require 'morgan'
chalk = require 'chalk'
favicon = require 'serve-favicon'
routes = require './router'

app = HttpServer()
app.use favicon __dirname + './../favicon.ico'
app.use logger 'dev'
app.mw 'mw.attr'
#app use middleware
app.mw 'mw.ipaddress'
app.mw 'mw.less2css'
app.mw 'mw.static'
#app.mw 'mw.freemarker'
app.mw 'mw.velocity'
#app.mw 'mw.uploader'
if env is 'development'
    app.mw 'mw.browsersync'
    app.mw 'mw.hotswap'
app.use (req,res,next)->
  return routes(req,res,next)

app.mw 'mw.404'

module.exports = exports = app;
