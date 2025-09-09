/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only use standalone output in production/deployment environments
  ...(process.env.NODE_ENV === 'production' && process.env.NETLIFY && {
    output: 'standalone',
  }),
};

export default nextConfig;