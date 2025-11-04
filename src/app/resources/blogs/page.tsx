import React from 'react';
import { client } from '@/lib/sanity';
import { SearchBlogs } from './SearchBlogs';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs – FIDAS Fabric Insights",
  description:
    "Read FIDAS blogs to stay updated on textile industry trends, fabric inspection techniques, grading insights, and quality management best practices.",
  keywords: [
    "FIDAS blogs",
    "textile industry insights",
    "fabric inspection tips",
    "textile quality management",
    "grading insights",
  ],
  openGraph: {
    title: "FIDAS Blogs – Textile Industry Insights & Updates",
    description:
      "Explore the latest articles, tips, and insights from FIDAS on fabric inspection, grading, and textile quality management.",
    url: "https://fidas.in/resources/blogs",
    siteName: "FIDAS",
    images: [
      {
        url: "/og-resources-blogs.jpg",
        width: 1200,
        height: 630,
        alt: "FIDAS Blogs",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIDAS Blogs – Textile Industry Insights & Updates",
    description:
      "Stay informed with FIDAS blogs on fabric inspection, grading, and textile quality management best practices.",
    images: ["/og-resources-blogs.jpg"],
  },
};


async function getBlogs() {
  const blogs = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author->{name},
    mainImage,
    publishedAt,
    content,
    "tags": categories[]->title
  }`, {}, { next: { revalidate: 0 } });
  
  console.log("Fetched blogs:", JSON.stringify(blogs, null, 2));
  return blogs;
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Blogs() {
  const blogs = await getBlogs();

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold mb-16 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
          FIDAS Blog
        </h1>

        <SearchBlogs blogs={blogs} />
      </div>
    </div>
  );
}