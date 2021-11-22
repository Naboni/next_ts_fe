/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['hypeauditor.com'],
  },
};
// ! PWA does'nt work with next 12 on production deployment
module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
});
