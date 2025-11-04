"use client";

import React, { useEffect, useState } from 'react';
import { motion, Variants, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import * as FaIcons from 'react-icons/fa';

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

const staggerChildren: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface ImplementationData {
  mainImage: string;
  steps: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export function ImplementationClient({ implementationData }: { implementationData: ImplementationData }) {
  const [data, setData] = useState<ImplementationData | null>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    setData(implementationData);
  }, [implementationData]);

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);
  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
      <img 
        src="/images/loading.gif" 
        alt="Loading..." 
        className="w-500 h-300"
      />
    </div>
    ) 
  }


  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="relative mb-8 overflow-hidden">
        <motion.h1 
          className="text-5xl font-bold  py-3 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Implementation Methodology
        </motion.h1>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
          animate={{
            x: ['-200%', '200%'],
            transition: { repeat: Infinity, duration: 10, ease: "linear" },
          }}
        />
      </div>

      {/* Main Image */}
      <motion.div 
        initial="initial"
        animate="animate"
        variants={fadeInUp} 
        className="mb-12 flex justify-center"
      >
        <div className="relative w-full max-w-3xl aspect-w-16 aspect-h-9">
          <Image
            src={data.mainImage}
            alt="FIDAS Implementation"
            width={800}
            height={450}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
      </motion.div>

      {/* Implementation Steps */}
      <motion.div
        ref={ref}
        initial="initial"
        animate={controls}
        variants={staggerChildren}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {data.steps.map((step, index) => {
          const IconComponent = FaIcons[step.icon as keyof typeof FaIcons];
          return (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl text-blue-600 mb-4">
                {IconComponent && <IconComponent />}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
