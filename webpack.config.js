const path = require('path')
const webpack = require('webpack')
const { CheckerPlugin } = require('awesome-typescript-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const env = process.env.MIX_ENV === 'prod' ? 'production' : 'development'

const plugins = {
  production: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    })
  ],
  development: []
}

module.exports = {
  devtool: 'source-map',
  entry: {
    appjs: path.join(__dirname, 'assets/js/app.tsx'),
    spajs: path.join(__dirname, 'assets/js/spa.tsx'),
    appcss: path.join(__dirname, 'assets/scss/app.scss'),
    spacss: path.join(__dirname, 'assets/scss/spa.scss')
  },
  output: {
    path: path.join(__dirname, '/priv/static'),
    filename: 'js/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ['awesome-typescript-loader'],
        include: path.join(__dirname, 'assets/js'),
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise', // works as expected
    }),
    new CleanWebpackPlugin([
      path.join(__dirname, 'priv/static')
    ]),
    // Important to keep React file size down
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      }
    }),
    new CheckerPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'assets', 'static') }
    ])
  ].concat(plugins[env]),
  resolve: {
    modules: [
      'node_modules',
      'assets/js'
    ],
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      phoenix: path.join(__dirname, '/deps/phoenix/priv/static/phoenix.js'),
      phoenix_html: path.join(__dirname, '/deps/phoenix_html/priv/static/phoenix_html.js')
    }
  }
}
