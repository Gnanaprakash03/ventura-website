import React from 'react';
import { client } from '@/lib/sanity';
import WidthMeasurementSystemClient from './WidthMeasurementSystemClient';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automatic Width Measurement System – FIDAS Hardware",
  description:
    "Ventura Automation's Automatic Width Measurement System provides real-time, precise fabric width measurement. Integrate seamlessly into inspection machines and production lines for instant alerts and quality control.",
  keywords: [
    "automatic width measurement",
    "fabric width sensor",
    "textile hardware",
    "FIDAS hardware",
    "textile quality control",
  ],
  openGraph: {
    title: "Automatic Width Measurement System – FIDAS Hardware",
    description:
      "Ensure precise fabric width measurement and instant deviation alerts with Ventura Automation's real-time Width Measurement System.",
    url: "https://fidas.in/products/hardware/width-measurement-system ",
    siteName: "FIDAS",
    images: [
      {
        url: "/og-hardware-width-measurement.jpg",
        width: 1200,
        height: 630,
        alt: "Automatic Width Measurement System",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automatic Width Measurement System – FIDAS Hardware",
    description:
      "Real-time fabric width measurement with instant alerts for textile quality control using Ventura Automation.",
    images: ["/og-hardware-width-measurement.jpg"],
  },
};


async function getWidthMeasurementSystemData() {
  const widthMeasurementSystemPage = await client.fetch(`*[_type == "widthMeasurementSystemPage"][0]{
    title,
    description,
    "mainImageUrl": mainImage.asset->url,
    keyFeatures,
    howItWorksSteps
  }`);
  
  return widthMeasurementSystemPage;
}

export const revalidate = 60;

export default async function WidthMeasurementSystem() {
  const widthMeasurementSystemData = await getWidthMeasurementSystemData();

  return (
    <div className="w-full bg-gray-50 text-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto  py-16">
        <WidthMeasurementSystemClient pageData={widthMeasurementSystemData} />
      </div>
    </div>
  );
}
