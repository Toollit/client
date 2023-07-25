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
    domains: ['getit-s3.s3.ap-northeast-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
