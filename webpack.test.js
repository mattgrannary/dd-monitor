const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const sassIncludePaths = [
  path.resolve(__dirname, './app/styles'),
  path.resolve(__dirname, 'node_modules')
];

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + sassIncludePaths.join('&includePaths[]=')
];

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.join(__dirname, './tmp'),
    filename: 'app.js',
    publicPath: '/'
  },
  devServer: {
    inline: true,
    contentBase: './tmp'
  },
  devtool: 'eval, source-maps',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('app.css')
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  resolve: {
    extensions: ['', '.js', '.sass'],
    modulesDirectories: ['app', 'node_modules']
  }
};
