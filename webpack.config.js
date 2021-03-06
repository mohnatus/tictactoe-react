const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PORT = 8118;
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
            }
        },
        {
            test: /\.(html)$/,
            use: {
            loader: 'html-loader',
            options: {
                attrs: [':data-src']
            }
            }
        }
    ]
  },
  devServer: {
    contentBase: 'dist',
    liveReload: true,
    port: PORT,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'dist/index.html'
    })
  ]
};