import React from 'react';
import { client } from '@/lib/sanity';
import { CompanyInfoClient } from './CompanyInfoClient';
import type { Metadata } from "next";

export const metadata : Metadata = {
   title: "Info – FIDAS",
  description: "FIDAS mission, vision, and policies on fabric inspection and textile automation.",
  openGraph: {
    title: "Info – FIDAS",
    description: "Explore the mission, vision, and certifications of FIDAS.",
    url: "https://fidas.in/about/info",
    siteName: "FIDAS",
    images: [{ url: "/og-about-info.jpg", width: 1200, height: 630 }],
    type: "website",
  },
}

async function getCompanyInfo() {
  const companyInfo = await client.fetch(`*[_type == "companyInfo"][0]`);
  const history = await client.fetch(`*[_type == "historyEvent"] | order(year asc)`);
  
  return { companyInfo, history };
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function CompanyInfo() {
  const { companyInfo, history } = await getCompanyInfo();

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <h1 className="text-5xl font-bold mb-16 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
          About Ventura Automation
        </h1>
        <CompanyInfoClient companyInfo={companyInfo} history={history} />
      </div>
    </div>
  );
}
