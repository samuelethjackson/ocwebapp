/** @type {import('next').NextConfig} */
import withVideos from 'next-videos';

const nextConfig = withVideos({
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io"
            }
        ]
    }
});

export default nextConfig;