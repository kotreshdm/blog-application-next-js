/** @type {import('next').NextConfig} */
const config = require("./config");
const nextConfig = {
  env: {
    DB_URI: config.DB_URI,
    API: config.API,
    NEXTAUTH_SECRET: config.NEXTAUTH_SECRET,
    NEXTAUTH_URL: config.NEXTAUTH_URL,
  },
};

module.exports = nextConfig;
