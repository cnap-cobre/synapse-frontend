const env = process.env;

const conf = {
  "presets": [
    "@babel/preset-env", "@babel/preset-react"
  ],
  "plugins": [
    "emotion",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread"
  ]
}

if (env.ENV === 'dev') {
  conf.plugins = [...conf.plugins, "react-hot-loader/babel"]
}

module.exports = conf;