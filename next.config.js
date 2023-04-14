/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    rapidApiKey: process.env.RAPID_API_KEY,
  },
};

module.exports = nextConfig;
