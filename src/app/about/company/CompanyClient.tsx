"use client";
import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';
import { FaCheckCircle } from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';
import { MdEmail } from "react-icons/md"

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

interface CompanyData {
  introduction: string;
  teamImage: string;
  companyValues: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  achievements: any[];
  sapIntegration: any[];
  futureIntegration: any[];
  contactUs: {
    title: string;
    description: string;
  };
}

export function CompanyClient({ companyData }: { companyData: CompanyData }) {
  if (!companyData) {
    return <div>Loading...</div>;
  }

  console.log(companyData.contactUs.description)
  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-2">
        <div className="relative  overflow-hidden">
          <ScrollAnimationWrapper>
            <motion.h1 
              className="text-5xl font-bold mb-8  text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About Ventura Automation Services
            </motion.h1>
          </ScrollAnimationWrapper>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
            animate={{
              x: ['-200%', '200%'],
              transition: { repeat: Infinity, duration: 10, ease: "linear" },
            }}
          />
        </div>

        {/* Update the layout section */}
        <div className="flex flex-col gap-12 mb-16">
          <ScrollAnimationWrapper>
            <motion.div 
              className="w-full space-y-8"  // Added space-y-8 for spacing between title and image
              variants={fadeInUp}
            >
              <motion.h2
                variants={fadeInUp}
                className="text-[2.5rem] font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
              >
                Our Team
              </motion.h2>
              <div className="relative rounded-lg overflow-hidden">
                {companyData.teamImage && (
                  <Image
                    src={companyData.teamImage}
                    alt="Our Team"
                    width={700}
                    height={700}
                    className="w-full"
                    objectFit="contain"
                  />
                )}
              </div>
            </motion.div>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper>
          <motion.div 
            className="w-full px-4 sm:px-6 lg:px-8 space-y-6"
            variants={fadeInUp}
          >
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-justify max-w-6xl mx-auto">
              {companyData.introduction}
            </p>
          </motion.div>
        </ScrollAnimationWrapper>

          {/* <ScrollAnimationWrapper>
            <motion.div 
              className="w-full space-y-6"
              variants={fadeInUp}
            >
              <p className="text-lg leading-relaxed text-justify">
                {companyData.introduction}
              </p>
            </motion.div>
          </ScrollAnimationWrapper> */}
        </div>

        {companyData.companyValues && companyData.companyValues.length > 0 && (
          <ScrollAnimationWrapper>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
            >
              Our Values
            </motion.h2>
            <motion.div
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {companyData.companyValues.map((value, index) => {
                const IconComponent = FaIcons[value.icon as keyof typeof FaIcons];
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="text-4xl text-blue-600 mb-4">
                      {IconComponent && <IconComponent />}
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-blue-600">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </ScrollAnimationWrapper>
        )}

        {companyData.achievements && companyData.achievements.length > 0 && (
          <ScrollAnimationWrapper>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold mt-16 mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
            >
              Our Achievements
            </motion.h2>
            <motion.div variants={fadeInUp} className="prose max-w-none">
            <PortableText
              value={companyData.achievements}
              components={{
                list: {
                  bullet: ({ children }) => <ul className="list-none pl-0">{children}</ul>,
                },
                listItem: ({ children }) => (
                  <li className="flex items-start gap-2 mb-2">
                    <span className="w-3 h-3 bg-blue-600 rounded-full mt-1 block"></span>
                    <span>{children}</span>
                  </li>
                ),
              }}
            />
          </motion.div>


            {/* <motion.div variants={fadeInUp} className="prose max-w-none list-disc pl-5">
              <PortableText 
                value={companyData.achievements}
                components={{
                  list: {
                    bullet: ({children}) => <ul className="list-disc pl-5">{children}</ul>,
                  },
                }}
              />
            </motion.div> */}
          </ScrollAnimationWrapper>
        )}

        {companyData.sapIntegration && companyData.sapIntegration.length > 0 && (
          <ScrollAnimationWrapper>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold mt-16 mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
            >
              SAP Integration Experience
            </motion.h2>
            <motion.div variants={fadeInUp} className="prose max-w-none">
            <PortableText
              value={companyData.achievements}
              components={{
                list: {
                  bullet: ({ children }) => <ul className="list-none pl-0">{children}</ul>,
                },
                listItem: ({ children }) => (
                  <li className="flex items-start gap-2 mb-2">
                       <span className="mt-1 text-blue-600">✔️</span>
                    <span>{children}</span>
                  </li>
                ),
              }}
            />
          </motion.div>
{/* 
            <motion.div variants={fadeInUp} className="space-y-4">
             
            <PortableText
              value={companyData.achievements}
              components={{
                list: {
                  bullet: ({ children }) => (
                    <li className="flex items-start gap-2 hover:text-blue-600 transition-colors duration-300">
                       <span className="mt-1 text-blue-600">✔️</span>
                      <span className="text-gray-700">{children}</span>
                    </li>
                  ),
                },
              }}
            />

          </motion.div> */}

          </ScrollAnimationWrapper>
        )}

        {companyData.futureIntegration && companyData.futureIntegration.length > 0 && (
          <ScrollAnimationWrapper>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold mt-16 mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
            >
              Future-Ready Integration
            </motion.h2>
            <motion.div variants={fadeInUp} className="prose max-w-none">
            <PortableText
              value={companyData.achievements}
              components={{
                list: {
                  bullet: ({ children }) => <ul className="list-none pl-0">{children}</ul>,
                },
                listItem: ({ children }) => (
                  <li className="flex items-start gap-2 mb-2">
                    <span className="w-3 h-3 bg-blue-600 rounded-full mt-1 block"></span>
                    <span>{children}</span>
                  </li>
                ),
              }}
            />
          </motion.div>

          </ScrollAnimationWrapper>
        )}

{/* 
        {companyData.contactUs && (
          <ScrollAnimationWrapper>
            <motion.div
              variants={fadeInUp}
              className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-teal-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl border border-blue-100"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                {companyData.contactUs.title}
              </h2>
              <div className="text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line">
                {/* {companyData.contactUs.description } 
                Regis Xavier
                <a
                href="mailto:contact@fidas.in"
                className="flex items-center gap-2 mt-3 text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                <MdEmail className="w-6 h-6" />
                <span>contact@fidas.in</span>
              </a>
              </div>
            </motion.div>
          </ScrollAnimationWrapper>
        )} */}

        {companyData.contactUs && (
           <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl px-6 sm:px-12 lg:px-24 py-12 flex flex-col sm:flex-row items-center justify-between gap-6"
    >
      {/* Left side message */}
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">
          Have a project in mind? Let's make it happen!
        </h2>
        <p className="mt-2 text-gray-600 sm:text-lg">
          We'd love to hear from you. Reach out today.
        </p>
      </div>

      {/* Right side CTA button */}
      <div className="flex-1 flex justify-center sm:justify-end">
        <a
          href="/contact/us" // Replace with your email or link to contact form
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
        >
          Contact Us
        </a>
      </div>
    </motion.section>
        )}

        {/* {companyData.contactUs && (
          <ScrollAnimationWrapper>
            <motion.div
              variants={fadeInUp}
              className="mt-16 p-8 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4 text-blue-600">{companyData.contactUs.title}</h2>
              <div className="text-lg whitespace-pre-line">{companyData.contactUs.description}</div>
            </motion.div>
          </ScrollAnimationWrapper>
        )} */}
        {/* Removed FIDAS Benefits section */}
      </div>
    </div>
  );
}
