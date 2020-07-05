const path = require('path')
const autoprefixer = require('autoprefixer')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const MODE = process.env.WEBPACK_ENV
const ENTRY_POINT = path.resolve(__dirname, 'assets', 'js', 'main.js')
const OUTPUT_PATH = path.join(__dirname, 'static')

const config = {
  entry: ['@babel/polyfill', ENTRY_POINT],
  output: {
    path: OUTPUT_PATH,
    filename: '[name].js'
  },
  mode: MODE,
  module: {
    rules: [
      {
        test: /.(js)$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /.(scss)$/,
        use: ExtractTextWebpackPlugin.extract([
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins () {
                return [autoprefixer({ browsers: 'cover 99.5%' })]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ])
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('styles.css'),
    new CleanWebpackPlugin()
  ]
}

module.exports = config
