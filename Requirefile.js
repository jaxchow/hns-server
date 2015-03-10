({
	appDir:"js",
	baseUrl:".",
	dir:"jsc",
	//skipPragmas:true,
	//optimizeAllPluginResources:true,
	mainConfigFile:"js/module.js",
	keepBuildDir: false, //每次运行清里Dir目录文件
	skipDirOptimize: true,//跳出Dir目录文件压缩
	removeCombined:false, 
	fileExclusionRegExp:/^(r|Requirefile)\.js$/,
	// 处理所有的文本资源依赖项，从而避免为加载资源而产生的大量单独xhr请求
	inlineText: true,
	modules: [{
		name: 'module/index',
	//	out:"www/module.index.min",
		exclude:["jquery","bootstrap3",'jquery.validation','text'] //排除不要必要模块合并
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

