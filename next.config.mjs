/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export için - Türkticaret.net hosting için
  output: 'export',
  
  images: {
    // Static export için image optimization'ı kapatıyoruz
    unoptimized: true,
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
  
  // Static export'ta serverActions ve headers çalışmaz, bu yüzden kaldırıyoruz
  // experimental: {
  //   serverActions: {
  //     bodySizeLimit: '2mb',
  //   },
  // },
};

export default nextConfig;
