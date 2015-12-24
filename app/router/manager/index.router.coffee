###
	visit http://localhost:3000/www/
###

express = require 'express'
router=express.Router();

router.use (req,res,next)->
	next();
	return

router.get "/login.do",(req,res,next) ->
	res.render "manager/views/login"
	return

router.all "/index.html",(req,res,next)->
	res.render("manager/views/index",{username:"jaxchow"})
	return
router.use "/usermng",require('./usermng.router')
router.use "/questmng",require('./questmng.router')
router.use "/awardsmng",require('./awardsmng.router')

module.change_code = 1;
module.exports=router
