'use client';

import React, { useEffect } from 'react';
import { motion, Variants, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('animate');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={controls}
      variants={fadeInUp}
    >
      {children}
    </motion.div>
  );
};

interface CustomerSuccessStory {
  _id: string;
  name: string;
  position: string;
  company: string;
  quote: string;
  image: any;
}

export default function CustomerSuccessContent({ stories }: { stories: CustomerSuccessStory[] }) {
  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="relative mb-12 overflow-hidden">
          <AnimatedSection>
            <h1 
              className="text-5xl font-bold mb-8 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
            >
              What Our Customers Say About FIDAS
            </h1>
          </AnimatedSection>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
            animate={{
              x: ['-200%', '200%'],
              transition: { repeat: Infinity, duration: 10, ease: "linear" },
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <AnimatedSection key={story._id}>
              <div
                className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="relative flex-grow">
                  <FaQuoteLeft className="absolute top-0 left-0 text-blue-200 text-lg opacity-50" />
                  <p className="text-gray-600 pl-6 pr-6 pt-2 pb-2 relative">
                    {story.quote}
                  </p>
                  <FaQuoteRight className="absolute bottom-0 right-0 text-blue-200 text-lg opacity-50" />
                </div>
                <div className="mt-4 flex items-center">
                  {story.image && (
                    <div className="mr-4">
                      <Image
                        src={urlFor(story.image).url()}
                        alt={story.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-blue-600">{story.name}</h3>
                    <p className="text-gray-500">{story.position}</p>
                    <p className="text-gray-500">{story.company}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
