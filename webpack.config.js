var webpack = require('webpack')
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
var path = require('path')
var env = require('yargs').argv.mode

var libraryName = 'redux-localstore'
var fileName = 'redux-localstore'

var plugins = [], outputFile

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({minimize: true}))
  outputFile = fileName + '.min.js'
} else {
  outputFile = fileName + '.js'
}

var config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins
}

module.exports = config
