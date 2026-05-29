/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auth/session',
        destination: '/empty.json',
      },
      {
        source: '/api/coupons',
        destination: '/empty.json',
      },
      {
        source: '/api/rewards/settings',
        destination: '/empty.json',
      },
    ];
  },
};

export default nextConfig;
