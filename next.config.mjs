/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.mangadex.org",
      },
    ],
    minimumCacheTTL: 86400,
    formats: ["image/avif", "image/webp"],
  },
  compress: false,
  async headers() {
    return [
      {
        source: "/api/image",
        headers: [
          {
            key: "Content-Type",
            value: "image/jpeg",
          },
        ],
      },
    ];
  },
};
