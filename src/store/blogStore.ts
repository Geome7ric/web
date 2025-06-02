/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { EnhancedBlogProps, LocalizedBlogProps } from "@/types/blog";
import {
  Locale,
  LocalizedString,
  LocalizedStringArray,
  LocalizedImageAsset,
  ImageAsset,
} from "@/types/common";
import { blogsData } from "@/data/blog/blogsData";

interface BlogStore {
  blogs: EnhancedBlogProps[];
  featuredBlogs: LocalizedBlogProps[];
  isLoading: boolean;
  error: string | null;
  currentLocale: string; // Methods expected by components
  fetchBlogs: () => Promise<void>;
  setCurrentLocale: (locale: string) => void;
  getLocalizedBlogs: (locale: string) => LocalizedBlogProps[];
  getBlogBySlug: (slug: string) => LocalizedBlogProps | undefined;
  getBlogBySlugAndLocale: (
    slug: string,
    locale: string
  ) => LocalizedBlogProps | undefined;
  getLocalizedString: (
    localizedString: LocalizedString,
    locale: string
  ) => string;
}

// Helper function to localize a string
export const localizeString = (
  localizedString: LocalizedString,
  locale: string
): string => {
  if (typeof localizedString === "string") {
    return localizedString;
  }
  return localizedString[locale as Locale] || localizedString.en || "";
};

// Helper function to localize string arrays
const localizeStringArray = (
  localizedArray: LocalizedStringArray,
  locale: string
): string[] => {
  return localizedArray[locale as Locale] || localizedArray.en || [];
};

// Helper function to localize image assets
const localizeImageAsset = (
  imageAsset: ImageAsset | LocalizedImageAsset,
  locale: string
): LocalizedImageAsset => {
  if (!imageAsset) return { src: "", alt: "" };

  return {
    src: imageAsset.src,
    alt:
      typeof imageAsset.alt === "string"
        ? imageAsset.alt
        : localizeString(imageAsset.alt, locale),
    caption: imageAsset.caption
      ? typeof imageAsset.caption === "string"
        ? imageAsset.caption
        : localizeString(imageAsset.caption, locale)
      : undefined,
    width: imageAsset.width,
    height: imageAsset.height,
  };
};

// Helper function to convert EnhancedBlogProps to LocalizedBlogProps
const localizeBlog = (
  blog: EnhancedBlogProps,
  locale: string
): LocalizedBlogProps => ({
  title: localizeString(blog.title, locale),
  previewTitle: blog.previewTitle
    ? localizeString(blog.previewTitle, locale)
    : undefined,
  slug: blog.slug,
  content: blog.content
    ? blog.content.map((section) => ({
        type: section.type,
        title: section.title
          ? localizeString(section.title, locale)
          : undefined,
        content: section.content
          ? localizeString(section.content, locale)
          : undefined,
        items: section.items
          ? localizeStringArray(section.items, locale)
          : undefined,
        quote: section.quote
          ? localizeString(section.quote, locale)
          : undefined,
        author: section.author
          ? localizeString(section.author, locale)
          : undefined,
        buttonText: section.buttonText
          ? localizeString(section.buttonText, locale)
          : undefined,
        buttonLink: section.buttonLink,
        questions: section.questions
          ? section.questions.map((q) => ({
              question: localizeString(q.question, locale),
              answer: localizeString(q.answer, locale),
            }))
          : undefined,
      }))
    : undefined,

  seoTitle: localizeString(blog.seoTitle, locale),
  seoDescription: localizeString(blog.seoDescription, locale),
  focusKeyword: blog.focusKeyword
    ? localizeString(blog.focusKeyword, locale)
    : undefined,
  metaKeywords: blog.metaKeywords
    ? localizeStringArray(blog.metaKeywords, locale)
    : undefined,
  socialDescription: blog.socialDescription
    ? localizeString(blog.socialDescription, locale)
    : undefined,

  heroImage: localizeImageAsset(blog.heroImage, locale),
  heroVideo: blog.heroVideo,
  intermediateImage: blog.intermediateImage
    ? localizeImageAsset(blog.intermediateImage, locale)
    : undefined,
  featuredImage: blog.featuredImage
    ? localizeImageAsset(blog.featuredImage, locale)
    : undefined,

  publishedAt: blog.publishedAt,
  lastModified: blog.lastModified,
  readingTimeMinutes: blog.readingTimeMinutes,

  category: blog.category ? localizeString(blog.category, locale) : undefined,
  tags: localizeStringArray(blog.tags, locale),

  sections: blog.sections.map((section) => ({
    type: section.type,
    title: section.title ? localizeString(section.title, locale) : undefined,
    content: section.content
      ? localizeString(section.content, locale)
      : undefined,
    items: section.items
      ? localizeStringArray(section.items, locale)
      : undefined,
    quote: section.quote ? localizeString(section.quote, locale) : undefined,
    author: section.author ? localizeString(section.author, locale) : undefined,
    buttonText: section.buttonText
      ? localizeString(section.buttonText, locale)
      : undefined,
    buttonLink: section.buttonLink,
    questions: section.questions
      ? section.questions.map((q) => ({
          question: localizeString(q.question, locale),
          answer: localizeString(q.answer, locale),
        }))
      : undefined,
  })),
  tableOfContents: blog.tableOfContents,

  related: blog.related
    ? blog.related.map((rel) => ({
        slug: rel.slug,
        title: localizeString(rel.title, locale),
        reason: localizeString(rel.reason, locale),
        image: rel.image,
        publishedAt: rel.publishedAt,
      }))
    : undefined,

  author: blog.author
    ? {
        name: localizeString(blog.author.name, locale),
        bio: blog.author.bio
          ? localizeString(blog.author.bio, locale)
          : undefined,
        avatar: blog.author.avatar,
        social: blog.author.social,
      }
    : undefined,

  canonical: blog.canonical,
  noindex: blog.noindex,
  priority: blog.priority,
  changeFrequency: blog.changeFrequency,
  views: blog.views,
  likes: blog.likes,
  shares: blog.shares,
});

export const useBlogStore = create<BlogStore>((set, get) => ({
  blogs: blogsData,
  featuredBlogs: [],
  isLoading: false,
  error: null,
  currentLocale: "es",

  fetchBlogs: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      const { blogs, currentLocale } = get();
      const localizedBlogs = blogs.map((blog) =>
        localizeBlog(blog, currentLocale)
      );

      set({
        featuredBlogs: localizedBlogs.slice(0, 3),
        isLoading: false,
      });
    } catch {
      set({
        error: "Error loading blogs",
        isLoading: false,
      });
    }
  },

  setCurrentLocale: (locale: string) => {
    set({ currentLocale: locale });
  },

  getLocalizedBlogs: (locale: string) => {
    const { blogs } = get();
    return blogs.map((blog) => localizeBlog(blog, locale));
  },

  getBlogBySlug: (slug: string) => {
    const { blogs, currentLocale } = get();
    const blog = blogs.find((b) => b.slug === slug);
    return blog ? localizeBlog(blog, currentLocale) : undefined;
  },

  getBlogBySlugAndLocale: (slug: string, locale: string) => {
    const { blogs } = get();
    const blog = blogs.find((b) => b.slug === slug);
    return blog ? localizeBlog(blog, locale) : undefined;
  },

  getLocalizedString: localizeString,
}));
