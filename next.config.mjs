/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "es", "pt", "zh"],
    defaultLocale: "en",
    localeDetection: true,
  },
};
export default nextConfig;
