import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/projects", destination: "/#work", permanent: true },
      { source: "/experience", destination: "/#experience", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/tech-stack", destination: "/#about", permanent: true },
      { source: "/my-story", destination: "/#about", permanent: true },
      {
        source: "/projects/tl-drafter",
        destination: "/projects/eskwelabs-capstone",
        permanent: true,
      },
      {
        source: "/projects/instructor-slides-generator",
        destination: "/projects/eskwelabs-capstone",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
