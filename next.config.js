const s3Url = process.env.NEXT_PUBLIC_S3_URL;

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
    return config;
  },
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [s3Url],
  },
  // For docker
  output: 'standalone',
};

module.exports = withBundleAnalyzer(nextConfig);
