import type { NextConfig } from 'next';
import path from 'path';

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
  experimental: {
    turbo: {
      resolveAlias: {
        '@': path.resolve(__dirname, '../shared/src'),
        '@untitled-card-game/shared': path.resolve(__dirname, '../shared/src'),
      },
    },
  },
};

export default nextConfig;
