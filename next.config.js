/** @type {import('next').NextConfig} */
const config = require("./src/utils/config.js"); // Use require instead of import

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    DB_URI: config.DB_URI,
    API: config.API,
    NEXTAUTH_SECRET: config.NEXTAUTH_SECRET,
    NEXTAUTH_URL: config.NEXTAUTH_URL,
    // GOOGLE_CLIENT_ID: config.GOOGLE_CLIENT_ID,
    // GOOGLE_CLIENT_SECRET: config.GOOGLE_CLIENT_SECRET,
    // CLOUDINARY_CLOUD_NAME: config.CLOUDINARY_CLOUD_NAME,
    // CLOUDINARY_API_KEY: config.CLOUDINARY_API_KEY,
    // CLOUDINARY_API_SECRET: config.CLOUDINARY_API_SECRET,
  },
};

module.exports = nextConfig; // Export using CommonJS
