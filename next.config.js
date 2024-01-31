const s3Url = process.env.NEXT_PUBLIC_S3_URL;
const prod = process.env.NODE_ENV === 'production';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval-source-map',
    };
  },
  swcMinify: true,
  compiler: {
    emotion: {
      autoLabel: 'dev-only',
    },
    removeConsole: prod ? true : false,
  },
  images: {
    domains: [s3Url],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
