"use client";

import { useState } from "react";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

const letterAnimation: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

export function FidasClient({ fidasData }: { fidasData: any }) {
  const [isEnded, setIsEnded] = useState(false);

  
  if (!fidasData) {
    return <div>Loading...</div>;
  }

  const heroContent = {
    title: "FIDAS",
    subtitle: fidasData.subtitle || '',
    description: fidasData.description || '',
    imageUrl: fidasData.imageUrl || '',
  };

  const features: Array<{ title: string; description: string }> = fidasData.features || [];

  const benefits: string[] = fidasData.benefits || [];

  return (
    <div className="w-full bg-gray-50 text-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
        <div className="relative mb-5 overflow-hidden">
          <ScrollAnimationWrapper>
            <motion.h1 
              className="text-6xl font-bold py-1 mb-1 text-center tracking-tight"
              initial="initial"
              animate="animate"
              transition={{ staggerChildren: 0.1 }}
            >
              {heroContent.title.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterAnimation}
                  transition={{ duration: 0.5 }}
                  className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
          </ScrollAnimationWrapper>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
            animate={{
              x: ['-200%', '200%'],
              transition: { repeat: 0 , duration: 10, ease: "linear" },
            }}
          />
        </div>

        <ScrollAnimationWrapper>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-center mb-6 text-gray-600"
          >
            {heroContent.subtitle}
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-center mb-5 text-gray-600"
          >
            {heroContent.description}
          </motion.p>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper>
          <motion.div
            variants={fadeInUp}
            className="mb-8"
          >
            <Image
                src={isEnded ? "/images/samples/final-about-fidas.png" : "/images/samples/about-fidas.gif"} // your file names
                alt="What is FIDAS Animated gif"
                width={800}
                height={450}
                className="w-full" 
                onClick={() => setIsEnded(true)}
              />
            {/* <img src='/images/samples/about-fidas.gif'
              alt="What is FIDAS"
                width={800}
                height={450}
                className="w-full" /> */}
            {/* {heroContent.imageUrl && (
              <Image
                // src={heroContent.imageUrl}
                alt="What is FIDAS"
                width={800}
                height={450}
                className="w-full"
              />
            )} */}
          </motion.div>
        </ScrollAnimationWrapper>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
        >
          Features
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl text-blue-600 mb-4">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        <ScrollAnimationWrapper>
          <motion.h2
            variants={fadeInUp}
            className="text-5xl font-bold mt-8 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
          >
            Benefits
          </motion.h2>
          {/* <motion.div
            variants={fadeInUp}
            className="flex  flex-wrap justify-center"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} className="flex items-center m-4 w-full sm:w-1/2 md:w-1/3 lg:w-8xl">
                <div className="flex-shrink-0 mr-3">
                  <FaCheck className="text-blue-500 text-xl" />
                </div>
                <p className="text-base text-gray-700">{benefit}</p>
              </motion.div>
            ))}
          </motion.div> */}

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center -m-4"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center p-4 w-full sm:w-1/2 md:w-1/4"
              >
                <div className="flex-shrink-0 mr-3">
                  <FaCheck className="text-blue-500 text-xl" />
                </div>
                <p className="text-base text-gray-700">{benefit}</p>
              </motion.div>
            ))}
          </motion.div>

        

        </ScrollAnimationWrapper>
      </div>
    </div>
  );
}
