"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Blog from "@/components/Blog";
import { useBlogStore } from "@/store/blogStore";
import useScrollRestoration from "@/hooks/useScrollRestoration";

export default function BlogPage() {
  const params = useParams();
  const slug = params.slug as string;
  const locale = params.locale as string;
  const getBlogBySlugAndLocale = useBlogStore(
    (state) => state.getBlogBySlugAndLocale
  );
  const setCurrentLocale = useBlogStore((state) => state.setCurrentLocale); // Actualizamos el locale en el store
  useEffect(() => {
    if (locale) {
      setCurrentLocale(locale);
    }
  }, [locale, setCurrentLocale]);

  // Aplicamos la restauración de scroll
  useScrollRestoration();

  // Obtenemos el blog con el locale específico
  const blog = getBlogBySlugAndLocale(slug, locale);

  if (!blog) {
    notFound();
  }

  return <Blog data={blog} />;
}
