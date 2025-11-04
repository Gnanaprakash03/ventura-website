'use client';

import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaUser, FaTags, FaArrowRight, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

export function SearchBlogs({ blogs }: { blogs: any[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  useEffect(() => {
    const filtered = blogs.filter(blog =>
      (blog.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (blog.content && Array.isArray(blog.content) && blog.content.some((block: any) => 
        block._type === 'block' && block.children.some((child: any) => 
          (child.text?.toLowerCase() || '').includes(searchQuery.toLowerCase())
        )
      )) ||
      (blog.tags && Array.isArray(blog.tags) && blog.tags.some((tag: string) => (tag?.toLowerCase() || '').includes(searchQuery.toLowerCase()))) ||
      (blog.body && Array.isArray(blog.body) && blog.body.some((block: any) =>
        block._type === 'block' && block.children.some((child: any) =>
          (child.text?.toLowerCase() || '').includes(searchQuery.toLowerCase())
        )
      ))
    );
    setFilteredBlogs(filtered);
  }, [searchQuery, blogs]);

  return (
    <>
      <div className="mb-8 relative">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog: any) => (
          <article
            key={blog._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <Link href={`/resources/blogs/${blog.slug?.current || ''}`}>
              <div className="relative h-48">
                <Image 
                  src={urlFor(blog.mainImage).url()}
                  alt={blog.title || 'Blog post'} 
                  fill
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">Read More</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">{blog.title || 'Untitled'}</h2>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FaUser className="mr-2" />
                  <span className="mr-4">{blog.author?.name || 'Unknown Author'}</span>
                  <FaCalendarAlt className="mr-2" />
                  <span>{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Unknown date'}</span>
                </div>
                <div className="flex flex-wrap mb-4">
                  {blog.tags && Array.isArray(blog.tags) && blog.tags.map((tag: string, tagIndex: number) => (
                    <span key={tagIndex} className="mr-2 mb-2 bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300">
                  <span className="mr-2">Read More</span>
                  <FaArrowRight />
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}