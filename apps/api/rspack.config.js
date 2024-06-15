const { composePlugins, withNx } = require('@nx/rspack');
const path = require('path');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // customize Rspack config here
  config.resolve.alias = {
    ...config.resolve.alias,
    '@api': path.resolve(__dirname, './src'),
  };
  delete config.resolve.alias['@api/*'];
  return config;
});
