/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel deployment için - static export kaldırıldı
  // Next.js native olarak Vercel'de çalışacak
  
  images: {
    // Vercel'de image optimization aktif
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'fojamajnptdojztlpvjd.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
