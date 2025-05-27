"use client";

import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export interface BlogProps {
  title: string;
  previewTitle?: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  socialDescription?: string;
  heroImage: { src: string; alt: string; caption?: string };
  heroVideo?: string | null;
  intermediateImage?: { src: string; alt: string; caption?: string };
  publishedAt: string;
  readingTimeMinutes: number;
  tags: string[];
  sections: Array<{
    type:
      | "intro"
      | "highlight"
      | "problem"
      | "solution"
      | "benefits"
      | "testimonial"
      | "cta"
      | "conclusion";
    title?: string;
    content?: string;
    items?: string[];
    quote?: string;
    author?: string;
    buttonText?: string;
    buttonLink?: string;
  }>;
  related?: Array<{ slug: string; title: string; reason: string }>;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const Blog = ({ data }: { data: BlogProps }) => {
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
  const renderSection = (section: BlogProps["sections"][0], index: number) => {
    switch (section.type) {
      case "intro":
        return (
          <section key={`section-${index}`} className="mb-10">
            <p className="text-xl md:text-2xl leading-loose text-black/80 dark:text-white/90">
              {section.content}
            </p>
          </section>
        );

      case "highlight":
        return (
          <section
            key={`section-${index}`}
            className="mb-10 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 px-6 py-8 rounded-r-lg"
          >
            {section.title && (
              <h3 className="text-xl font-semibold mb-3 text-black dark:text-white">
                {section.title}
              </h3>
            )}
            <p className="text-black/80 dark:text-white/80">
              {section.content}
            </p>
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
            className="mb-10 mt-12"
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
                {section.items.map((item, i) => (
                  <li key={`benefit-${i}`} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );

      case "testimonial":
        return (
          <section key={`section-${index}`} className="mb-10">
            <blockquote className="border-l-4 border-green-500 pl-4 py-2 italic text-black/90 dark:text-white/90">
              {section.quote && (
                <p className="text-lg mb-2">&ldquo;{section.quote}&rdquo;</p>
              )}
              {section.author && (
                <footer className="text-sm font-medium text-right text-black/70 dark:text-white/70 italic">
                  — {section.author}
                </footer>
              )}
            </blockquote>
          </section>
        );

      case "cta":
        return (
          <section
            key={`section-${index}`}
            className="mb-10 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center transform transition-all duration-300 hover:scale-[1.01] shadow-sm hover:shadow-md"
          >
            {section.title && (
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-black dark:text-white">
                {section.title}
              </h3>
            )}
            {section.content && (
              <p className="mb-6 text-black/80 dark:text-white/80">
                {section.content}
              </p>
            )}
            {section.buttonText && section.buttonLink && (
              <Link
                href={section.buttonLink}
                className="inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium transition-colors"
              >
                {section.buttonText}
              </Link>
            )}
          </section>
        );

      default:
        return null;
    }
  };
  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.seoDescription,
    image: {
      "@type": "ImageObject",
      url: data.heroImage.src,
      alt: data.heroImage.alt,
    },
    author: {
      "@type": "Organization",
      name: "Geome7ric",
      url: "https://geome7ric.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Geome7ric",
      url: "https://geome7ric.com",
      logo: {
        "@type": "ImageObject",
        url: "https://geome7ric.com/logo.png",
      },
    },
    datePublished: data.publishedAt,
    dateModified: data.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://geome7ric.com/blog/${data.slug}`,
    },
    keywords: data.tags.join(", "),
    wordCount: data.sections.reduce((acc, section) => {
      const wordCount = section.content ? section.content.split(" ").length : 0;
      const itemsCount = section.items
        ? section.items.reduce((sum, item) => sum + item.split(" ").length, 0)
        : 0;
      return acc + wordCount + itemsCount;
    }, 0),
    timeRequired: `PT${data.readingTimeMinutes}M`,
    articleSection: "Technology",
    articleBody: data.sections
      .filter((section) => section.content)
      .map((section) => section.content)
      .join(" "),
  };

  const canonicalUrl = `https://geome7ric.com/blog/${data.slug}`;
  const socialImage = data.heroImage.src;
  const socialDescription = data.socialDescription || data.seoDescription;

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{data.seoTitle}</title>
        <meta name="title" content={data.seoTitle} />
        <meta name="description" content={data.seoDescription} />
        <meta name="keywords" content={data.tags.join(", ")} />
        <meta name="author" content="Geome7ric" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="Spanish" />
        <meta name="revisit-after" content="7 days" />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Article Meta Tags */}
        <meta property="article:published_time" content={data.publishedAt} />
        <meta property="article:modified_time" content={data.publishedAt} />
        <meta property="article:author" content="Geome7ric" />
        <meta property="article:section" content="Technology" />
        {data.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={data.seoTitle} />
        <meta property="og:description" content={socialDescription} />
        <meta property="og:image" content={socialImage} />
        <meta property="og:image:alt" content={data.heroImage.alt} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Geome7ric" />
        <meta property="og:locale" content="es_ES" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={data.seoTitle} />
        <meta property="twitter:description" content={socialDescription} />
        <meta property="twitter:image" content={socialImage} />
        <meta property="twitter:image:alt" content={data.heroImage.alt} />
        <meta name="twitter:creator" content="@geome7ric" />
        <meta name="twitter:site" content="@geome7ric" />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#10B981" />
        <meta name="msapplication-TileColor" content="#10B981" />
        <meta name="application-name" content="Geome7ric Blog" />

        {/* Reading Time and Content Classification */}
        <meta
          name="reading-time"
          content={`${data.readingTimeMinutes} min read`}
        />
        <meta name="content-language" content="es" />
        <meta name="rating" content="General" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* Additional Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Geome7ric",
              url: "https://geome7ric.com",
              logo: "https://geome7ric.com/logo.png",
              sameAs: [
                "https://twitter.com/geome7ric",
                "https://linkedin.com/company/geome7ric",
              ],
            }),
          }}
        />

        {/* Breadcrumb Structured Data */}
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
      </Head>{" "}
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
                className="text-black/80 dark:text-white/80 font-medium"
                aria-current="page"
              >
                {data.title.length > 50
                  ? `${data.title.substring(0, 50)}...`
                  : data.title}
              </li>
            </ol>
          </nav>
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
              {data.title}
            </h1>{" "}
            <div className="flex flex-wrap items-center gap-6 text-sm mb-8 text-black/60 dark:text-white/60">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="font-medium">Geome7ric</span>
              </div>

              <time dateTime={data.publishedAt} className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formatDate(data.publishedAt)}
              </time>

              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {data.readingTimeMinutes} min de lectura
              </span>
            </div>
            {/* Article Tags - Enhanced for SEO */}
            {data.tags && data.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag, index) => (
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
              <p className="text-lg leading-relaxed text-black/80 dark:text-white/90 italic">
                {data.seoDescription}
              </p>
            </div>{" "}
          </header>
          <figure className="mb-12">
            {data.heroVideo ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <video
                  src={data.heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  aria-label={`Video hero for ${data.title}`}
                />
              </div>
            ) : (
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={data.heroImage.src}
                  alt={data.heroImage.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            {data.heroVideo && data.heroImage.caption && (
              <figcaption className="text-sm text-center mt-2 text-black/60 dark:text-white/60">
                {data.heroImage.caption}{" "}
                {/* You might want a separate video caption or adjust this */}
              </figcaption>
            )}
            {!data.heroVideo && data.heroImage.caption && (
              <figcaption className="text-sm text-center mt-2 text-black/60 dark:text-white/60">
                {data.heroImage.caption}
              </figcaption>
            )}
          </figure>
          {/* Table of Contents for longer articles */}
          {tableOfContents.length > 0 && (
            <nav className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
                Contenido del Artículo
              </h3>
              <ol className="space-y-2">
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
          )}{" "}
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-black dark:prose-headings:text-white prose-p:text-black/80 dark:prose-p:text-white/80">
            {data.sections.map((section, index) => {
              // Add intermediate image after a few sections if provided - Hidden temporarily
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
                        />
                      </div>
                      {data.intermediateImage.caption && (
                        <figcaption className="text-sm text-center mt-2 text-black/60 dark:text-white/60">
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
          {/* Social Sharing Section for SEO and Engagement */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-black/70 dark:text-white/70">
                ¿Te resultó útil este artículo? ¡Compártelo!
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(data.seoTitle)}&via=geome7ric`}
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
                      // You could add a toast notification here
                    }
                  }}
                  className="flex items-center justify-center w-10 h-10 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-colors"
                  aria-label="Copiar enlace"
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
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>{" "}
          {data.related && data.related.length > 0 && (
            <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl font-semibold mb-6 text-black dark:text-white">
                Artículos Relacionados
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
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

export default Blog;
