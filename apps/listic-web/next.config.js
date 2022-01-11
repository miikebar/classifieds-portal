const usePreactInDev = process.env.PREACT_IN_DEV === 'true';
const withPlugins = require('next-compose-plugins');
const withNx = require('@nrwl/next/plugins/with-nx');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: true,
  },
  images: {
    domains: ['127.0.0.1', 'firebasestorage.googleapis.com'],
  },
  webpack(config, { dev, isServer, webpack }) {
    // Replace React with Preact for production build. Inspired by
    // https://github.com/preactjs/next-plugin-preact/blob/3f8b5607cc31ad4973561c4aeaeb00066fb28eb8/packages/next-plugin-preact/index.js
    if (!isServer && (!dev || usePreactInDev)) {
      console.log('================== LISTIC BUILD ===================');
      console.log('| Using Preact as a client-side React replacement |');
      console.log('===================================================');
      const webpackVersion = webpack.version;
      if (isServer && +webpackVersion.split('.')[0] >= 5) {
        config.resolve.exportsFields = [];
      }
      const splitChunks =
        config.optimization && config.optimization.splitChunks;
      if (splitChunks && splitChunks.cacheGroups) {
        const cacheGroups = splitChunks.cacheGroups;
        const test =
          /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/;
        if (cacheGroups.framework) {
          cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
            test,
          });
        }
      }
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
        'react-ssr-prepass': 'preact-ssr-prepass',
        webpack: 'webpack',
      });
    }
    return config;
  },
};

module.exports = withPlugins([withBundleAnalyzer, withNx], nextConfig);
