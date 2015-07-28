###
	服务端动态编译LESS2css
###
less = require 'express-less'
path = require 'path'

module.exports = (app) ->
	app.use '/css/',less path.join __dirname, '../../css'
	return app
