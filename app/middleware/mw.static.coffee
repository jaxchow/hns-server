
express = require 'express'
path = require 'path'

module.exports = (app) ->
	app.use '/thirdparty',express.static path.join __dirname,'../../thirdparty'
	app.use '/images',express.static path.join __dirname,'../../images'
	app.use '/js',express.static path.join __dirname,'../../js'
	app.use '/css',express.static path.join __dirname,'../../css'
	return app
