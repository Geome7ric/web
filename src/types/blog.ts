// Enhanced blog data interface with comprehensive SEO fields
// Place this in: src/types/blog.ts

export type LocalizedString = {
  es: string;
  en: string;
};

export type LocalizedStringArray = {
  es: string[];
  en: string[];
};

export interface EnhancedBlogProps {
  // Basic content
  title: LocalizedString;
  slug: string; // Slug remains a single string, not localized in this manner
  content: BlogSection[];

  // SEO Meta Tags
  seoTitle: LocalizedString;
  seoDescription: LocalizedString;
  focusKeyword: LocalizedString;
  metaKeywords: LocalizedStringArray;
  socialDescription?: LocalizedString;

  // Media
  heroImage: BlogImage;
  heroVideo?: string; // Video URLs are typically not localized
  intermediateImage?: BlogImage;
  featuredImage?: BlogImage; // For social sharing

  // Publishing Info
  publishedAt: string;
  lastModified?: string;
  readingTimeMinutes: number;

  // Categorization
  category: LocalizedString;
  tags: LocalizedStringArray;

  // Content Structure
  sections: BlogSection[]; // sections are already an array of BlogSection, which will have localized fields
  tableOfContents?: boolean;

  // Engagement
  related?: RelatedArticle[];

  // Author Info (for future multi-author support)
  author?: {
    name: LocalizedString;
    bio?: LocalizedString;
    avatar?: string; // Avatar URL is not localized
    social?: {
      twitter?: string; // Social URLs are not localized
      linkedin?: string; // Social URLs are not localized
    };
  };

  // Advanced SEO
  canonical?: string; // Canonical URL is typically not localized or handled differently
  noindex?: boolean;
  priority?: number; // For sitemap
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";

  // Analytics
  views?: number;
  likes?: number;
  shares?: number;
}

export interface BlogImage {
  src: string; // Image source URL is not localized
  alt: LocalizedString;
  caption?: LocalizedString;
  width?: number;
  height?: number;
}

export interface BlogSection {
  type:
    | "intro"
    | "highlight"
    | "problem"
    | "solution"
    | "benefits"
    | "testimonial"
    | "cta"
    | "conclusion"
    | "faq";
  title?: LocalizedString;
  content?: LocalizedString;
  items?: LocalizedStringArray;
  quote?: LocalizedString;
  author?: LocalizedString; // Author of the quote/testimonial
  buttonText?: LocalizedString;
  buttonLink?: string; // Button links are typically not localized in this manner

  // For FAQ sections
  questions?: {
    question: LocalizedString;
    answer: LocalizedString;
  }[];
}

export interface RelatedArticle {
  slug: string; // Slug remains a single string
  title: LocalizedString;
  reason: LocalizedString;
  image?: string; // Image URL is not localized
  publishedAt?: string;
}
