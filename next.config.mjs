/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://api.mangadex.org/:path*' // Proxy to Backend
            }
        ]
    },
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'https',
    //             hostname: 'gogocdn.net',
    //             port: '',
    //             pathname: '/**/**',
    //         },
    //     ],
    // },
};

export default nextConfig;
