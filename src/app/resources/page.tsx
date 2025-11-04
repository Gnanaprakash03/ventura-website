import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/lib/sanity';
import * as FaIcons from 'react-icons/fa';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources – FIDAS Textile Insights",
  description:
    "Access FIDAS resources including guides, case studies, whitepapers, and industry insights to optimize fabric inspection, grading, and quality management.",
  keywords: [
    "FIDAS resources",
    "textile guides",
    "fabric inspection insights",
    "textile whitepapers",
    "quality management resources",
  ],
  openGraph: {
    title: "FIDAS Resources – Fabric Industry Insights & Guides",
    description:
      "Explore FIDAS guides, case studies, and whitepapers to enhance fabric inspection, grading, and textile quality management.",
    url: "https://fidas.in/resources",
    siteName: "FIDAS",
    images: [
      {
        url: "/og-resources.jpg",
        width: 1200,
        height: 630,
        alt: "FIDAS Resources Overview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIDAS Resources – Textile Industry Insights & Guides",
    description:
      "Access FIDAS resources to optimize fabric inspection, grading, and quality management in textiles.",
    images: ["/og-resources.jpg"],
  },
};


async function getResourcesData() {
  const resourcesPage = await client.fetch(`*[_type == "resourcesPage"][0]{
    title,
    resourceCards[] {
      title,
      description,
      "imageUrl": image.asset->url,
      icon,
      link
    }
  }`);
  
  return resourcesPage;
}

export const revalidate = 60;

export default async function Resources() {
  const resourcesData = await getResourcesData();

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold mb-16 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
          {resourcesData?.title || 'Resources'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resourcesData?.resourceCards?.map((card: {
            icon: string;
            link: string;
            imageUrl: string;
            title: string;
            description: string;
          }, index: number) => {
            const IconComponent = card.icon ? FaIcons[card.icon as keyof typeof FaIcons] : null;
            return (
              <Link key={index} href={card.link || '#'}>
                <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                  <div className="relative h-48">
                    {card.imageUrl && (
                      <Image 
                        src={card.imageUrl}
                        alt={card.title || ''}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <div className="p-6 flex flex-col items-center flex-grow">
                    {IconComponent && <IconComponent className="text-5xl mb-4 text-blue-600" />}
                    <h2 className="text-2xl font-semibold text-center">{card.title || 'Untitled'}</h2>
                    <p className="mt-2 text-gray-600 text-center">{card.description || ''}</p>
                    <FaIcons.FaArrowRight className="mt-4 text-blue-600" />
                  </div>
                </div>
              </Link>
            );
          }) || (
            <p>No resources available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}
