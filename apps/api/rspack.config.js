const { composePlugins, withNx } = require('@nx/rspack');
const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const PLUGINS = [new NodePolyfillPlugin()];

module.exports = composePlugins(withNx(), (config) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@api': path.resolve(__dirname, './src'),
  };

  config.plugins.push(...PLUGINS);

  delete config.resolve.alias['@api/*'];
});
