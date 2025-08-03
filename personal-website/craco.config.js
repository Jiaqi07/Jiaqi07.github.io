const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      // Add .tsx to the extensions array
      webpackConfig.resolve.extensions = ['.tsx', '.ts', '.js', '.jsx', '.json'];
      webpackConfig.module.rules.push({
        test: /\.(js|mjs|jsx|ts|tsx)$/, // Apply to JS, MJS, JSX, TS, TSX files
        exclude: /@mediapipe\/tasks-vision/,
        use: [{
          loader: require.resolve('source-map-loader'),
          options: { 
            filterSourceMappingUrl: (url, resourceContext) => {
              // Exclude source maps for mediapipe library
              if (resourceContext.includes('@mediapipe/tasks-vision')) {
                return false;
              }
              return true;
            },
          },
        }],
        enforce: 'pre',
      });
      return webpackConfig;
    },
  },
}; 