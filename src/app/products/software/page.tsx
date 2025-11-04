import React, { Suspense } from 'react';
import { client } from '@/lib/sanity';
import { SoftwareProductsClient } from './SoftwareProductsClient';
import type { SoftwareProduct } from './SoftwareProductsClient'; // Import the type
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Products – FIDAS Fabric Solutions",
  description:
    "Explore FIDAS software products for fabric inspection, grading, defect tracking, quality reporting, and automation in the textile industry.",
  keywords: [
    "FIDAS software",
    "fabric inspection software",
    "textile automation software",
    "quality reporting system",
    "fabric grading software",
    "defect tracking software",
  ],
  openGraph: {
    title: "FIDAS Software Products – Textile Inspection & Automation",
    description:
      "Discover FIDAS software solutions for fabric inspection, defect analysis, grading, and quality management in textiles.",
    url: "https://fidas.in/products/software",
    siteName: "FIDAS",
    images: [
      {
        url: "/og-software-products.jpg",
        width: 1200,
        height: 630,
        alt: "FIDAS Software Products Overview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIDAS Software Products – Textile Inspection & Automation",
    description:
      "Explore FIDAS software solutions for fabric inspection, grading, defect tracking, and textile automation.",
    images: ["/og-software-products.jpg"],
  },
};


async function getSoftwareProducts() {
  // First, let's get all products and see their names
  const allProducts = await client.fetch(`*[_type == "softwareProduct"] {
    name
  }`);
  console.log('All product names:', allProducts);

  const products = await client.fetch(`*[_type == "softwareProduct"] {
    _id,
    name,
    description,
    features,
    "imageUrl": image.asset->url,
    "rawSlug": lower(name),
    "slug": select(
      // Match patterns in name
      lower(name) match "*knitted*" => "knitted-fabric-inspection",
      lower(name) match "*greige*" => "greige-fabric-inspection",
      lower(name) match "*denim*" => "denim-fabric-inspection",
      lower(name) match "*automotive*" => "automotive-fabric-inspection",
      lower(name) match "*home furnishing*" => "home-furnishing-inspection",
      (lower(name) match "*garment*" || lower(name) match "*readymade*") => "garment-units-inspection",
      lower(name)
    )
  }`) as SoftwareProduct[];

  console.log('Products with slugs:', products);

  // Sort products to ensure consistent order
  const sortOrder = [
    "knitted-fabric-inspection",
    "greige-fabric-inspection",
    "denim-fabric-inspection",
    "automotive-fabric-inspection",
    "home-furnishing-inspection",
    "garment-units-inspection"
  ];

  const sortedProducts = [...products].sort((a, b) => {
    const aIndex = sortOrder.indexOf(a.slug);
    const bIndex = sortOrder.indexOf(b.slug);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  console.log('Final sorted products:', sortedProducts);
  return sortedProducts;
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function SoftwareProducts() {
  const products = await getSoftwareProducts();

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold mb-16 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
          Associated Software Products
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <SoftwareProductsClient products={products} />
        </Suspense>
      </div>
    </div>
  );
}