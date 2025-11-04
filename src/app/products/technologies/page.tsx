import React from 'react';
import { client } from '@/lib/sanity';
import { TechnologiesClient } from './TechnologiesClient';

async function getTechnologies() {
  const technologies = await client.fetch(`*[_type == "technology"] {
    _id,
    name,
    description,
    features,
    icon
  }`, {}, { next: { revalidate: 60 } });
  
  return technologies;
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Technologies() {
  const technologies = await getTechnologies();

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold mb-16 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
          Our Technologies
        </h1>
        <TechnologiesClient technologies={technologies} />
      </div>
    </div>
  );
}
