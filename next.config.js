/** @type {import('next').NextConfig} */

module.exports = () => {
    const rewrites = async () => {
        return [
            {
                source: "/api/:path*",
                destination: "https://api.mangadex.org/:path*"
            }
        ]
    }
    return {
        rewrites
    }
}