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
	pageSize=50
	type=req.query.type || ''
	storename=req.query.store;
	pageIndex= req.query.pageIndex || 1
	if storename != undefined
		querys.include=[{model:models.User,where: { store: storename }}]
	pageQuery=querys
	if pageIndex>=1
		pageQuery['offset']=(pageIndex-1)*pageSize
		pageQuery['limit']= pageSize
	Promise.all([Red.findAll(pageQuery),Red.count(querys),Store.findAll()])
	.spread (lists,total,stores)->
		pageCount=Math.ceil(total/pageSize)
		res.render "manager/views/redmng/list",{lists:lists,stores:stores,storename:storename,total:total,pageCount:pageCount,pageIndex:pageIndex,type:type}
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
