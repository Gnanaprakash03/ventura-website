"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';
import { PortableText } from '@portabletext/react';
import * as FaIcons from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

interface SAPIntegrationData {
  introText: string;
  reasonsTitle: string;
  reasons: string[];
  integrationOptions: Array<{
    icon: string;
    name: string;
    description: string;
  }>;
  futureIntegration: any[];
}

export function SAPIntegrationClient({ sapIntegrationData }: { sapIntegrationData: SAPIntegrationData }) {
  if (!sapIntegrationData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-16">
      <ScrollAnimationWrapper>
        <motion.h1 
          className="text-5xl font-bold mb-8 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
          variants={fadeInUp}
        >
          SAP Integration with FIDAS
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-xl text-center mb-12">
          {sapIntegrationData.introText || 'Introduction text not available'}
        </motion.p>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <motion.h2 
          variants={fadeInUp}
          className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
        >
          {sapIntegrationData.reasonsTitle || 'Reasons'}
        </motion.h2>
        <motion.ul 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
          variants={fadeInUp}
        >
          {sapIntegrationData.reasons?.map((reason, index) => (
            <motion.li 
              key={index}
              className="flex items-center space-x-2"
              variants={fadeInUp}
            >
              <FaCheckCircle className="text-green-500" />
              <span>{reason}</span>
            </motion.li>
          )) || <li>No reasons available</li>}
        </motion.ul>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <motion.h2 
          variants={fadeInUp}
          className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
        >
          Integration Options
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={fadeInUp}
        >
          {sapIntegrationData.integrationOptions?.map((option, index) => {
            const IconComponent = FaIcons[option.icon as keyof typeof FaIcons];
            return (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg"
                variants={fadeInUp}
              >
                <div className="text-4xl text-blue-600 mb-4">
                  {IconComponent && <IconComponent />}
                </div>
                <h3 className="text-xl font-semibold mb-2">{option.name}</h3>
                <p>{option.description}</p>
              </motion.div>
            );
          }) || <div>No integration options available</div>}
        </motion.div>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <motion.h2 
          variants={fadeInUp}
          className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
        >
          Future-Ready Integration
        </motion.h2>
        <motion.div variants={fadeInUp} className="prose max-w-none">
          {sapIntegrationData.futureIntegration ? (
            <PortableText 
              value={sapIntegrationData.futureIntegration}
              components={{
                block: ({children}) => <p className="mb-4">{children}</p>,
                list: {
                  bullet: ({children}) => <ul className="list-disc pl-5 space-y-2 mb-4">{children}</ul>,
                },
                listItem: ({children}) => <li className="mb-2">{children}</li>,
              }}
            />
          ) : (
            <p>Future integration information not available</p>
          )}
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
}
