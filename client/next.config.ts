import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    port: `${process.env.PORT ?? '3000'}`,
    author: 'Gaël Jacquin',
    linktree: 'https://linktr.ee/gaeljacquin',
    profilePic: '/gael-himself.webp',
    serverUrl: `${process.env.SERVER_URL}`,
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
