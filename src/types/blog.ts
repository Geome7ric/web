// Enhanced blog data interface with comprehensive SEO fields

import {
  LocalizedString,
  LocalizedStringArray,
  ImageAsset,
  LocalizedImageAsset,
} from "./common";

// Enhanced blog props (raw data with localized fields)
export interface EnhancedBlogProps {
  // Basic content
  title: LocalizedString;
  previewTitle?: LocalizedString; // Added missing previewTitle
  slug: string;
  content?: BlogSection[]; // Made optional since it's not used in current data

  // SEO Meta Tags
  seoTitle: LocalizedString;
  seoDescription: LocalizedString;
  focusKeyword?: LocalizedString;
  metaKeywords?: LocalizedStringArray;
  socialDescription?: LocalizedString;

  // Media
  heroImage: ImageAsset;
  heroVideo?: string; // Changed to optional string (undefined instead of null)
  intermediateImage?: ImageAsset;
  featuredImage?: ImageAsset;

  // Publishing Info
  publishedAt: string;
  lastModified?: string;
  readingTimeMinutes: number;

  // Categorization
  category?: LocalizedString;
  tags: LocalizedStringArray;

  // Content Structure
  sections: BlogSection[];
  tableOfContents?: boolean;

  // Engagement
  related?: RelatedArticle[];

  // Author Info
  author?: {
    name: LocalizedString;
    bio?: LocalizedString;
    avatar?: string;
    social?: {
      twitter?: string;
      linkedin?: string;
    };
  };

  // Advanced SEO
  canonical?: string;
  noindex?: boolean;
  priority?: number;
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

// Localized blog props (after localization)
export interface LocalizedBlogProps {
  title: string;
  previewTitle?: string;
  slug: string;
  content?: LocalizedBlogSection[];

  seoTitle: string;
  seoDescription: string;
  focusKeyword?: string;
  metaKeywords?: string[];
  socialDescription?: string;

  heroImage: LocalizedImageAsset;
  heroVideo?: string;
  intermediateImage?: LocalizedImageAsset;
  featuredImage?: LocalizedImageAsset;

  publishedAt: string;
  lastModified?: string;
  readingTimeMinutes: number;

  category?: string;
  tags: string[];

  sections: LocalizedBlogSection[];
  tableOfContents?: boolean;

  related?: LocalizedRelatedArticle[];

  author?: {
    name: string;
    bio?: string;
    avatar?: string;
    social?: {
      twitter?: string;
      linkedin?: string;
    };
  };

  canonical?: string;
  noindex?: boolean;
  priority?: number;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";

  views?: number;
  likes?: number;
  shares?: number;
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
  author?: LocalizedString;
  buttonText?: LocalizedString;
  buttonLink?: string;

  questions?: {
    question: LocalizedString;
    answer: LocalizedString;
  }[];
}

export interface LocalizedBlogSection {
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
  title?: string;
  content?: string;
  items?: string[];
  quote?: string;
  author?: string;
  buttonText?: string;
  buttonLink?: string;

  questions?: {
    question: string;
    answer: string;
  }[];
}

export interface RelatedArticle {
  slug: string;
  title: LocalizedString;
  reason: LocalizedString;
  image?: string;
  publishedAt?: string;
}

export interface LocalizedRelatedArticle {
  slug: string;
  title: string;
  reason: string;
  image?: string;
  publishedAt?: string;
}

// Legacy type alias for compatibility with existing Blog component
export type BlogProps = LocalizedBlogProps;
