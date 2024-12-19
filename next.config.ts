import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    port: `${process.env.PORT ?? '3000'}`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ahacverhpougzlzojfyo.supabase.co',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
