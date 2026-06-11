import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://relocate2day.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://relocate2day.com/blog", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://relocate2day.com/countries/spain", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://relocate2day.com/countries/portugal", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://relocate2day.com/countries/italy", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://relocate2day.com/countries/gibraltar", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://relocate2day.com/countries/malta", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://relocate2day.com/countries/bulgaria", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://relocate2day.com/checklist", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://relocate2day.com/image-credits", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
