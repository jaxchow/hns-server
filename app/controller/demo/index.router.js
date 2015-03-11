exports = module.exports = function(router,manager) {

	router.use(function(req,res,next){
		next();
	});

	router.all("/",function(req,res,next){
		res.render("demo/views/index");
	})
  
};
