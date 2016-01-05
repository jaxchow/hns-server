###
	visit http://localhost:3000/www/
###
Sequelize = require 'sequelize'
Promise = Sequelize.Promise
express = require 'express'
router=express.Router();
models= require('../../connection/').models;
Red = models.Red;


router.use (req,res,next)->
	next();
	return

router.all "/list.do",(req,res,next)->
	Store=models.Store
	querys={
		where:{
			redStatus:2
		},
		include:[{model:models.User}]
	}
	pageSize=10
	store=req.query.store;
	pageIndex= req.query.pageIndex || 1
	if store != undefined
		querys.include=[{model:models.User,where: { store: store }}]
	if pageIndex>=1
		querys['offset']=(pageIndex-1)*pageSize
		querys['limit']= pageSize
	Promise.all([Red.findAll(querys),Store.findAll()])
	.spread (lists,stores)->
		res.render "manager/views/redmng/list",{lists:lists,stores:stores}
	###
	Red.findAll(querys).then (lists)->
		results={
			lists:lists,
		}
		res.render "manager/views/redmng/list",results
	###
	return
module.change_code = 1;
module.exports=router
