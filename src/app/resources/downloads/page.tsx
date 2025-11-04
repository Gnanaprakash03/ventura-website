import React from 'react';
import { client } from '@/lib/sanity';
import { DownloadsClient } from './DownloadsClient';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downloads – FIDAS Resources",
  description:
    "Access FIDAS downloadable resources including brochures, datasheets, manuals, and guides to help optimize fabric inspection, grading, and quality management.",
  keywords: [
    "FIDAS downloads",
    "textile brochures",
    "fabric inspection datasheets",
    "manuals and guides",
    "textile quality resources",
  ],
  openGraph: {
    title: "FIDAS Downloads – Textile Resources & Guides",
    description:
      "Download brochures, datasheets, and guides from FIDAS to enhance fabric inspection, grading, and textile quality management.",
    url: "https://fidas.in/resources/downloads",
    siteName: "FIDAS",
    images: [
      {
        url: "/og-resources-downloads.jpg",
        width: 1200,
        height: 630,
        alt: "FIDAS Downloads",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIDAS Downloads – Textile Resources & Guides",
    description:
      "Access FIDAS downloadable brochures, datasheets, manuals, and guides for textile quality management and fabric inspection.",
    images: ["/og-resources-downloads.jpg"],
  },
};


async function getDownloadsData() {
  const downloadsPage = await client.fetch(`*[_type == "downloadsPage"][0]{
    title,
    downloads[]{
      name,
      "fileUrl": file.asset->url,
      "fileType": file.asset->mimeType
    }
  }`, {}, { next: { revalidate: 60 } });
  
  return downloadsPage;
}

export default async function Downloads() {
  const downloadsData = await getDownloadsData();

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <DownloadsClient downloadsData={downloadsData} />
      </div>
    </div>
  );
}
