import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [new URL('https://img.daisyui.com/**'), new URL('https://access-pi.vercel.app/**')],
    },
};

export default nextConfig;
