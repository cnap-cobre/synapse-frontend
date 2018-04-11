const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.development');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    filename: config.output.filename,
    inline: true,
    hot: true,
    stats: false,
    historyApiFallback: true,
    headers: {
    }
}).listen(3000, '0.0.0.0', function(err){
    if (err) {
        console.error(err);
    } else {
        console.log('webpack dev server listening on frontend:3000');
    }
});
