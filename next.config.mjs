/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  
  /* config options here */
};
 
 
// const withNextIntl = createNextIntlPlugin();
// export default withNextIntl(nextConfig);
export default nextConfig;
