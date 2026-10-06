import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/tech-stack", destination: "/about", permanent: true },
      { source: "/my-story", destination: "/about", permanent: true },
      { source: "/music", destination: "/about#music", permanent: true },
      { source: "/anime", destination: "/about#anime", permanent: true },
      { source: "/photography", destination: "/about#photography", permanent: true },
      {
        source: "/projects/tl-drafter",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/projects/instructor-slides-generator",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
