

exports=module.exports= (router,manager)->

	router.use (req,res,next)->
		res.addAttr "ctx",""
		next();
		return
	router.all "/",(req,res,next)->
		res.render "demo/views/index"
		return
	#使用FTL
	router.all "/demo.ftl",(req,res,next)->
		res.render "demo/views/demo.ftl",{user:{username:"jaxchow"}}
		return
	
	#使用velocity
	router.all "/demo.html",(req,res,next)->
		res.render "demo/view/demo.html",{user:{username:"jaxchow"}}
		return

	return
		
