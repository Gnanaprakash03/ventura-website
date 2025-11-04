import React from 'react';
import { client } from '@/lib/sanity';
import { HardwareProductsClient } from './HardwareProductsClient';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hardware Products – FIDAS Textile Solutions",
  description:
    "Explore FIDAS hardware products for textile inspection, including devices for fabric grading, defect detection, and quality control.",
  keywords: [
    "FIDAS hardware",
    "fabric inspection devices",
    "textile grading machines",
    "quality control hardware",
    "textile automation",
  ],
  openGraph: {
    title: "FIDAS Hardware – Fabric Inspection & Quality Devices",
    description:
      "Discover FIDAS hardware solutions for efficient fabric inspection, grading, and textile quality management.",
    url: "https://fidas.in/products/hardware",
    siteName: "FIDAS",
    images: [
      {
        url: "/og-hardware.jpg",
        width: 1200,
        height: 630,
        alt: "FIDAS Hardware Products",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIDAS Hardware – Textile Inspection Devices",
    description:
      "Explore FIDAS hardware solutions for fabric inspection, grading, and quality control.",
    images: ["/og-hardware.jpg"],
  },
};




async function getHardwareProductsData() {
  const hardwareProductsPage = await client.fetch(`*[_type == "hardwareProductsPage"][0]{
    title,
    products[] {
      name,
      "imageUrl": image.asset->url,
      link
    }
  }`);
  
  return hardwareProductsPage;
}

export const revalidate = 60; // This is a valid non-negative number

export default async function HardwareProducts() {
  const hardwareProductsData = await getHardwareProductsData();

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto  lg:px-8 py-16">
        <HardwareProductsClient hardwareProductsData={hardwareProductsData} />
      </div>
    </div>
  );
}
