const path = require('path');

const aliases = {
  'Utils': path.resolve(__dirname, 'src/util/'),
  'Components': path.resolve(__dirname, 'src/components/'),
  'Views': path.resolve(__dirname, 'src/views/'),
  'Containers': path.resolve(__dirname, 'src/containers/'),
};

module.exports = aliases;