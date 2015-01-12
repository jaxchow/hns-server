var multiparty = require('connect-multiparty');
var fs = require('fs');
var path = require('path');
exports = module.exports = function(router,manager) {

	router.use(function(req,res,next){
		next();
	});

	router.all("/",function(req,res,next){
		res.render("index")
	})
   
	router.all('/form.do', function(req, res, next) {
		console.log("form.do");
        res.render("formupload", {});
    });

    router.all('/upload.do', multiparty(), function(req, res, next) {
        var upfile = req.files.avatar;
		//console.log(upfile);
		/*	
        destFile = path.join(app.get('uploadsDir') + upfile.name);
        fs.rename(upfile.path, destFile, function(err, data) {
            if (err) {
                throw err;
            }
            fs.stat(destFile, function(err, stats) {
                if (err) throw err;
                res.render("formupload", {
                    fileinfo: JSON.stringify(stats)
                });
            });

        });
		*/
	   	res.render("formupload",{
			msg:"上传成功！"
		});
    });
};
