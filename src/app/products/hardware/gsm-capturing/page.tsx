import React from 'react';
import { client } from '@/lib/sanity';
import GsmCapturingClient from './GsmCapturingClient';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automatic Fabric GSM Capturing System – FIDAS Hardware",
  description:
    "Ventura Automation's Automatic Fabric GSM Capturing System provides accurate, real-time fabric weight measurements for quality control and production optimization in the textile industry.",
  keywords: [
    "fabric GSM capturing system",
    "automatic fabric weight measurement",
    "textile hardware",
    "FIDAS hardware",
    "fabric quality control",
  ],
  openGraph: {
    title: "Automatic Fabric GSM Capturing System – FIDAS Hardware",
    description:
      "Ensure precise fabric weight measurement and optimize textile production with Ventura Automation's Automatic Fabric GSM Capturing System.",
    url: "https://fidas.in/products/hardware/gsm-capturing",
    siteName: "FIDAS",
    images: [
      {
        url: "/og-hardware-fabric-gsm.jpg",
        width: 1200,
        height: 630,
        alt: "Automatic Fabric GSM Capturing System",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automatic Fabric GSM Capturing System – FIDAS Hardware",
    description:
      "Real-time fabric weight measurement for textile quality control with Ventura Automation's Automatic Fabric GSM Capturing System.",
    images: ["/og-hardware-fabric-gsm.jpg"],
  },
};


async function getGSMCapturingData() {
  const gsmCapturingPage = await client.fetch(`*[_type == "gsmCapturingPage"][0]{
    title,
    description,
    "mainImageUrl": mainImage.asset->url,
    keyFeatures,
    howItWorksSteps
  }`);
  
  return gsmCapturingPage;
}

export const revalidate = 60;

export default async function GSMCapturing() {
  const gsmCapturingData = await getGSMCapturingData();

  return (
    <div className="w-full bg-gray-50 text-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <GsmCapturingClient pageData={gsmCapturingData} />
      </div>
    </div>
  );
}
