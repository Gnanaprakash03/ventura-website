import React from 'react';
import { client } from '@/lib/sanity';
import HeatFuseLabellingMachineClient from './HeatFuseLabelingMachineClient';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fabric Heat Fuse Labeling Machine – FIDAS Software",
  description:
    "Ventura Automation's Fabric Heat Fuse Labeling Machine ensures efficient and precise label application with adjustable temperature and compact design for versatile use in textile production.",
  keywords: [
    "fabric labeling machine",
    "heat fuse labeling",
    "textile software",
    "FIDAS software",
    "precision labeling",
  ],
  openGraph: {
    title: "Fabric Heat Fuse Labeling Machine – FIDAS Software",
    description:
      "Achieve precise and efficient fabric labeling with Ventura Automation's Fabric Heat Fuse Labeling Machine, featuring adjustable temperature and versatile design.",
    url: "https://fidas.in/products/hardware/heat-fuse-labeling-machine",
    siteName: "FIDAS",
    images: [
      {
        url: "/og-software-heat-fuse.jpg",
        width: 1200,
        height: 630,
        alt: "Fabric Heat Fuse Labeling Machine",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabric Heat Fuse Labeling Machine – FIDAS Software",
    description:
      "Efficient and precise fabric labeling for textile production with Ventura Automation's Fabric Heat Fuse Labeling Machine.",
    images: ["/og-software-heat-fuse.jpg"],
  },
};


async function getHeatFuseLabellingMachineData() {
  const heatFuseLabellingMachinePage = await client.fetch(`*[_type == "heatFuseLabellingMachinePage"][0]{
    title,
    description,
    "mainImageUrl": mainImage.asset->url,
    keyFeatures,
    howItWorksSteps
  }`);
  
  return heatFuseLabellingMachinePage;
}

export const revalidate = 60;

export default async function HeatFuseLabellingMachine() {
  const heatFuseLabellingMachineData = await getHeatFuseLabellingMachineData();

  return (
    <div className="w-full bg-gray-50 text-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <HeatFuseLabellingMachineClient pageData={heatFuseLabellingMachineData} />
      </div>
    </div>
  );
}