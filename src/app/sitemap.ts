import type { MetadataRoute } from "next";
import { meetingParams } from "@/lib/meetings";

const BASE = "https://townofpaonia.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/grants`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/cora`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/handbook`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/recall`, changeFrequency: "monthly", priority: 0.6 },
  ];
  const meetings: MetadataRoute.Sitemap = meetingParams().map((p) => ({
    url: `${BASE}/meetings/${p.id}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));
  return [...staticPages, ...meetings];
}
