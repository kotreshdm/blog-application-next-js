/** @type {import('next').NextConfig} */
const config = require("./config");
const nextConfig = {
  env: {
    API: config.API,
    NEXTAUTH_URL: config.NEXTAUTH_URL,
  },
};

module.exports = nextConfig;
