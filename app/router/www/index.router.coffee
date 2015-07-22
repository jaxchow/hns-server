###
	visit http://localhost:3000/www/
###

express = require 'express'
router=express.Router();

router.use (req,res,next)->
	next();
	return

router.all "/index.html",(req,res,next)->
	res.render("index",{username:"jaxchow"})
	return

module.change_code = 1;
module.exports=router
