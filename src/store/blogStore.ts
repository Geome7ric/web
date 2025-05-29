/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { BlogProps } from "@/components/Blog";
import { blogsData } from "@/data/blog/blogsData";

// Tipo para manejar strings o objetos localizados
type LocalizedField<T> = T | { es: T; en: T };

interface BlogStore {
  blogs: BlogProps[];
  featuredBlogs: BlogProps[];
  isLoading: boolean;
  error: string | null;
  currentLocale: string;
  getBlogBySlug: (slug: string) => BlogProps | undefined;
  getBlogBySlugAndLocale: (
    slug: string,
    locale: string
  ) => BlogProps | undefined;
  setCurrentLocale: (locale: string) => void;
  fetchBlogs: () => Promise<void>;
  getLocalizedBlogs: (locale: string) => BlogProps[];
}

// Función auxiliar para obtener el valor localizado
function getLocalizedValue<T>(value: LocalizedField<T>, locale: string): T {
  if (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    ("es" in value || "en" in value)
  ) {
    // @ts-expect-error - Sabemos que value tiene estructura de localización
    return value[locale] || value.en || value.es;
  }
  // Ya no es necesario el ts-expect-error aquí
  return value;
}

// Función para localizar un blog según el idioma
function localizeBlog(blog: BlogProps, locale: string): BlogProps {
  const localizedBlog: BlogProps = {
    ...blog,
    title: getLocalizedValue(blog.title, locale),
    previewTitle: blog.previewTitle
      ? getLocalizedValue(blog.previewTitle, locale)
      : undefined,
    seoTitle: getLocalizedValue(blog.seoTitle, locale),
    seoDescription: getLocalizedValue(blog.seoDescription, locale),
    socialDescription: blog.socialDescription
      ? getLocalizedValue(blog.socialDescription, locale)
      : undefined,
    heroImage: {
      src: blog.heroImage.src,
      alt: getLocalizedValue(blog.heroImage.alt, locale),
      caption: blog.heroImage.caption
        ? getLocalizedValue(blog.heroImage.caption, locale)
        : undefined,
    },
    intermediateImage: blog.intermediateImage
      ? {
          src: blog.intermediateImage.src,
          alt: getLocalizedValue(blog.intermediateImage.alt, locale),
          caption: blog.intermediateImage.caption
            ? getLocalizedValue(blog.intermediateImage.caption, locale)
            : undefined,
        }
      : undefined,
    tags: Array.isArray(blog.tags)
      ? blog.tags
      : getLocalizedValue(blog.tags, locale),
    sections: blog.sections.map((section) => ({
      ...section,
      title: section.title
        ? getLocalizedValue(section.title, locale)
        : undefined,
      content: section.content
        ? getLocalizedValue(section.content, locale)
        : undefined,
      items: section.items
        ? Array.isArray(section.items)
          ? section.items
          : getLocalizedValue(section.items, locale)
        : undefined,
      quote: section.quote
        ? getLocalizedValue(section.quote, locale)
        : undefined,
      author: section.author
        ? getLocalizedValue(section.author, locale)
        : undefined,
      buttonText: section.buttonText
        ? getLocalizedValue(section.buttonText, locale)
        : undefined,
    })),
    related: blog.related
      ? blog.related.map((related) => ({
          ...related,
          title: getLocalizedValue(related.title, locale),
          reason: getLocalizedValue(related.reason, locale),
        }))
      : undefined,
  };

  return localizedBlog;
}

export const useBlogStore = create<BlogStore>((set, get) => ({
  blogs: blogsData,
  currentLocale: "es", // Por defecto español
  getBlogBySlug: (slug: string) => {
    const { blogs, currentLocale } = get();
    const blog = blogs.find((blog) => blog.slug === slug);
    return blog ? localizeBlog(blog, currentLocale) : undefined;
  },
  getBlogBySlugAndLocale: (slug: string, locale: string) => {
    const { blogs } = get();
    const blog = blogs.find((blog) => blog.slug === slug);
    return blog ? localizeBlog(blog, locale) : undefined;
  },
  setCurrentLocale: (locale: string) => {
    set({ currentLocale: locale });
  },
  getLocalizedBlogs: (locale: string) => {
    const { blogs } = get();
    return blogs.map((blog) => localizeBlog(blog, locale));
  },
  featuredBlogs: [],
  isLoading: false,
  error: null,
  fetchBlogs: async () => {
    set({ isLoading: true });
    try {
      // In a real application, this would be an API call
      // Simulate a small delay to mimic real loading
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Usamos los blogs existentes en el store
      const blogs = get().blogs;
      const currentLocale = get().currentLocale;
      const localizedBlogs = blogs.map((blog) =>
        localizeBlog(blog, currentLocale)
      );

      set({
        featuredBlogs: localizedBlogs.slice(0, 3),
        isLoading: false,
      });
    } catch {
      set({
        error: "Error al cargar los blogs",
        isLoading: false,
      });
    }
  },
}));
