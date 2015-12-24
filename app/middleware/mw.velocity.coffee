
velocity = require 'velocity-view'
path = require 'path'
toolbox = require '../toolbox'

module.exports= (app) ->
	app.engine '.html',velocity.__express
	app.set 'view engine','html'
	app.set 'views',path.join __dirname,'../../views'
	app.set 'macros','macro/common.vm'
	app.set 'toolbox',toolbox
	###
	app.use "/",(req,res,next)->
		res.addAttrs 'toolbox',toolbox
		next();
		return
	###
	return app
