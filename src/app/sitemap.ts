// Blog sitemap generation utility for SEO
// Place this in: src/app/sitemap.ts

import { MetadataRoute } from "next";

interface BlogPost {
  slug: string;
  title: string;
  publishedAt: string;
  lastModified?: string;
  tags: string[];
}

// Mock data - replace with your actual blog data source
const blogPosts: BlogPost[] = [
  // Add your blog posts here
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://geome7ric.com";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  // Dynamic blog pages
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified || post.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}

// Optional: Generate RSS feed for blog
export function generateRSSFeed() {
  const baseUrl = "https://geome7ric.com";

  const rssItems = blogPosts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category><![CDATA[Technology]]></category>
      ${post.tags.map((tag) => `<category><![CDATA[${tag}]]></category>`).join("")}
    </item>
  `
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Geome7ric Blog</title>
    <description>Soluciones digitales profesionales - Blog técnico</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>info@geome7ric.com (Geome7ric)</managingEditor>
    <webMaster>info@geome7ric.com (Geome7ric)</webMaster>
    ${rssItems}
  </channel>
</rss>`;
}
