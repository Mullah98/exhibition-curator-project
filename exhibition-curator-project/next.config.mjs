/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nrs.harvard.edu',
            },
            {
                protocol: 'https',
                hostname: 'collectionapi.metmuseum.org',
            },
            {
                protocol: 'https',
                hostname: 'images.metmuseum.org',
            },
        ],
    },
};

export default nextConfig;
