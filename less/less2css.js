var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    sourcePath, targetPath;

//获取命令行中的路径
process.argv.forEach(function(val, index, array) {
    if (index == 2) {
        sourcePath = val;
    }
    if (index == 3) {
        targetPath = val;
    }
})

var lessc = function(rootPath, targetPath) {
    //取得当前绝对路径
    rootPath = path.resolve(rootPath);
    //目标路径绝对路径
    targetPath = path.resolve(targetPath);
    //判断目录是否存在
    fs.exists(rootPath, function(exists) {
        //路径存在
        if (exists) {
            //获取当前路径下的所有文件和路径名
            var childArray = fs.readdirSync(rootPath);
            if (childArray.length) {
                for (var i = 0; i < childArray.length; i++) {
                    var currentFilePath = path.resolve(rootPath, childArray[i]);
                    var currentTargetPath = path.resolve(targetPath, childArray[i])
                        //读取文件信息
                    var stats = fs.statSync(currentFilePath);
                    //若是目录则递归调用
                    if (stats.isDirectory()) {
                        lessc(currentFilePath, currentTargetPath);
                    } else {
                        //判断文件是否为less文件
                        if (path.extname(currentFilePath) === ".less") {
                            var newFilePath = path.resolve(targetPath, path.basename(currentFilePath, '.less') + ".css");
                            if (!fs.existsSync(targetPath)) {
                                fs.mkdirSync(targetPath);
                            }
                            console.log(newFilePath);
                            exec("lessc -x " + currentFilePath + " > " + newFilePath);
                        }
                    }
                }
            }
        } else {
            console.log("directory is not exists");
        }
    });
}

lessc('./', './css/');