
livereload = require 'connect-liveload'

module.exports = (app) ->
	app.use livereload()
	return app
