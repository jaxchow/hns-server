//var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var babelLoader= require('babel-loader');
var path = require('path');

module.exports = {
	noInfo:true,
	entry: {
		"topic.module": [
			'webpack-dev-server/client?http://127.0.0.1:3000/',
			'webpack/hot/only-dev-server',
			'./js_modules/topic_moudle/index.js'
		],
  },
  output: {
    path: '/js',
    filename: 'js/[name].js',
	hot: true,
    publicPath: '/',
  },

  devServer: {
    filename: 'js/[name].js',
    hot: true,
    contentBase: './js',
	headers: { 'Access-Control-Allow-Origin': '*' }
  },

  module: {
	unknownContextRegExp: /$^/,
    unknownContextCritical: false,
    loaders: [
      {
        test: /\.(es)$/,
        exclude: /node_modules/,
        loaders:[ 'react-hot','babel']
      },{
        test: /\.(jsx)$/,
        exclude: /node_modules/,
        loaders:[ 'react-hot','babel']
      },{
        test: /\.(js)$/,
        exclude: /node_modules/,
        loaders:[ 'react-hot','babel']
        }
    ]
  },

  plugins: [
		/*
		new webpack.ProvidePlugin({
			"$": "jquery",
			"jQuery": "jquery",
			"window.jQuery": "jquery"
		}),

		*/
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
//		new webpack.CommonsChunkPlugin("public.js"),
  ],
	externals: {
//		"jquery": "jQuery"
//		'react/lib/ReactMount': 'ReactMount',
//		'react': 'React'
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
