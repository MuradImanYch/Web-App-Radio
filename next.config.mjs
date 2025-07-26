import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Next.js config — НЕ включает pwa тут!
};

// PWA конфигурация отдельно
const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
};

// Объединяем корректно
export default withPWA(pwaConfig)(config);
