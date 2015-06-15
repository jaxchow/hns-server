

exports=module.exports= (router,manager)->
	
	router.use (req,res,next)->
		next();
		return

	router.all "/index.do",(req,res,next)->
		res.render("index")
		return
   
	return
		
