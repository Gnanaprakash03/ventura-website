import React from 'react';
import { client } from '@/lib/sanity';
import { CompanyClient } from './CompanyClient';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company – FIDAS",
  description: "Discover FIDAS company profile, our team, history, and commitment to fabric quality and automation.",
  openGraph: {
    title: "Company – FIDAS",
    description: "Learn about the team, history, and company values behind FIDAS.",
    url: "https://fidas.in/about/company",
    siteName: "FIDAS",
    images: [{ url: "/og-about-company.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

async function getCompanyData() {
  const companyPage = await client.fetch(`*[_type == "companyPage"][0]{
    introduction,
    "teamImage": teamImage.asset->url,
    companyValues,
    achievements,
    sapIntegration,
    futureIntegration,
    contactUs
  }`);
  
  return companyPage;
}

export const revalidate = 60;

export default async function AboutUs() {
  const companyData = await getCompanyData();

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-4">
        <CompanyClient companyData={companyData} />
      </div>
    </div>
  );
}

