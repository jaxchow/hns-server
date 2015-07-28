###
	获取本机真实IPaddress
	通过app.get('IPAdress') 进行获取使用
###

devIP = require 'dev-ip'

module.exports = (app) ->
	app.set 'IPAddress' , devIP()[0] or 'localhost'
	return app
