"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useBlogStore } from "@/store/blogStore";
import { BlogProps } from "@/components/Blog";
import { useParams } from "next/navigation";
import { useScrollToTopOnNavigation } from "@/hooks/useScrollRestoration";

// Helper function to format date in a readable way
const formatDate = (dateString: string, locale: string = "es"): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

// Component for a single blog preview card
const BlogCard: React.FC<{ blog: BlogProps; locale?: string }> = ({
  blog,
  locale = "es",
}) => {
  // Utilizamos el hook para manejar el scroll
  const handleScrollToTop = useScrollToTopOnNavigation();

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="block h-full group"
      scroll={true}
      onClick={handleScrollToTop}
    >
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] group-hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] flex flex-col h-full">
        <div className="relative h-48 w-full overflow-hidden">
          {blog.heroVideo ? (
            <video
              src={blog.heroVideo}
              className="object-cover w-full h-full"
              autoPlay
              muted
              loop
              playsInline
              poster={blog.heroImage.src}
            />
          ) : (
            <Image
              src={blog.heroImage.src}
              alt={blog.heroImage.alt}
              className="object-cover transition-transform duration-500"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center mb-3">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {formatDate(blog.publishedAt, locale)}
            </span>
            <span className="mx-2 text-slate-400">•</span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {blog.readingTimeMinutes}{" "}
              {locale === "en" ? "min read" : "min de lectura"}
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">
            {blog.previewTitle || blog.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow">
            {blog.socialDescription || blog.seoDescription.substring(0, 120)}
            {(blog.socialDescription || blog.seoDescription).length > 120 &&
              "..."}
          </p>
          <div className="flex flex-wrap gap-2">
            {blog.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

const BlogPreview: React.FC = () => {
  const params = useParams();
  const locale = (params?.locale as string) || "es";
  const { fetchBlogs, isLoading, setCurrentLocale, getLocalizedBlogs } =
    useBlogStore();

  useEffect(() => {
    // Actualizar el locale en el store
    setCurrentLocale(locale);
    // Cargar los blogs
    fetchBlogs();
  }, [fetchBlogs, locale, setCurrentLocale]);

  // Obtener blogs localizados
  const displayBlogs = getLocalizedBlogs(locale).slice(0, 3);

  return (
    <section id="blog" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {" "}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
          {locale === "en" ? "Our Blog" : "Nuestro Blog"}
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          {locale === "en"
            ? "Discover ideas, trends, and advice on custom software development and business digitalization"
            : "Descubre ideas, tendencias y consejos sobre desarrollo de software a medida y digitalización empresarial"}
        </p>
      </div>{" "}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBlogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} locale={locale} />
          ))}
        </div>
      )}{" "}
      <div className="mt-12 text-center">
        <Link
          href="/blog"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          scroll={true}
          onClick={useScrollToTopOnNavigation()}
        >
          {locale === "en" ? "View all articles" : "Ver todos los artículos"}
        </Link>
      </div>
    </section>
  );
};

export default BlogPreview;
