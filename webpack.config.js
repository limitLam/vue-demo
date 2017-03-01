const {
  resolve
} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ''

const host = 'localhost'
const port = 8086

const srcPath = resolve(__dirname, 'src');

module.exports = (options = {}) => ({
  entry: {
    index: './src/main.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
    }, {
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          root: resolve(__dirname, 'src'),
          attrs: ['img:src', 'link:href']
        }
      }]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    }, {
      test: /favicon\.png$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }]
    }, {
      test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
      exclude: /favicon\.png$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }]
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  resolve: {
    extensions: ['.vue', '.js'],
    // extensions that are used
    alias: {
      'vue': 'vue/dist/vue.js',
      'ASSETS': resolve(srcPath, './assets'),
      'PAGES': resolve(srcPath, './pages')
    }
  },
  devServer: {
    stats: 'errors-only',
    host: host,
    port: port,
    // historyApiFallback: true,
    // proxy: {
    //   '/api/': {
    //     target: 'http://127.0.0.1:8080',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // },
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    }
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map'
})