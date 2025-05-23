"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useBlogStore } from "@/store/blogStore";

export default function BlogsPage() {
  const t = useTranslations("Blog");
  const blogs = useBlogStore((state) => state.blogs);

  return (
    <section className="py-16 md:py-20 text-black dark:text-white">
      <div className="container px-8 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-black dark:text-white">
          {t("blogTitle") || "Blog"}
        </h1>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog.slug}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              {" "}
              <Link href={`/es/blog/${blog.slug}`} className="block">
                {/* Blog card image - Hidden temporarily */}
                {/* 
                <div className="relative h-48 w-full">
                  <Image
                    src={blog.heroImage.src}
                    alt={blog.heroImage.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {blog.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={`tag-${index}`}
                        className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold mb-3 text-black dark:text-white">
                    {blog.title}
                  </h2>
                  <div className="flex items-center text-sm text-black/60 dark:text-white/60">
                    <time dateTime={blog.publishedAt}>
                      {new Date(blog.publishedAt).toLocaleDateString()}
                    </time>
                    <span className="mx-2">•</span>
                    <span>
                      {blog.readingTimeMinutes} {t("minutesRead") || "min read"}
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
