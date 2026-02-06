import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/troll-site/"],
      },
    ],
    sitemap: "https://yanicells.dev/sitemap.xml",
  };
}
