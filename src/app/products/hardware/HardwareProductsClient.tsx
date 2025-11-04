"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

interface HardwareProduct {
  name: string;
  imageUrl: string;
  link: string;
}

interface HardwareProductsData {
  title: string;
  products: HardwareProduct[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const productLinks = [
  '/products/hardware/fabric-length-counter',
  '/products/hardware/width-measurement-system',
  '/products/hardware/digital-pick-counter',
  '/products/hardware/gsm-capturing',
  '/products/hardware/barcode-scanning-printing',
  '/products/hardware/defect-stickering-system',
  '/products/hardware/touchscreen-monitor',
  '/products/hardware/heat-fuse-labeling-machine',
];

export function HardwareProductsClient({ hardwareProductsData }: { hardwareProductsData: HardwareProductsData }) {
  if (!hardwareProductsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-16">
      <ScrollAnimationWrapper>
        <motion.h1 
          className="text-5xl font-bold mb-12 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {hardwareProductsData.title}
        </motion.h1>
      </ScrollAnimationWrapper>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {hardwareProductsData.products.map((product, index) => (
          <motion.div key={index} variants={fadeInUp} className="h-full">
            <Link href={productLinks[index] || '#'} className="block h-full">
              <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group h-full flex flex-col justify-between">
                <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{product.name}</h2>
                <div className="flex items-center text-blue-500">
                  <span className="mr-2">Learn More</span>
                  <FaArrowRight />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
