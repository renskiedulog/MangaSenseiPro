/** @type {import('next').NextConfig} */

module.exports = () => {
    const rewrites = async () => {
        return [
            {
                source: "/api/:path*",
                destination: "https://api.mangadex.org/:path*"
            },
            {
                source: "/image/:path*",
                destination: "https://uploads.mangadex.org/:path*"
            }
        ]
    }
    return {
        rewrites
    }
}