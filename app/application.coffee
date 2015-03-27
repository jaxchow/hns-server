
###
	express 应用扩展组件
	author : jaxchow@gmail.com
	date : 2014-11-08
	description : express 组件扩展增强自定义功能
###

express = require 'express'
merge = require 'utils-merge'

#扩展express application 方法
express.application.mw = (middleware) ->
	require("./middleware/#{middleware}")(@)
	return

express.application.startup = (port)->
	@listen port,(error)->
		console.log "hns running success ! listening on port: #{port}"
		return
	return

express.response.render = (view,options,fn) ->
	options = options or {}
	self =@
	req = self.req
	app = req.app
	merge options,self.getAttrs()
	if options is 'function'
		fn=options
		options={} 
	options._locals=self.locals;
	fn =fn or (err,str) ->
		if err then return req.next err
		self.send str
		return
	app.render view,options,fn
exports=module.exports=express;
