import React from 'react';
import { client } from '@/lib/sanity';
import { ImplementationClient } from './ImplementationClient';

async function getImplementationData() {
  const implementationPage = await client.fetch(`*[_type == "implementationPage"][0]{
    "mainImage": mainImage.asset->url,
    steps
  }`);
  
  return implementationPage;
}

export const revalidate = 60;

export default async function Implementation() {
  const implementationData = await getImplementationData();

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-4">
        <ImplementationClient implementationData={implementationData} />
      </div>
    </div>
  );
}
