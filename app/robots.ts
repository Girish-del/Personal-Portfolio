import type { MetadataRoute } from "next";

const siteUrl = "https://girishnalawade1.netlify.app";

/**
 * Served at /robots.txt. Allows all crawlers and points them at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
