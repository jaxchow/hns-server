###
 	添加response.attr属性操作
###

module.exports = (app) ->
	app.use (req,res,next)->
		res._attr = Object.create(null)

		res.addAttr = (key,value) ->
			@._attr[key] =value

		res.attr =res.addAttr
		res.addAttrs = (object) ->
			@.attr item for child,item of object
			return

		res.getAttr = (key) ->
			return @._attr[key]

		res.getAttrs = ->
			return @._attr
		next()
		return
	return app
