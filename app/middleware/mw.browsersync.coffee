###
	browserSync 同步刷新服务
###

browserSync = require 'browser-sync'
browserClient=require 'connect-browser-sync'
module.exports = (app) ->
	bs = browserSync {logSnippet: true}
	app.use browserClient(bs)
	app.set 'bs',bs
	return app
