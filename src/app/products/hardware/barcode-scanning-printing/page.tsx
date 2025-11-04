import React from 'react';
import { client } from '@/lib/sanity';
import { BarcodeScanningPrintingClient } from './BarcodeScanningPrintingClient';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barcode Scanning & Printing System – FIDAS Software",
  description:
    "Ventura Automation's Barcode Scanning & Printing System enhances traceability, streamlines inventory management, and improves operational efficiency in textile manufacturing.",
  keywords: [
    "barcode scanning and printing",
    "textile software",
    "inventory management system",
    "FIDAS software",
    "textile traceability",
  ],
  openGraph: {
    title: "Barcode Scanning & Printing System – FIDAS Software",
    description:
      "Improve traceability and operational efficiency in textile production with Ventura Automation's Barcode Scanning & Printing System.",
    url: "https://fidas.in/products/hardware/barcode-scanning-printing",
    siteName: "FIDAS",
    images: [
      {
        url: "/og-software-barcode.jpg",
        width: 1200,
        height: 630,
        alt: "Barcode Scanning & Printing System",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Barcode Scanning & Printing System – FIDAS Software",
    description:
      "Streamline textile inventory and improve traceability with Ventura Automation's Barcode Scanning & Printing System.",
    images: ["/og-software-barcode.jpg"],
  },
};


async function getBarcodeScanningPrintingData() {
  const barcodeScanningPrintingPage = await client.fetch(`*[_type == "barcodeScanningPrintingPage"][0]{
    title,
    description,
    "mainImageUrl": mainImage.asset->url,
    keyFeatures,
    howItWorksSteps
  }`);
  
  return barcodeScanningPrintingPage;
}

export const revalidate = 60;

export default async function BarcodeScanningPrinting() {
  const barcodeScanningPrintingData = await getBarcodeScanningPrintingData();

  return (
    <div className="w-full bg-gray-50 text-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <BarcodeScanningPrintingClient barcodeScanningPrintingData={barcodeScanningPrintingData} />
      </div>
    </div>
  );
}