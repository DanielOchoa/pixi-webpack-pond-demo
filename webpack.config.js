
var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname,
  devtool: debug ? 'inline-sourcemap' : null,
  entry: debug ? [
    'webpack-dev-server/client?http://localhost:8080',
    './js/index.js'
  ] : ['./js/index.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.min.js'
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ],

  module: {
    loaders: [
      // babel
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components|dist)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      // css
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      // to get pixi working?
      {
        test: /\.json$/,
        loader: 'json'
      }
    ],
    postLoaders: [
      {
        include: path.resolve(__dirname, 'node_modules/pixi.js'),
        loader: 'transform?brfs'
      }
    ]
  }
};
