/** @type {import('next').NextConfig} */

module.exports = () => {
    const rewrites = async () => {
        return [
            {
                source: "/api/:path*",
                destination:
                    process.env.NODE_ENV === 'production'
                        ? 'https://api.mangadex.org/:path*'
                        : 'https://api.mangadex.org/:path*',
            },
            {
                source: "/image/:path*",
                destination:
                    process.env.NODE_ENV === 'production'
                        ? 'https://uploads.mangadex.org/:path*'
                        : 'https://uploads.mangadex.org/:path*',
            }
        ]
    }
    return {
        rewrites
    }
}