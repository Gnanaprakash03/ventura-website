import React from 'react';
import { client } from '@/lib/sanity';
import { HowItWorksClient } from './HowItWorksClient';
import HowFidasWorks from './howits';

async function getHowItWorksData() {
  const howItWorksPage = await client.fetch(`*[_type == "howItWorksPage"][0]{
    "mainImage": mainImage.asset->url,
    steps
  }`);
  
  return howItWorksPage;
}

export const revalidate = 60;

export default async function HowItWorks() {
  const howItWorksData = await getHowItWorksData();

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen mb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 pt-3">
        {/* <HowItWorksClient howItWorksData={howItWorksData} /> */}
        <HowFidasWorks />
        
      </div>
    </div>
  );
}
