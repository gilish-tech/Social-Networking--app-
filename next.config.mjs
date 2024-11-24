/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    ppr: 'incremental'
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
          protocol: 'https',
          hostname: 'images.pexels.com',
    
      },
      {
          protocol: 'https',
          hostname: 'img.clerk.com',
    
      },
      {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
    
      },
  ],
},
};

export default nextConfig;
