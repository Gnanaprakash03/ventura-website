"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';
import * as FaIcons from 'react-icons/fa';

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

const floatingIcon: Variants = {
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

interface SocialPlatform {
  icon: string;
  name: string;
  handle: string;
  link: string;
}

interface SocialMediaData {
  title: string;
  socialPlatforms: SocialPlatform[];
}

export function SocialMediaClient({ socialMediaData }: { socialMediaData: SocialMediaData }) {
  if (!socialMediaData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
        <motion.h1 
          className="text-5xl font-bold mb-8 py-4 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
          // variants={fadeInUp}
        >
          {socialMediaData.title}
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2  gap-8"
        >
          {socialMediaData.socialPlatforms.map((platform, index) => {
            const IconComponent = FaIcons[platform.icon as keyof typeof FaIcons];
            return (
              <motion.div
                key={index}
                // variants={fadeInUp}
                className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <motion.div variants={floatingIcon} animate="animate" className="text-4xl text-blue-600 mb-4">
                  {IconComponent && <IconComponent />}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{platform.name}</h3>
                <p className="text-gray-600 mb-4">{platform.handle}</p>
                <a href={platform.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Follow Us</a>
              </motion.div>
            );
          })}
        </motion.div>
    </div>
  );
}