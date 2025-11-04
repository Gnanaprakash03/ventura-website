import React from 'react';
import { client } from '@/lib/sanity';
import { SAPIntegrationClient } from './SAPIntegrationClient';

async function getSAPIntegrationData() {
  const sapIntegrationPage = await client.fetch(`*[_type == "sapIntegrationPage"][0]{
    introText,
    reasonsTitle,
    reasons,
    integrationOptions,
    futureIntegration
  }`);
  
  return sapIntegrationPage;
}

export const revalidate = 60;

export default async function SAPIntegration() {
  const sapIntegrationData = await getSAPIntegrationData();

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <SAPIntegrationClient sapIntegrationData={sapIntegrationData} />
      </div>
    </div>
  );
}
