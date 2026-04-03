/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Bundle optimization
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
  // Enable compression
  compress: true,
  // Production source maps
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
