"use client";

import React, { useEffect, useState } from 'react';
import { motion, Variants, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';
import { FaDownload, FaFilePdf, FaFilePowerpoint, FaFileWord, FaFileImage, FaFile } from 'react-icons/fa';
import Image from 'next/image';
import { EmailModal } from './EmailModal';

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

interface Download {
  name: string;
  fileUrl: string;
  fileType: string;
}

interface DownloadsData {
  title: string;
  downloads: Download[];
}

const AnimatedDownload = ({ download, index }: { download: Download; index: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [showEmailModal, setShowEmailModal] = React.useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  const getIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'application/pdf': return <FaFilePdf />;
      case 'application/vnd.ms-powerpoint':
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return <FaFilePowerpoint />;
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return <FaFileWord />;
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        return <FaFileImage />;
      default: return <FaFile />;
    }
  };

  const getFileExtension = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'application/pdf': return 'PDF';
      case 'application/vnd.ms-powerpoint':
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return 'PPT';
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'DOC';
      case 'image/jpeg': return 'JPG';
      case 'image/png': return 'PNG';
      case 'image/gif': return 'GIF';
      default: return fileType.split('/')[1].toUpperCase();
    }
  };

  const handleDownload = () => {
    setShowEmailModal(true);
  };

  const processDownload = () => {
    const link = document.createElement('a');
    link.href = download.fileUrl;
    link.download = download.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial="initial"
        animate={controls}
        variants={fadeInUp}
        custom={index}
        className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-4 sm:p-8 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
      >
        <div className="flex items-center mb-4">
          <div className="text-2xl sm:text-4xl text-blue-600 mr-2 sm:mr-4">{getIcon(download.fileType)}</div>
          <h3 className="text-lg sm:text-xl font-semibold text-blue-600">{download.name}</h3>
        </div>
        <div className="mb-4 h-32 sm:h-40 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
          {download.fileType.startsWith('image/') ? (
            <Image
              src={download.fileUrl}
              alt={download.name}
              width={300}
              height={200}
              objectFit="cover"
            />
          ) : (
            <div className="text-4xl sm:text-6xl text-blue-600">
              {getIcon(download.fileType)}
            </div>
          )}
        </div>
        <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-4">
          <span className="uppercase">{getFileExtension(download.fileType)}</span>
        </div>
        <button 
          onClick={handleDownload}
          className="flex items-center bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          <FaDownload className="mr-2" />
          Download
        </button>
      </motion.div>

      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSubmit={(email) => {
          processDownload();
          setShowEmailModal(false);
        }}
        fileName={download.name}
      />
    </>
  );
};

export function DownloadsClient({ downloadsData }: { downloadsData: DownloadsData }) {
  if (!downloadsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-16">
      <ScrollAnimationWrapper>
        <motion.h1 
          className="text-5xl font-bold mb-8 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
          variants={fadeInUp}
        >
          {downloadsData.title}
        </motion.h1>
      </ScrollAnimationWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {downloadsData.downloads.map((download, index) => (
          <AnimatedDownload key={index} download={download} index={index} />
        ))}
      </div>
    </div>
  );
}