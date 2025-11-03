import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.icons8.com"], // 👈 Agregas este dominio permitido
  },
  /* config options here */
};

module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["img.icons8.com"], // 👈 Agregas este dominio permitido
//   },
// };

// module.exports = nextConfig;
