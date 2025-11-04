import React from 'react';
import { client } from '@/lib/sanity';
import { ContactUsClient } from './us/ContactUsClient';
import type { Metadata } from 'next';

export const metadata : Metadata = {
   title: "Contact Us | FIDAS Fabric Inspection Software",
    description: "Get in touch with the FIDAS team for inquiries, support, or demo requests for our fabric inspection and quality software.",
    
    // Open Graph for social media previews
    openGraph: {
      title: "Contact Us | FIDAS Fabric Inspection Software",
      description: "Reach out to FIDAS for inquiries, support, or to schedule a demo of our fabric inspection software.",
      url: "https://fidas.in/contact",
      siteName: "FIDAS",
      images: [
        { url: "/og-image.jpg", width: 1200, height: 630 }
      ],
      type: "website",
    },
  
    // Twitter card
    twitter: {
      card: "summary_large_image",
      title: "Contact Us | FIDAS Fabric Inspection Software",
      description: "Reach out to FIDAS for inquiries, support, or to schedule a demo of our fabric inspection software.",
      images: ["/og-image.jpg"],
    },
}

async function getContactUsData() {
  const contactUsPage = await client.fetch(`*[_type == "contactUsPage"][0]{
    address,
    phone,
    email
    // remove mapUrl from query
  }`);
  
  return contactUsPage;
}

export const revalidate = 60;

export default async function ContactUs() {
  const contactUsData = await getContactUsData();

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 ">
        <ContactUsClient contactUsData={contactUsData} />
      </div>
    </div>
  );
}
