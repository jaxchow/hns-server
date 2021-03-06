
express = require 'express'
router=express.Router();

router.use (req,res,next)->
	res.addAttr "ctx",""
	next();
	return
router.all "/index.html",(req,res,next)->
	res.render "demo/views/index",{user:"xdixon"}
	return
#使用FTL
router.all "/demo.ftl",(req,res,next)->
	res.render "demo/views/demo.ftl",{user:{username:"jaxchow"}}
	return

#使用velocity
router.all "/demo.html",(req,res,next)->
	res.render "demo/view/demo.html",{user:{username:"jaxchow"}}
	return

module.change_code = 1;
module.exports=router
