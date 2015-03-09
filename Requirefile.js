({
	appDir:"jsc",
	baseUrl:".",
	dir:"./js",
	//skipPragmas:true,
	//optimizeAllPluginResources:true,
	mainConfigFile:"jsc/module.js",
	keepBuildDir: false, //每次运行清里Dir目录文件
	skipDirOptimize: true,//跳出Dir目录文件压缩
	removeCombined:false, 
	fileExclusionRegExp:/^(r|build)\.js$/,
	modules: [{
		name: 'www/module.index',
		exclude:["jquery","bootstrap3"] //排除不要必要模块合并
//	},{
//		name: 'www/module.member',
//		exclude:["jquery","bootstrap3","jquery.validation"]
//	},{
//		name:'./ssomodellogin',
//		exclude:["jquery","jquery.validation"]
	}],
	onModuleBundleComplete:function(data){
	//	console.log(data);
	},
	onBuildRead:function(moduleName, path, contents){
		var contents=contents.replace("{dateTime}",new Date().toString());
		var contents=contents.replace("{author}","zhouhuan");
		return contents;		
	}
});

