import type { MetadataRoute } from "next";
import { meetingParams } from "@/lib/meetings";
import { paoniaRfps } from "@/data/rfps";

const BASE = "https://townofpaonia.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/parking`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/parking/survey`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/water`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/grants`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/rfp`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/rfp/executive-search`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/cora`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/handbook`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/recall`, changeFrequency: "monthly", priority: 0.6 },
  ];
  const rfpDetails: MetadataRoute.Sitemap = paoniaRfps.map((r) => ({
    url: `${BASE}/rfp/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));
  const meetings: MetadataRoute.Sitemap = meetingParams().map((p) => ({
    url: `${BASE}/meetings/${p.id}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));
  return [...staticPages, ...rfpDetails, ...meetings];
}
