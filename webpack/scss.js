const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//const postcss - loader = require('postcss-loader')

module.exports = function() {
  return {
    module: {
      rules: [{
        test: /\.s*css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer'),
                require('css-mqpacker'),
                require('cssnano')({
                  preset: [
                    'default', {
                      discardComments: {
                        removeAll: true,
                      }
                    }
                  ]
                })
              ],
            }
            },
            {
              loader: 'resolve-url-loader',
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true } // must be set for resolve-url-loader
            }
          ]
      }]
    }
  }
}
