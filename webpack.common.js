const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: [
    './src/assets/js/main.js',
    './src/main.js',
    './src/assets/css/main.css'
  ],
  module: {
    rules: [
      {
        test: /\.(js|vue|jsx)$/,
        use: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          interpolate: true
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(`${__dirname}/dist/assets`),
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: `${__dirname}/postcss.config.js`
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images'
            }
          }
        ]
      },
      {
        test: /\.mp4$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/video'
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[ext]',
              publicPath: function (url) {
                return url.replace(/assets/, '..')
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      lib: path.resolve(__dirname, 'src/assets/js/lib'),
      modules: path.resolve(__dirname, 'src/modules'),
      fonts: path.join(__dirname, 'src/assets/fonts')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/layout/index.html',
      filename: 'index.html'
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
