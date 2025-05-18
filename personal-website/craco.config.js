const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      // Add .tsx to the extensions array
      webpackConfig.resolve.extensions = ['.tsx', '.ts', '.js', '.jsx', '.json'];
      return webpackConfig;
    },
  },
}; 