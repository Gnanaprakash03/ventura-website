import React from 'react';
import { client } from '@/lib/sanity';
import TouchscreenMonitorClient from './TouchScreenMonitorClient';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Touch Screen Monitor with Industrial PC – FIDAS Software",
  description:
    "Ventura Automation's Touch Screen Monitor with Industrial PC enables seamless fabric defect entry, providing a robust and efficient solution for textile quality control processes.",
  keywords: [
    "touch screen monitor",
    "industrial PC",
    "fabric defect entry",
    "textile quality control",
    "FIDAS software",
  ],
  openGraph: {
    title: "Touch Screen Monitor with Industrial PC – FIDAS Software",
    description:
      "Ensure efficient fabric defect entry and quality control with Ventura Automation's Touch Screen Monitor with Industrial PC.",
    url: "https://fidas.in/products/hardware/touchscreen-monitor",
    siteName: "FIDAS",
    images: [
      {
        url: "/og-software-touchscreen.jpg",
        width: 1200,
        height: 630,
        alt: "Touch Screen Monitor with Industrial PC",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Touch Screen Monitor with Industrial PC – FIDAS Software",
    description:
      "Seamless fabric defect entry and efficient quality control with Ventura Automation's Touch Screen Monitor with Industrial PC.",
    images: ["/og-software-touchscreen.jpg"],
  },
};


async function getTouchscreenMonitorData() {
  const touchscreenMonitorPage = await client.fetch(`*[_type == "touchscreenMonitorPage"][0]{
    title,
    description,
    "mainImageUrl": mainImage.asset->url,
    keyFeatures,
    howItWorksSteps
  }`);
  
  return touchscreenMonitorPage;
}

export const revalidate = 60;

export default async function TouchscreenMonitor() {
  const touchscreenMonitorData = await getTouchscreenMonitorData();

  return (
    <div className="w-full bg-gray-50 text-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <TouchscreenMonitorClient pageData={touchscreenMonitorData} />
      </div>
    </div>
  );
}
