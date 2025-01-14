import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true, // Disable default image optimization
  },
};

export default nextConfig;
