import React from 'react';
import { client } from '@/lib/sanity';
import { FabricLengthCounterClient } from './FabricLengthCounterClient';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fabric Length Measurement System – FIDAS Hardware",
  description:
    "Ventura Automation's Fabric Length Measurement System provides accurate, real-time fabric length measurements for optimal quality control and production efficiency in the textile industry.",
  keywords: [
    "fabric length measurement",
    "textile hardware",
    "fabric inspection device",
    "FIDAS hardware",
    "textile quality control",
  ],
  openGraph: {
    title: "Fabric Length Measurement System – FIDAS Hardware",
    description:
      "Ensure precise fabric length measurement and improve production efficiency with Ventura Automation's Fabric Length Measurement System.",
    url: "https://fidas.in/products/hardware/fabric-length-counter",
    siteName: "FIDAS",
    images: [
      {
        url: "/og-hardware-fabric-length.jpg",
        width: 1200,
        height: 630,
        alt: "Fabric Length Measurement System",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabric Length Measurement System – FIDAS Hardware",
    description:
      "Accurate, real-time fabric length measurement for textile quality control with Ventura Automation.",
    images: ["/og-hardware-fabric-length.jpg"],
  },
};


async function getFabricLengthCounterData() {
  const fabricLengthCounterPage = await client.fetch(`*[_type == "fabricLengthCounterPage"][0]{
    title,
    description,
    "mainImageUrl": mainImage.asset->url,
    keyFeatures,
    howItWorksSteps,
    benefitsCards
  }`);
  
  return fabricLengthCounterPage;
}

export const revalidate = 60;

export default async function FabricLengthCounter() {
  const fabricLengthCounterData = await getFabricLengthCounterData();

  return (
    <div className="w-full bg-gray-50 text-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <FabricLengthCounterClient fabricLengthCounterData={fabricLengthCounterData} />
      </div>
    </div>
  );
}
