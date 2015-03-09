/**
 *
 * 统一加载toolbox实现工具类 
 *
 *
 **/
 
var toolbox = {

    dateTool: require("./tool"),
	numberTool:require("./numberTool"),
	tool:require("./dateTool")
};

module.exports = toolbox;
