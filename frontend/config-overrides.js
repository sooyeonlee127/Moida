// config-overrides.js
module.exports = {
    // The Webpack config to use when compiling your react app for development or production.
    webpack: function (config, env) {
      const overridedConfig = {
        ...config,
        resolve: {
          ...config.resolve,
          fallback: {
            ...config.resolve.fallback,
            fs: require.resolve('browser-fs'),
            stream: require.resolve('stream-browserify'),
            crypto: require.resolve('crypto-browserify'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            url: require.resolve('url'),
            path: require.resolve('path-browserify')
          },
        },
      };
      return overridedConfig;
    },
  };