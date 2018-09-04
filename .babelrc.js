const env = process.env;

const conf = {
  "presets": [
    "@babel/env", "@babel/react"
  ],
  "plugins": [
    "emotion",
    "transform-class-properties",
    "transform-object-rest-spread"
  ]
}

if (env.ENV === 'dev') {
  conf.plugins = [...conf.plugins, "react-hot-loader/babel"]
}

module.exports = conf;