/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      DATABASE_URL: process.env.DATABASE_URL,
    },
  }
  
export default nextConfig
  