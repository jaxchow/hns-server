//var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var babelLoader= require('babel-loader');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : null,
	noInfo:true,
	entry: {
		"topic.module": [
			'webpack-dev-server/client?http://localhost:3000',
			'webpack/hot/dev-server',
			'./js_modules/topic_moudle/index.js'
		],
	},
  output: {
    path: path.join(__dirname, "jsc"),
    filename: '[name].js',
	hot: true,
    publicPath: '/jsc',
	libraryTarget: 'umd'
  },

  devServer: {
    filename: '[name].js',
    hot: true,
    contentBase: './js',
	headers: { 'Access-Control-Allow-Origin': '*' }
  },
  module: {
	unknownContextRegExp: /$^/,
    unknownContextCritical: false,
	noParse:['react-hot-loader','webpack-dev-server'],
    loaders: [{
        test: /\.(es)$/,
        exclude: /node_modules/,
        //loaders:[ 'react-hot','babel']
        loaders:[ 'babel']
      },{
        test: /\.(jsx)$/,
        exclude: /node_modules/,
        //loaders:[ 'react-hot','babel']
        loaders:[ 'babel']
      },{
        test: /\.(js)$/,
        exclude: /node_modules/,
        //loaders:[ 'react-hot','babel']
        loaders:[ 'babel']
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'root.jQuery': 'jquery'
}),
	new webpack.DefinePlugin({
	}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin(),
	new HtmlWebpackPlugin({
      title: 'playground demo',
    })
  ],
 externals: {
 },
  resolve: {
     modulesDirectories:["thirdparty", "node_modules"],
     root: [
        path.join(__dirname, "node_modules")
     ],
     extensions: ['', '.js', '.jsx','.es'],
     alias: {
      'jquery': __dirname +'/thirdparty/jquery/jquery.min',
      'bootstrap':__dirname +'/thirdparty/bootstrap/dist/js/bootstrap.min',
      'jquery.validation':__dirname + '/thirdparty/jquery.validation/dist/jquery.validate.js',
      'widget/formValidation': __dirname +'/js/widget/formValidation',
      'markdown.react': __dirname +'./js/react/markdown.react',
     }
   },
   resolveLoader: {
      root: [
         __dirname,
        path.join(__dirname, "node_modules")
      ],
      modulesDirectories: [
        path.join(__dirname, "node_modules")
      ]
    },
};
