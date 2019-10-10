// eslint-disable-next-line
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// eslint-disable-next-line
const nodeExternals = require('webpack-node-externals');
// eslint-disable-next-line
const webpack = require('webpack');
// eslint-disable-next-line
const path = require('path')

module.exports = config => {
  console.log('WEBPACK: custom config');

  // https://github.com/ZenSoftware/bundled-nest/blob/master/webpack.config.js
  const ignorePlugin = new webpack.IgnorePlugin({
    /**
     * There is a small problem with Nest's idea of lazy require() calls,
     * Webpack tries to load these lazy imports that you may not be using,
     * so we must explicitly handle the issue.
     * Refer to: https://github.com/nestjs/nest/issues/1706
     */
    checkResource(resource) {
      const lazyImports = [
        '@nestjs/microservices',
        '@nestjs/microservices/microservices-module',
        '@nestjs/websockets',
        '@nestjs/websockets/socket-module',
        '@nestjs/platform-express',
        'cache-manager',
        'class-validator',
        'class-transformer',
        'fastify-static',
        'point-of-view',
      ];

      if (!lazyImports.includes(resource)) {
        return false;
      }
      try {
        require.resolve(resource);
      } catch (err) {
        return true;
      }
      return false;
    },
  });

  config.plugins = config.plugins.concat(ignorePlugin);

  // MONOREPO EXTERNALS

  config.externals = [
    nodeExternals({
        modulesDir: path.resolve(__dirname, './node_modules'),
    }),
    nodeExternals({
        modulesDir: path.resolve(__dirname, '../node_modules'),
    })
  ]

  // SKIP TS CHECKER

  // Hack this
  // https://github.com/nestjs/nest-cli/blob/master/lib/compiler/defaults/webpack-defaults.ts
  // with this
  // https://docs.nestjs.com/techniques/hot-reload

  const isTranspileOnly = process.env.NODE_ENV === 'development';

  // Skip typechecking
  if (isTranspileOnly) {
    console.log('WEBPACK: transile only');

    config.plugins = config.plugins.filter(plugin => {
      return !(plugin instanceof ForkTsCheckerWebpackPlugin);
    });
  }

  // HRM

  const isHmr = process.env.NODE_ENV === 'development';

  if (isHmr) {
    console.log('WEBPACK: hmr on');

    const HOT_POOL = 'webpack/hot/poll?100';

    config.entry = Array.isArray(config.entry)
      ? [HOT_POOL].concat(config.entry)
      : [HOT_POOL, config.entry];

    config.plugins = config.plugins.concat(
      new webpack.HotModuleReplacementPlugin(),
    );

    config.externals = [
      nodeExternals({
        modulesDir: path.resolve(__dirname, './node_modules'),
        whitelist: [HOT_POOL],
      }),
      nodeExternals({
        modulesDir: path.resolve(__dirname, '../node_modules'),
        whitelist: [HOT_POOL],
      }),
    ];
  }

  return config;
};
