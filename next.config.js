/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'beatboxx.app',
      },
    ],
    unoptimized: true, // For static export compatibility
  },
}

module.exports = nextConfig
