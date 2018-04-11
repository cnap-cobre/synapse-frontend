const webpack = require('webpack');

module.exports = {
    mode: 'development',
    context: '/frontend/src/js',
    entry: [
        './index.js'
    ],
    devtool: 'source-map',
    output: {
        path: '/frontend/dist/',
        publicPath: '/static/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.styl$/,
                loader: 'style!css!stylus'
            },
            {
                test: /\.(mp4|webm|mp3|ogg|wav|jpeg|jpg|bmp|ico|png|gif|ttf|otf|woff|eot)$/,
                loader: 'file?name=[path][name].[ext]?[hash]'
            }
        ],
    },
    target: 'web',
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ]
};
