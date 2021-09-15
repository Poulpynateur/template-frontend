const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const path = require("path");

module.exports = {
  entry: {
    scripts: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "public")
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [  { loader: MiniCssExtractPlugin.loader }, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
        inject: false
    }),
    new MiniCssExtractPlugin({
        filename: "style.css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`src/*.html`, { nodir: true }),
      safelist: ['active']
    })
  ]
};