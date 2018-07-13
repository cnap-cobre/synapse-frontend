const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleTracker = require('webpack-bundle-tracker');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const routes = [path.resolve(__dirname, './src/routes.json')];
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const env = process.env;

module.exports = {
  entry: {
    app: [
      './polyfills.js',
      './src/index.js'
    ],
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        exclude: routes,
        loader: 'json-loader',
      },
      {
        test: /\.json$/,
        type: "javascript/auto",
        include: routes,
        loader: 'redux-json-router/lib/route-loader',
        options: {
          chunks: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.inline\.svg$/,
        loader: 'babel-loader!svg-react-loader'
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new BundleTracker({
      path: __dirname,
      filename: "./stats/stats.json"
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: (env.DISABLE_ANALYZER_SERVER || env.CI ? "disabled" : "server")
    }),
  ],
  optimization: {
    minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            mangle: true,
            compress: true,
          }
        })
    ]
  }
};