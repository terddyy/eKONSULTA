/** @type {import('next').NextConfig} */

// Load env variables at build time and make available to client components
const apiKey = process.env.GOOGLE_AI_API_KEY;
console.log('Next.js Config: Loading GOOGLE_AI_API_KEY');
console.log(apiKey ? 'API key is present' : 'API key is missing');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Make API key directly available to client-side code
  publicRuntimeConfig: {
    GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
  },
  // Also use env for compatibility
  env: {
    GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
  },
};

module.exports = nextConfig; 