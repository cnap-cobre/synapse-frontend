const base_config = require('./webpack.config.base');
const webpack = require('webpack');

module.exports = {
    ...base_config,
    output: {
        ...base_config.output,
        publicPath: 'http://frontend:3000' + base_config.output.publicPath,
        filename: 'bundle.js'
    },
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/dev-server',
        ...base_config.entry
    ],
    plugins: [
        ...base_config.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            '__DEV__': true,
            'process.env': JSON.stringify('development')
        })
    ],
}
