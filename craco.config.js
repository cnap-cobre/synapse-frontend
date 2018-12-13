const path = require('path')
const routes = [path.resolve(__dirname, './src/routes.jsonrt')]

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.module.rules[2].oneOf = [
        {
          test: /routes\.jsonrt$/,
          loader: require.resolve('./route-loader'),
          options: {
            chunks: true,
            debug: false
          }
        },
        ...webpackConfig.module.rules[2].oneOf
      ];
      return webpackConfig;
    }
  }
};