###
	服务端动态编译LESS2css
###
hotswap = require 'hotswap'
chalk = require 'chalk'
bs = require './mw.browsersync'

hotswap.configure {
  extensions: {'.coffee': 'coffee'},
  watch: true,
  autoreload: true
}
module.exports = (app) ->
	hotswap.on 'swap', ->
		if app.get 'bs' is not null
			bs.reload();
			console.log "["+chalk.blue("HS")+"] "+"Reloading server file:"+arguments[0]
		else
			console.log 'hotswap is require mw.browsersync'
	return app
