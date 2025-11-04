import React from 'react';
import { client } from '@/lib/sanity';
import DefectStickeringSystemClient from './DefectStickeringSystemClient';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automatic Defect Stickering System – FIDAS Software",
  description:
    "The Automatic Defect Stickering System automates fabric defect labeling, improving accuracy, quality control, and productivity in textile manufacturing.",
  keywords: [
    "automatic defect stickering",
    "fabric inspection software",
    "textile quality control",
    "FIDAS software",
    "automated defect labeling",
  ],
  openGraph: {
    title: "Automatic Defect Stickering System – FIDAS Software",
    description:
      "Enhance textile quality control with Ventura Automation's Automatic Defect Stickering System for precise and automated defect labeling.",
    url: "https://fidas.in/products/hardware/defect-stickering-system",
    siteName: "FIDAS",
    images: [
      {
        url: "/og-software-defect-stickering.jpg",
        width: 1200,
        height: 630,
        alt: "Automatic Defect Stickering System",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automatic Defect Stickering System – FIDAS Software",
    description:
      "Automate fabric defect labeling and improve quality control with Ventura Automation's Automatic Defect Stickering System.",
    images: ["/og-software-defect-stickering.jpg"],
  },
};


async function getDefectStickeringSystemData() {
  const defectStickeringSystemPage = await client.fetch(`*[_type == "defectStickeringSystemPage"][0]{
    title,
    description,
    "mainImageUrl": mainImage.asset->url,
    keyFeatures,
    howItWorksSteps
  }`);
  
  return defectStickeringSystemPage;
}

export const revalidate = 60;

export default async function DefectStickeringSystem() {
  const defectStickeringSystemData = await getDefectStickeringSystemData();

  return (
    <div className="w-full bg-gray-50 text-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <DefectStickeringSystemClient pageData={defectStickeringSystemData} />
      </div>
    </div>
  );
}
