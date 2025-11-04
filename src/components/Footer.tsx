"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { client } from '@/sanity/lib/client';

interface FooterData {
  companyName: string;
  description: string;
  socialLinks: { platform: string; url: string }[];
  navigationLinks: { title: string; url: string }[];
  copyrightText: string;
  contactEmail: string;
  contactPhone: string;
}

async function getFooterData(): Promise<FooterData> {
  const footerData = await client.fetch(`*[_type == "footer"][0]{
    companyName,
    description,
    socialLinks,
    navigationLinks,
    copyrightText,
    contactEmail,
    contactPhone
  }`);
  
  return footerData;
}

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    getFooterData().then(data => setFooterData(data));
  }, []);

  if (!footerData) {
    return null; // or a loading spinner
  }

  const socialIcons: { [key: string]: React.ElementType } = {
    facebook: FaFacebook,
    twitter: FaTwitter,
    instagram: FaInstagram,
    linkedin: FaLinkedin,
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold mb-4">{footerData.companyName}</h2>
            <p className="text-gray-300 mb-4">{footerData.description}</p>
            <div className="flex space-x-4">
              {footerData.socialLinks.map((link, index) => {
                const Icon = socialIcons[link.platform.toLowerCase()];
                return Icon ? (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </a>
                ) : null;
              })}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerData.navigationLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.url.startsWith('/') ? link.url : `/${link.url}`} className="text-gray-300 hover:text-white transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            {footerData.contactEmail && (
              <p className="text-gray-300 mb-2">Email: {footerData.contactEmail}</p>
            )}
            {footerData.contactPhone && (
              <p className="text-gray-300">Phone: {footerData.contactPhone}</p>
            )}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">{footerData.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
