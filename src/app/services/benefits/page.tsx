import React from 'react';
import { client } from '@/lib/sanity';
import { BenefitsClient } from './BenefitsClient';

async function getBenefits() {
  const benefits = await client.fetch(`*[_type == "benefit"] {
    _id,
    icon,
    title,
    description
  }`, {}, { next: { revalidate: 60 } });
  
  return benefits;
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Benefits() {
  const benefits = await getBenefits();

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
        <h1 className="text-5xl font-bold mb-12 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
          Benefits of FIDAS
        </h1>
        <BenefitsClient benefits={benefits} />
      </div>
    </div>
  );
}
