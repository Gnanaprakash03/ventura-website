import React from 'react';
import { client } from '@/lib/sanity';
import HowFidasWorks from './howits';

interface Section {
  title: string;
  text: string;
  imgurl: string;
}

async function getData(): Promise<{ title: string; sections: Section[] }> {
  const query = `
    *[_type == "howFIDASWorks"][0]{
      title,
      sections[]{
        title,
        text,
        "imgurl": img.asset->url
      }
    }
  `;
  return await client.fetch(query);
}



export const revalidate = 60;

export default async function HowItWorks() {
  const data = await getData(); // ✅ runs on server

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen mb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 pt-3">
        <HowFidasWorks data={data.sections}/>
      </div>
    </div>
  );
}
