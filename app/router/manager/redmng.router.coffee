###
	visit http://localhost:3000/www/
###
Sequelize = require 'sequelize'
Promise = Sequelize.Promise
express = require 'express'
nodeExcel = require('excel-export');
urlencode = require('urlencode');
path= require('path')
router=express.Router();
models= require('../../connection/').models;
md5 = require('crypto-md5')
Red = models.Red;


router.use (req,res,next)->
	next();
	return
router.all "/export.do",(req,res,next)->
	Store=models.Store
	conf={}
	conf.stylesXmlFile = path.join(__dirname,"styles.xml")
	conf.cols=[{caption:'用户名',type:'string'},{caption:'领取门店',type:'string'},{caption:'获得奖品',type:'string'},{caption:'来源',type:'string'}]
	conf.rows = []
	storename=req.query.store;
	querys={
		where:{
			redStatus:2
		},
		include:[{model:models.User}]
	}
	if storename == "a8b0c20416853bda54120bf19477ad11"
		filename="全部.xlsx"
		querys.include=[{model:models.User}]
		Promise.all([Red.findAll(querys)])
		.spread (lists)->
			lists.forEach((item)->
				conf.rows.push([item.User.username,item.User.store,item.redText,item.source])
			)
			result = nodeExcel.execute(conf)
			res.setHeader('Content-Type', 'application/vnd.openxmlformats')
			res.setHeader("Content-Disposition", "attachment; filename=" +  urlencode(filename))
			res.end(result, 'binary')
			return
	else

		Store.find({
			where:{
				md5:storename
			}
		}).then (store)->
			if store==null
				console.log("找不到："+store)
				res.redirect("/500.html")
			else
				filename=store.storename+".xlsx"
				querys.include=[{model:models.User,where: { store: store.storename }}]
				Promise.all([Red.findAll(querys)])
				.spread (lists)->
					lists.forEach((item)->
						conf.rows.push([item.User.username,item.User.store,item.redText,item.source])
					)
					result = nodeExcel.execute(conf)
					res.setHeader('Content-Type', 'application/vnd.openxmlformats')
					res.setHeader("Content-Disposition", "attachment; filename=" +  urlencode(filename))
					res.end(result, 'binary');
					return


#	a8b0c20416853bda54120bf19477ad11
router.all "/list.do",(req,res,next)->
	Store=models.Store
	storename=req.query.store
	querys={
		where:{
			redStatus:2
		},
		include:[{model:models.User}]
	}
	pageSize=50
	type=req.query.type || ''

	pageIndex= req.query.pageIndex || 1
	if storename == "a8b0c20416853bda54120bf19477ad11"
			querys.include=[{model:models.User}]
			pageQuery=querys
			if pageIndex>=1
				pageQuery['offset']=(pageIndex-1)*pageSize
				pageQuery['limit']= pageSize
			Promise.all([Red.findAll(pageQuery),Red.count(querys),Store.findAll()])
			.spread (lists,total,stores)->
				pageCount=Math.ceil(total/pageSize)
				res.render "manager/views/redmng/list",{lists:lists,stores:stores,storename:storename,total:total,pageCount:pageCount,pageIndex:pageIndex,type:type,sname:"总后台"}
				return
	else
		Store.find({
			where:{
				md5:storename
			}
		}).then (store)->
			if store==null
				console.log("找不到："+store)
				res.redirect("/500.html")
			else
				querys.include=[{model:models.User,where: { store: store.storename }}]
				pageQuery=querys
				if pageIndex>=1
					pageQuery['offset']=(pageIndex-1)*pageSize
					pageQuery['limit']= pageSize
				Promise.all([Red.findAll(pageQuery),Red.count(querys),Store.findAll()])
				.spread (lists,total,stores)->
					pageCount=Math.ceil(total/pageSize)
					res.render "manager/views/redmng/list",{lists:lists,stores:stores,storename:storename,total:total,pageCount:pageCount,pageIndex:pageIndex,type:type,sname:store.storename}
					return

module.change_code = 1;
module.exports=router
