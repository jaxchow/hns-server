###
	visit http://localhost:3000/www/
###

express = require 'express'
router=express.Router();
models= require('../../model/').models
User = models.User

router.use (req,res,next)->
	next();
	return

router.all "/list.do",(req,res,next)->
	User.findAll().then (lists)->
		results={
			lists:lists
		}
		res.render "manager/views/usermng/list",results
	return

router.all "/add.do",(req,res,next)->
	res.render "manager/views/usermng/edit",{item:{}}
	return

router.all "/edit.do",(req,res,next)->
	userId = req.query.user_id
	User.findById(userId).then (item)->
		results={
			item:item
		}
		res.render "manager/views/usermng/edit",results
	return

router.all "/delete.do",(req,res,next)->
	userId = req.query.user_id
	User.findById(userId).then (item)->
		item.destroy()
		res.redirect('/manager/usermng/list.do')

router.all "/save.do",(req,res,next)->

	userId=req.query.user_id

	User.findById(userId).then (item)->
		if item is null
			User.build({
				username:req.query.username
			}).save()
		else
			item.updateAttributes({
				  username:req.query.username
			})
		res.redirect('/manager/usermng/list.do')
	return

module.change_code = 1;
module.exports=router
