###
	404页面指定
###

module.exports = (app) ->
	app.use (req,res,next) ->
		err = new Error 'Not Found'
		err.status = 404
		res.render '404',{ message:err.message, error:err }
		return
	return app
