import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        loader: 'custom',
        loaderFile: './utils/supabase/supabase-image-loader.ts',
        remotePatterns: [
            new URL('https://img.daisyui.com/**'),
            new URL('https://access-pi.vercel.app/**'),
        ],
    },
};

export default nextConfig;
