const s3Url = process.env.NEXT_PUBLIC_S3_URL;
const isDev = process.env.NODE_ENV !== 'production';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    return {
      ...config,
      mode: isDev ? 'development' : 'production',
      devtool: isDev ? 'eval-source-map' : 'hidden-source-map',
      module: {
        rules: [
          ...config.module.rules,
          {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
          },
        ],
      },
      resolve: {
        alias: {
          '@': '.',
        },
      },
    };
  },
  swcMinify: true,
  compiler: {
    emotion: {
      autoLabel: 'dev-only',
    },
    removeConsole: isDev ? false : true,
  },
  images: {
    domains: [s3Url],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
