// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
process.env.NEXT_TRANSLATE_PATH = path.join(
  process.cwd(),
  'apps',
  'listic-web'
);

const withPlugins = require('next-compose-plugins');
const withNx = require('@nrwl/next/plugins/with-nx');
const nextTranslate = require('next-translate');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
};

module.exports = withPlugins([withNx, nextTranslate], nextConfig);
