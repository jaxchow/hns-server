###
	加载freemarker-view 模版解释引擎
###

freemarker = require 'freemarker-view'
path = require 'path'

module.exports = (app)->
	app.engine 'ftl',freemarker
	app.set 'view engine','ftl'
	app.set 'views',(path.join __dirname,'../../views')

	return app
	
