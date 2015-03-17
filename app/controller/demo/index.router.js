exports = module.exports = function(router,manager) {

	router.use(function(req,res,next){
		res.addAttr("ctx","");
		next();
	});

	router.all("/",function(req,res,next){
		res.render("demo/views/index");
	});
	//多模版引擎切换使用
	router.all("/demo.ftl",function(req,res,next){
        res.render('demo/views/demo.ftl',{user:{username:"jaxchow"}});
    });  
	router.all("/demo.html",function(req,res,next){
        res.render('demo/views/demo.html',{user:{username:"jaxchow"}});
    });  
};
