import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/lib/sanity';
import * as FaIcons from 'react-icons/fa';

// async function getServicesData() {
//   const servicesPage = await client.fetch(`*[_type == "servicesPage"][0]{
//     title,
//     serviceCards[] {
//       title,
//       description,
//       "imageUrl": image.asset->url,
//       icon,
//       link
//     }
//   }`);
//   return servicesPage;
// }

async function getServicesData() {
  const servicesPage = await client.fetch(`*[_type == "servicesPage"][0]{
    title,
    serviceCards[] {
      title,
      description,
      "imageUrl": image.asset->url,
      icon,
      link
    }
  }`);

  // Define your manual extra service card(s)
  const extraServiceCards = [
    {
      title: "What is FIDAS",
      description: "Learn more about what is FIDAS",
      imageUrl: "/images/samples/what-is-fidas.jpg", // local or remote image
      icon: "FaUser",              // icon name from react-icons/fa
      link: "/services/what-is-fidas",
    },
  ];

  const ExtraServiceCards = [
    {
      title: "Sap Integration",
      description: "Learn more about Sap Integration",
      imageUrl: "/images/samples/sap-integration.jpg", // local or remote image
      icon: "FaProjectDiagram",              // icon name from react-icons/fa
      link: "/services/sap-integration",
    },
    {
      title: "Techonologies",
      description: "Learn more about Technologies",
      imageUrl: "/images/samples/technologies.jpg", // local or remote image
      icon: "FaNetworkWired",              // icon name from react-icons/fa
      link: "/services/technologies",
    },
  ]

  // Merge fetched serviceCards with extra ones
  const updatedServicesPage = {
    ...servicesPage,
    serviceCards: [...extraServiceCards, ...(servicesPage?.serviceCards || []),...ExtraServiceCards],
  };

  return updatedServicesPage;
}


export const revalidate = 60;

export default async function Services() {
  const servicesData = await getServicesData();
  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <h1 className="text-5xl font-bold mb-10 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
          {servicesData?.title || 'Our Services'}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData?.serviceCards?.map((card: {
            icon: string;
            link: string;
            imageUrl: string;
            title: string;
            description: string;
          }, index: number) => {
            const IconComponent = card.icon ? FaIcons[card.icon as keyof typeof FaIcons] : null;
            return (
              <Link key={index} href={card.link || '#'}>
                <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                  <div className="relative h-48">
                    {card.imageUrl && (
                      <Image 
                        src={card.imageUrl}
                        alt={card.title || ''}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <div className="p-6 flex flex-col items-center flex-grow">
                    {IconComponent && <IconComponent className="text-5xl mb-4 text-blue-600" />}
                    <h2 className="text-2xl font-semibold text-center">{card.title || 'Untitled'}</h2>
                    <p className="mt-2 text-gray-600 text-center">{card.description || ''}</p>
                    <FaIcons.FaArrowRight className="mt-4 text-blue-600" />
                  </div>
                </div>
              </Link>
            );
          }) || (
            <p>No services available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}
