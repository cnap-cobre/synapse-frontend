const base_config = require('./webpack.config.base');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');

module.exports = {
    ...base_config,

    output: {
        ...base_config.output,
        filename: '[hash]_bundle.js'
    },

    module: {
        ...base_config.module,

        //wrap style loaders with extract text plugin
        rules: base_config.module.rules.map(function(conf) {
            return {
                ...conf,
                loader: conf.loader && conf.loader.includes('style!') ? ExtractTextPlugin.extract('style', conf.loader.replace('style!', '')) : conf.loader
            }
        })
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            '__DEV__': false,
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            }
        }),
        new ExtractTextPlugin("[hash]_styles.css"),
        new AssetsWebpackPlugin({filename: 'dist/assets.json'})
    ]
};

