import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/lib/sanity';
import * as FaIcons from 'react-icons/fa';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FIDAS Products ",
  description:
    "Explore FIDAS products for textile inspection, including hardware and software solutions designed to improve fabric quality, grading, and automation.",
  keywords: [
    "FIDAS products",
    "fabric inspection hardware",
    "textile software solutions",
    "fabric grading devices",
    "textile automation",
  ],
  openGraph: {
    title: "FIDAS Products – Hardware & Software for Textile Automation",
    description:
      "Discover FIDAS hardware and software products for fabric inspection, grading, quality control, and automation in the textile industry.",
    url: "https://fidas.in/products",
    siteName: "FIDAS",
    images: [
      {
        url: "/og-products.jpg",
        width: 1200,
        height: 630,
        alt: "FIDAS Products Overview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIDAS Products – Textile Inspection & Automation",
    description:
      "Explore FIDAS hardware and software solutions for fabric grading, quality control, and textile automation.",
    images: ["/og-products.jpg"],
  },
};


async function getProductsData() {
  // const productsPage = await client.fetch(`*[_type == "productsPage"][0]{
  //   title,
  //   productCards[] {
  //     title,
  //     description,
  //     "imageUrl": image.asset->url,
  //     icon,
  //     link
  //   }
  // }`);

  const productsPage = {
    title: "Our Products",
  productCards: [
    {
      title: "Software",
      description: "Explore our software offerings",
      imageUrl: "/images/products/software.webp",
      icon: "FaLaptopCode",
      link: "/products/software",
    },
    {
      title: "Hardware",
      description: "Explore our software offerings",
      imageUrl: "/images/products/hardware.png",
      icon: "FaMicrochip",
      link: "/products/hardware",
    },
  ]
  }
  
  return productsPage;
}

export const revalidate = 60;

export default async function Products() {
  const productsData = await getProductsData();

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <h1 className="text-5xl font-bold mb-16 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
          {productsData?.title || 'Our Products'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
          {productsData?.productCards?.map((card: {
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
                  <div className="relative h-80">
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
            <p>No products available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}
