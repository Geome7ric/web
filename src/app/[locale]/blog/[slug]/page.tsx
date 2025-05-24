"use client";

import React from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Blog from "@/components/Blog";
import { useBlogStore } from "@/store/blogStore";

export default function BlogPage() {
  const params = useParams();
  const slug = params.slug as string;
  const getBlogBySlug = useBlogStore((state) => state.getBlogBySlug);

  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <Blog data={blog} />;
}
