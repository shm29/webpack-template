const path = require('path')
const merge = require('webpack-merge')
const devServer = require('./webpack/devServer')
const pug = require('./webpack/pug')
const scss = require('./webpack/scss')
const fonts = require('./webpack/fonts')
const img = require('./webpack/img')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')


const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
}

const common = merge([{
  entry: {
    'index': PATHS.source + '/pages/index/index.js'
  },
  output: {
    path: PATHS.build,
    filename: 'js/[name].js'
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin({})
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index', 'common'],
      template: PATHS.source + '/pages/index/index.pug'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      // chunks: ['index']
    })
		/*IF JQUERY is NEEDED remove this comment
		,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })*/
  ]
  },
  pug(),
  scss(),
  img(),
  fonts()
])

module.exports = function (env) {
  if (env === 'production') {
    return common
  }
  if (env === 'development') {
    return merge([
      common,
      devServer()
    ])
  }
}
