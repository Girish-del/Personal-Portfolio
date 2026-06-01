import { personal } from "@/lib/content";

const siteUrl = "https://girishnalawade1.netlify.app";

export function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    email: `mailto:${personal.email}`,
    url: siteUrl,
    image: `${siteUrl}/og.png`,
    jobTitle: "Software Engineer",
    description: personal.shortBio,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tempe",
      addressRegion: "AZ",
      addressCountry: "US",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Arizona State University",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Savitribai Phule Pune University",
      },
    ],
    sameAs: [personal.github, personal.linkedin],
    knowsAbout: [
      "Software Engineering",
      "Backend Development",
      "Distributed Systems",
      "Cloud Infrastructure",
      "LLM Agents",
      "RAG Pipelines",
      "Model Context Protocol",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
