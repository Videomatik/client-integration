/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    VIDEOMATIK_API_KEY: process.env.VIDEOMATIK_API_KEY,
  },
}

module.exports = nextConfig
