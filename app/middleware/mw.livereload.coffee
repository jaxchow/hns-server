
livereload = require 'connect-livereload'

module.exports = (app) ->
	app.use livereload()
	return app
