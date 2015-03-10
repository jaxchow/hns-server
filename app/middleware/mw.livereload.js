var livereload=require('connect-livereload');
module.exports = function(app) {
    app.use(livereload({
	//	port: 35729,
	}));
	return app;
};
