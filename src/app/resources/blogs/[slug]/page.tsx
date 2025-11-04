import React from 'react';
import { FaCalendarAlt, FaUser, FaTags } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';

export const revalidate = 60; // Revalidate every 60 seconds

async function getBlog(slug: string) {
  return await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
    ...,
    "author": author->name,
    "categories": categories[]->title
  }`, { slug }, { cache: 'no-store' }) // Remove the next: { revalidate: 0 } option
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return <div className="text-center py-16">Blog post not found</div>;
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/resources/blogs" className="text-blue-600 hover:underline">
            ← Back to all blogs
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
          {blog.title}
        </h1>

        <div className="relative w-full h-80 mb-8">
          <Image 
            src={urlFor(blog.mainImage).url()}
            alt={blog.title} 
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <FaUser className="mr-2" />
          <span className="mr-4">{blog.author || 'Unknown Author'}</span>
          <FaCalendarAlt className="mr-2" />
          <span>{new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
        </div>

        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-8">
          <FaTags className="mr-2" />
          {blog.categories && blog.categories.map((category: string, index: number) => (
            <span key={index} className="mr-2 mb-2 bg-blue-100 text-blue-600 px-2 py-1 rounded">{category}</span>
          ))}
        </div>

        <div className="prose prose-lg max-w-none text-justify">
          {blog.body && <PortableText 
            value={blog.body} 
            components={{
              types: {
                image: ({value}) => {
                  if (!value?.asset?._ref) {
                    return null;
                  }
                  return (
                    <div className="relative w-full h-64 my-8">
                      <Image
                        src={urlFor(value).url()}
                        alt={value.alt || ' '}
                        fill
                        className="object-contain"
                      />
                    </div>
                  );
                },
              },
              marks: {
                link: ({value, children}) => {
                  const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
                  return (
                    <a href={value?.href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
                      {children}
                    </a>
                  )
                },
              },
              block: {
                // Handle block-level elements that might contain objects
                normal: ({children}) => <p>{children}</p>,
                h1: ({children}) => <h1>{children}</h1>,
                h2: ({children}) => <h2>{children}</h2>,
                h3: ({children}) => <h3>{children}</h3>,
                h4: ({children}) => <h4>{children}</h4>,
                blockquote: ({children}) => <blockquote>{children}</blockquote>,
                // Add more block types as needed
              },
            }}
          />}
        </div>
      </div>
    </div>
  );
}