import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL('https://img.daisyui.com/**'),
            new URL('https://access-pi.vercel.app/**'),
            new URL('https://kiuwhqudmnaxsolairom.supabase.co/storage/v1/object/authenticated/**'),
            {
                protocol: 'https',
                hostname: '**.vercel.app',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: '**.supabase.co',
            },
        ],
    },
};

export default nextConfig;
