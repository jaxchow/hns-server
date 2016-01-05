###
	visit http://localhost:3000/www/
###

express = require 'express'
router=express.Router();
models= require('../../connection/').models;
Quest = models.Quest;

router.use (req,res,next)->
	next();
	return

router.all "/list.do",(req,res,next)->
	Quest.findAll().then (lists)->
		results={
			lists:lists
		}
		res.render "manager/views/questmng/list",results
	return

router.all "/add.do",(req,res,next)->
	res.render "manager/views/questmng/edit",{item:{}}
	return

router.all "/edit.do",(req,res,next)->
	questId = req.query.id
	Quest.findById(questId).then (item)->
		results={
			item:item
		}
		res.render "manager/views/questmng/edit",results
	return

router.all "/delete.do",(req,res,next)->
	questId = req.query.id
	Quest.findById(questId).then (item)->
		item.destroy()
		res.redirect('list.do')

router.all "/save.do",(req,res,next)->

	questId=req.query.id

	Quest.findById(questId).then (item)->
		if item is null
			Quest.build(req.query).save()
		else
			item.updateAttributes(req.query)
		res.redirect('list.do')
	return

module.change_code = 1;
module.exports=router
