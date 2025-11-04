import React from 'react';
import { client } from '@/lib/sanity';
import DigitalPickCounterClient from './DigitalPickCounterClient';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Pick Counter – FIDAS Hardware",
  description:
    "Ventura Automation's Digital Pick Counter automates fabric thread density measurement, providing accurate, real-time data for optimal textile quality control and production efficiency.",
  keywords: [
    "digital pick counter",
    "thread density measurement",
    "textile hardware",
    "FIDAS hardware",
    "fabric quality control",
  ],
  openGraph: {
    title: "Digital Pick Counter – FIDAS Hardware",
    description:
      "Automate thread density measurement and ensure precise fabric quality control with Ventura Automation's Digital Pick Counter.",
    url: "https://fidas.in/products/hardware/digital-pick-counter",
    siteName: "FIDAS",
    images: [
      {
        url: "/og-hardware-digital-pick.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Pick Counter",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Pick Counter – FIDAS Hardware",
    description:
      "Accurate, real-time thread density measurement for textile quality control with Ventura Automation's Digital Pick Counter.",
    images: ["/og-hardware-digital-pick.jpg"],
  },
};


async function getDigitalPickCounterData() {
  const digitalPickCounterPage = await client.fetch(`*[_type == "digitalPickCounterPage"][0]{
    title,
    description,
    "mainImageUrl": mainImage.asset->url,
    keyFeatures,
    howItWorksSteps
  }`);
  
  return digitalPickCounterPage;
}

export const revalidate = 60;

export default async function DigitalPickCounter() {
  const digitalPickCounterData = await getDigitalPickCounterData();

  return (
    <div className="w-full bg-gray-50 text-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <DigitalPickCounterClient pageData={digitalPickCounterData} />
      </div>
    </div>
  );
}
