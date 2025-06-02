"use client";

import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { LocalizedBlogProps } from "@/types/blog";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const Blog = ({ data }: { data: LocalizedBlogProps }) => {
  // Generate table of contents from sections with titles
  const tableOfContents = data.sections
    .filter(
      (section) =>
        section.title &&
        ["problem", "solution", "conclusion"].includes(section.type)
    )
    .map((section, index) => ({
      id: `section-${section.type}-${index}`,
      title: section.title!,
      type: section.type,
    }));

  // Render different section types
  const renderSection = (
    section: LocalizedBlogProps["sections"][0],
    index: number
  ) => {
    switch (section.type) {
      case "intro":
        return (
          <section key={`section-${index}`} className="mb-10">
            {section.title && (
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-black dark:text-white">
                {section.title}
              </h2>
            )}
            {section.content && (
              <p className="text-black/80 dark:text-white/80 leading-relaxed">
                {section.content}
              </p>
            )}
          </section>
        );

      case "problem":
        return (
          <section
            key={`section-${index}`}
            id={`section-problem-${index}`}
            className="mb-10"
          >
            {section.title && (
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-black dark:text-white">
                {section.title}
              </h2>
            )}
            {section.content && (
              <p className="text-black/80 dark:text-white/80 leading-relaxed">
                {section.content}
              </p>
            )}
          </section>
        );

      case "solution":
        return (
          <section
            key={`section-${index}`}
            id={`section-solution-${index}`}
            className="mb-10"
          >
            {section.title && (
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-black dark:text-white">
                {section.title}
              </h2>
            )}
            {section.content && (
              <p className="text-black/80 dark:text-white/80 leading-relaxed">
                {section.content}
              </p>
            )}
          </section>
        );

      case "conclusion":
        return (
          <section
            key={`section-${index}`}
            id={`section-conclusion-${index}`}
            className="mb-10"
          >
            {section.title && (
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-black dark:text-white">
                {section.title}
              </h2>
            )}
            {section.content && (
              <p className="text-black/80 dark:text-white/80 leading-relaxed">
                {section.content}
              </p>
            )}
          </section>
        );

      case "benefits":
        return (
          <section key={`section-${index}`} className="mb-10">
            {section.title && (
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-black dark:text-white">
                {section.title}
              </h2>
            )}
            {section.items && section.items.length > 0 && (
              <ul className="space-y-3 text-black/80 dark:text-white/80">
                {section.items.map((item: string, i: number) => (
                  <li key={`benefit-${i}`} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );

      case "testimonial":
        return (
          <section key={`section-${index}`} className="mb-10">
            <blockquote className="border-l-4 border-green-500 pl-6 py-4 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">
              {section.quote && (
                <p className="text-lg italic text-black/80 dark:text-white/80 mb-3">
                  "{section.quote}"
                </p>
              )}
              {section.author && (
                <cite className="text-sm font-medium text-green-600 dark:text-green-400">
                  — {section.author}
                </cite>
              )}
            </blockquote>
          </section>
        );

      case "cta":
        return (
          <section key={`section-${index}`} className="mb-10">
            <div className="text-center p-8 bg-gradient-to-r from-green-500/10 to-blue-500/10 dark:from-green-500/20 dark:to-blue-500/20 rounded-lg border border-green-200 dark:border-green-700/50">
              {section.title && (
                <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">
                  {section.title}
                </h3>
              )}
              {section.content && (
                <p className="text-black/80 dark:text-white/80 mb-6">
                  {section.content}
                </p>
              )}
              {section.buttonText && section.buttonLink && (
                <Link
                  href={section.buttonLink}
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  {section.buttonText}
                </Link>
              )}
            </div>
          </section>
        );

      case "highlight":
        return (
          <section key={`section-${index}`} className="mb-10">
            <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 rounded-lg">
              {section.title && (
                <h3 className="text-lg font-semibold mb-3 text-green-800 dark:text-green-300">
                  {section.title}
                </h3>
              )}
              {section.content && (
                <p className="text-green-700 dark:text-green-200">
                  {section.content}
                </p>
              )}
            </div>
          </section>
        );

      case "faq":
        return (
          <section key={`section-${index}`} className="mb-10">
            {section.title && (
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-black dark:text-white">
                {section.title}
              </h2>
            )}
            {section.questions && section.questions.length > 0 && (
              <div className="space-y-4">
                {section.questions.map((faqItem: any, faqIndex: number) => (
                  <details
                    key={`faq-${faqIndex}`}
                    className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <summary className="font-medium text-black dark:text-white cursor-pointer hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      {faqItem.question}
                    </summary>
                    <p className="mt-3 text-black/80 dark:text-white/80 leading-relaxed">
                      {faqItem.answer}
                    </p>
                  </details>
                ))}
              </div>
            )}
          </section>
        );

      default:
        return null;
    }
  };

  // Generate schema.org JSON-LD for SEO
  const canonicalUrl =
    data.canonical || `https://geome7ric.com/blog/${data.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.seoDescription,
    image: {
      "@type": "ImageObject",
      url: data.featuredImage?.src || data.heroImage.src,
      alt: data.heroImage.alt,
    },
    author: {
      "@type": "Person",
      name: data.author?.name || "Geome7ric Team",
      "@id": data.canonical || `https://geome7ric.com/blog/${data.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Geome7ric",
      logo: {
        "@type": "ImageObject",
        url: "https://geome7ric.com/logo.png",
      },
    },
    datePublished: data.publishedAt,
    dateModified: data.lastModified || data.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    keywords: data.metaKeywords?.join(", "),
    wordCount: data.sections.reduce((acc, section) => {
      const contentCount = section.content
        ? section.content.split(" ").length
        : 0;
      const itemsCount = section.items
        ? section.items.reduce(
            (sum: number, item: string) => sum + item.split(" ").length,
            0
          )
        : 0;
      const questionsCount = section.questions
        ? section.questions.reduce(
            (sum: number, q: any) =>
              sum + q.question.split(" ").length + q.answer.split(" ").length,
            0
          )
        : 0;
      return acc + contentCount + itemsCount + questionsCount;
    }, 0),
    inLanguage: "es-ES",
    articleSection: data.category,
    articleBody: data.sections
      .map((section) => {
        let text = section.content || "";
        if (section.items) {
          text += " " + section.items.join(" ");
        }
        if (section.questions) {
          text +=
            " " +
            section.questions
              .map((q: any) => q.question + " " + q.answer)
              .join(" ");
        }
        return text;
      })
      .join(" "),
  };

  const socialImage = data.featuredImage?.src || data.heroImage.src;

  return (
    <>
      <Head>
        {/* JSON-LD for structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {/* Primary Meta Tags */}
        <title>{data.seoTitle}</title>
        <meta name="title" content={data.seoTitle} />
        <meta name="description" content={data.seoDescription} />
        {data.metaKeywords && (
          <meta name="keywords" content={data.metaKeywords.join(", ")} />
        )}
        {data.author?.name && <meta name="author" content={data.author.name} />}
        <meta
          name="robots"
          content={`${data.noindex ? "noindex" : "index"}, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`}
        />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="es" />
        <meta name="revisit-after" content="7 days" />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {data.changeFrequency && (
          <meta name="changefreq" content={data.changeFrequency} />
        )}
        {data.priority && (
          <meta name="priority" content={data.priority.toString()} />
        )}

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={data.seoTitle} />
        <meta property="og:description" content={data.seoDescription} />
        <meta property="og:image" content={socialImage} />
        <meta property="og:site_name" content="Geome7ric" />
        <meta property="article:published_time" content={data.publishedAt} />
        {data.lastModified && (
          <meta property="article:modified_time" content={data.lastModified} />
        )}
        {data.author?.name && (
          <meta property="article:author" content={data.author.name} />
        )}
        {data.category && (
          <meta property="article:section" content={data.category} />
        )}
        {data.tags.map((tag: string, index: number) => (
          <meta key={`og-tag-${index}`} property="article:tag" content={tag} />
        ))}

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={data.seoTitle} />
        <meta property="twitter:description" content={data.seoDescription} />
        <meta property="twitter:image" content={socialImage} />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Inicio",
                  item: "https://geome7ric.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Blog",
                  item: "https://geome7ric.com/blog",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: data.title,
                  item: canonicalUrl,
                },
              ],
            }),
          }}
        />
      </Head>

      <article className="py-16 md:py-20 text-black dark:text-white">
        <div className="container px-8 max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-black/60 dark:text-white/60">
              <li>
                <Link
                  href="/"
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <svg
                  className="w-4 h-4 mx-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <svg
                  className="w-4 h-4 mx-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
              <li
                className="text-green-600 dark:text-green-400 font-medium"
                aria-current="page"
              >
                {data.title.length > 50
                  ? `${data.title.substring(0, 50)}...`
                  : data.title}
              </li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-black dark:text-white leading-tight">
              {data.title}
            </h1>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-black/60 dark:text-white/60 mb-6">
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                {formatDate(data.publishedAt)}
              </span>
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                {data.readingTimeMinutes} min de lectura
              </span>
            </div>

            {/* Article Tags */}
            {data.tags && data.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full border border-green-200 dark:border-green-700/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Article Summary/Description for SEO */}
            <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-lg text-black/80 dark:text-white/80 leading-relaxed">
                {data.socialDescription || data.seoDescription}
              </p>
            </div>
          </header>

          {/* Hero Media */}
          <figure className="mb-12">
            {data.heroVideo ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  poster={data.heroImage.src}
                  controls
                  preload="metadata"
                  playsInline
                >
                  <source src={data.heroVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <Image
                  src={data.heroImage.src}
                  alt={data.heroImage.alt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
            )}
            {data.heroVideo && data.heroImage.caption && (
              <figcaption className="mt-3 text-sm text-black/60 dark:text-white/60 text-center italic">
                {data.heroImage.caption}
              </figcaption>
            )}
            {!data.heroVideo && data.heroImage.caption && (
              <figcaption className="mt-3 text-sm text-black/60 dark:text-white/60 text-center italic">
                {data.heroImage.caption}
              </figcaption>
            )}
          </figure>

          {/* Table of Contents */}
          {tableOfContents.length > 0 && (
            <nav className="mb-10 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
                Tabla de Contenidos
              </h3>
              <ol className="space-y-2 text-sm">
                {tableOfContents.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors leading-relaxed"
                    >
                      {index + 1}. {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-black dark:prose-headings:text-white prose-p:text-black/80 dark:prose-p:text-white/80">
            {data.sections.map((section, index) => {
              // Add intermediate image after a few sections if provided
              if (index === 2 && data.intermediateImage) {
                return (
                  <React.Fragment key={`section-with-image-${index}`}>
                    {renderSection(section, index)}
                    <figure className="my-12">
                      <div className="relative w-full md:w-4/5 mx-auto h-[300px] rounded-lg overflow-hidden">
                        <Image
                          src={data.intermediateImage.src}
                          alt={data.intermediateImage.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                        />
                      </div>
                      {data.intermediateImage.caption && (
                        <figcaption className="mt-3 text-sm text-black/60 dark:text-white/60 text-center italic">
                          {data.intermediateImage.caption}
                        </figcaption>
                      )}
                    </figure>
                  </React.Fragment>
                );
              }
              return renderSection(section, index);
            })}
          </div>

          {/* Social Sharing */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                  ¿Te gustó este artículo?
                </h3>
                <p className="text-black/60 dark:text-white/60">
                  Compártelo con tus colegas y amigos
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(data.seoTitle)}&via=${data.author?.social?.twitter?.split("/").pop() || "geome7ric"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
                  aria-label="Compartir en Twitter"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-full transition-colors"
                  aria-label="Compartir en LinkedIn"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                  aria-label="Compartir en Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: data.seoTitle,
                        text: data.seoDescription,
                        url: canonicalUrl,
                      });
                    } else {
                      navigator.clipboard.writeText(canonicalUrl);
                      alert("Enlace copiado al portapapeles");
                    }
                  }}
                  className="flex items-center justify-center w-10 h-10 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-colors"
                  aria-label="Compartir enlace"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {data.related && data.related.length > 0 && (
            <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold mb-8 text-black dark:text-white">
                Artículos Relacionados
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.related.map((item, index) => (
                  <article
                    key={`related-${index}`}
                    className="block p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 hover:shadow-md dark:hover:bg-gray-800 dark:hover:shadow-green-900/10 transition-all"
                  >
                    <Link href={`/blog/${item.slug}`} className="block">
                      <h4 className="text-lg font-medium mb-2 text-black dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-black/70 dark:text-white/70">
                        {item.reason}
                      </p>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
};

export type BlogProps = LocalizedBlogProps;
export default Blog;
