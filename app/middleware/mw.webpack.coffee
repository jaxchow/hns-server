###
	webpack中间件配置
###

webpackDevMiddleware = require "webpack-dev-middleware"
webpack = require "webpack"
path = require 'path'
http = require 'http'
hmr = require "webpack-dev-hmr"
webpackConfig = require "../../webpack.config"
webRoot=path.join(__dirname,"../../")
compiler=webpack webpackConfig

###
###

module.exports = (app) ->
	app.use webpackDevMiddleware(compiler,{
		contentBase:webpackConfig.output.path,
		publicPath:webpackConfig.output.publicPath,
		hot:true
		#stats: config.devServer.stats
	})
	app.on 'startup',(event)->
		server=event.server
		hmr.listen server, compiler


