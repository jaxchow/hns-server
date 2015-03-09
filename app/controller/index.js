/*
 * web context router
 *
 *
 */

exports = module.exports = function(app,express) {
    /* GET home page. */
	var manager={};
    var root = express();
    app.use("/", root);
    root.use(function(req, res, next) {
        next();
    });
    root.all("/", function(req, res) {
     //   res.send("index.html");
    });
	var www=express();
	root.use("www",www);
	app.use(www.path(),www);
    require('./www/index.router')(www,manager);	
	var demo=express();
	root.use("demo",demo);
	app.use(demo.path(),demo);
    require('./demo/index.router')(demo,manager);	
};
