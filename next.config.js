/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'example.com',
            },
            {
                protocol: 'https',
                hostname: '*.example.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: '*.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
            }
        ],
    },
    swcMinify: true,
}

module.exports = nextConfig 