import React from 'react';
import { client } from '@/lib/sanity';
import { FidasClient } from './FidasClient';

async function getFidasData() {
  const fidasPage = await client.fetch(`*[_type == "fidasPage"][0]{
    subtitle,
    description,
    "imageUrl": imageUrl.asset->url,
    features,
    benefits
  }`);
  
  return fidasPage;
}

export const revalidate = 60;

export default async function WhatIsFIDAS() {
  const fidasData = await getFidasData();

  return (
    <div className="w-full bg-gray-50 text-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-6">
        <FidasClient fidasData={fidasData} />
      </div>
    </div>
  );
}
