import type { MetadataRoute } from "next";

// Keep in sync with the canonical URL used in layout.tsx / StructuredData.tsx.
const siteUrl = "https://girishnalawade1.netlify.app";

/**
 * Single-page portfolio, so the sitemap has one entry. Next.js serves this at
 * /sitemap.xml automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
