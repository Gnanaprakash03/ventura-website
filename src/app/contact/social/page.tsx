'use client'

import React from 'react';
import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';
import { SocialMediaClient } from './SocialMediaClient';
import Image from 'next/image';

export default function SocialMedia() {
  const [socialMediaData, setSocialMediaData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(`*[_type == "socialMediaPage"][0]{ title, socialPlatforms }`);
      const whatsapp = {
        _key: 'whatsapp123',
        name: 'WhatsApp',
        icon: 'FaWhatsapp',
        handle: '+91 9962936356',
        link: 'https://wa.me/919876543210'
      };
      setSocialMediaData({ ...data, socialPlatforms: [whatsapp, ...data.socialPlatforms] });
    }
    fetchData();
  }, []);

  if (!socialMediaData) return( <div className="flex items-center justify-center h-screen bg-white">
    <Image
            src="/images/loading.gif"
            alt="Loading..."
            width={100}
            height={100}
            style={{ height: "auto" }}
            className="object-contain"
          />
  </div>);

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <SocialMediaClient socialMediaData={socialMediaData} />
      </div>
    </div>
  );
}