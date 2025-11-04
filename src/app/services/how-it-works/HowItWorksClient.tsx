"use client";

import React from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';
import Image from 'next/image';
import * as FaIcons from 'react-icons/fa';

interface Section {
  title: string;
  text: string;
  img: string;
}

interface StaticSectionsProps {
  sections: Section[];
}

export default function StaticSections({ sections }: StaticSectionsProps) {
  
  const containerRef = useRef(null);
  
  return (
    
    <div ref={containerRef} className="w-full max-w-7xl mx-auto p-4 space-y-12">
      {/* Title */}
      <h1 className="text-center text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
        How FIDAS Works
      </h1>

      {/* Sections */}
      {sections.map((sec, i) => (
        <div key={i} className="flex flex-col items-center gap-6">
          {/* Image */}
          <img
            src={sec.img}
            alt={sec.title}
            className="rounded-lg shadow-md w-full max-w-md h-64 object-contain"
          />

          {/* Text */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              {sec.title}
            </h2>
            <p className="text-gray-600">{sec.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}


const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

interface HowItWorksData {
  mainImage: string;
  steps: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export function HowItWorksClient({ howItWorksData }: { howItWorksData: HowItWorksData }) {

    const [isMobile, setIsMobile] = useState(false);

     useEffect(() => {
        // Function to check window width
        const handleResize = () => {
          setIsMobile(window.innerWidth < 1024); // Tailwind lg breakpoint
        };
    
        handleResize(); // check on mount
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
      }, []);

  if (!howItWorksData) {
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
  

  const sections = [
    {
      title: "Auto Fetch Data from ERP",
      text: "Seamlessly integrate with your ERP system to automatically fetch real-time production and quality data. Reduce manual entry, minimize errors, and ensure your fabric inspection processes are always backed by the most accurate, up-to-date information.",
      img: "/images/samples/sample-image-1.png",
    },
    {
      title: "Allows Defect Entry and Real-Time Grade Visibility",
      text: "Capture fabric defects instantly and monitor grading in real-time. Empower your team with up-to-date insights to ensure consistent quality, faster decision-making, and improved production efficiency.",
      img: "/images/samples/sample-image-2.png",
    },
    {
      title: "Acts as Quality Watchdog",
      text: "FIDAS continuously monitors fabric quality, spotting defects and inconsistencies before they escalate. It acts as a vigilant quality watchdog, ensuring every batch meets your highest standards.",
      img: "/images/samples/sample-image-1.png",
    },
    {
      title: "Defect Mapping and Cut Plan Creation (Batch Inspection Only)",
      text: "Map fabric defects accurately and generate optimized cut plans for batch inspections. Streamline production planning, reduce material wastage, and ensure every batch meets quality and efficiency standards.",
      img: "/images/samples/sample-image-2.png",
    },
    {
      title: "Assist for Auto-Cutting and Automated Packing, with Barcodes for Traceability",
      text: "Streamline your production with automated cutting and packing processes. Integrated barcode tracking ensures complete traceability, reduces errors, and boosts efficiency from fabric inspection to final packaging.",
      img: "/images/samples/sample-image-1.png",
    },
    {
      title: "Auto Generate Roll No and Auto Gradation",
      text: "Automatically assign roll numbers and grade fabrics based on inspection data. This eliminates manual errors, speeds up processing, and ensures consistent and reliable quality tracking across all rolls.",
      img: "/images/samples/sample-image-2.png",
    },
    {
      title: "Weight and GSM Verification and Shade Grouping",
      text: "Verify fabric weight and GSM automatically while grouping rolls by shade for uniformity. Ensure precise quality control, reduce manual errors, and maintain consistent production standards.",
      img: "/images/samples/sample-image-1.png",
    },
    {
      title: "Sale-Order / Sort / Shade / Quality Wise Conveyor-Based Sorting",
      text: "Automatically sort fabrics on conveyors based on sales order, shade, or quality. Streamline material handling, improve efficiency, and ensure accurate delivery aligned with production and customer requirements.",
      img: "/images/samples/sample-image-2.png",
    },
    {
      title: "Automated Storage and Retrieval System of Finished Goods",
      text: "Efficiently manage finished goods with automated storage and retrieval. Reduce handling errors, optimize warehouse space, and ensure quick, accurate access to products for faster dispatch and inventory control.",
      img: "/images/samples/sample-image-1.png",
    },
    {
      title: "Packing List / Gate Pass / DC Generation and ERP Auto-Update",
      text: "Automatically generate packing lists, gate passes, and delivery challans while syncing data with your ERP system. Streamline dispatch processes, minimize manual errors, and ensure real-time inventory and order updates.",
      img: "/images/samples/sample-image-2.png",
    },
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);
  
  return (
      <div>
        {isMobile ? (
          <StaticSections sections={sections} />
        ) : (

          <div ref={containerRef} className="relative w-full max-w-7xl mx-auto h-[350vh] ">
      <motion.div className='sticky top-[4.3rem] bg-white py-4 px-4 z-30'
        style={{ opacity: titleOpacity}}
       >
        <motion.h1
        style={{ opacity: titleOpacity}}
        className="sticky top-20 left-0 w-full text-center text-6xl md:text-5xl font-bold 
                   tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400 drop-shadow-lg z-30"
      >
        How FIDAS Works
      </motion.h1>
      </motion.div>
       {/* Title absolute, will scroll away with container end */}
      

      {/* Sections */}
      <div className="relative">
        {sections.map((sec, i) => {
  const start = i / sections.length;
  const end = (i + 1) / sections.length;

  // Last section should fade in but NOT fade out
  const opacity =
    i === sections.length - 1
      ? useTransform(scrollYProgress, [start, end], [0, 1.5])
      : useTransform(scrollYProgress, [start, end], [2, 0]);

  return (
    <motion.div
      key={i}
      style={{ opacity }}
      className="sticky top-30 h-[70vh] flex flex-col md:flex-row items-center justify-center gap-10 p-10"
    >
      {/* Alternate layout */}
      {i % 2 === 0 ? (
        <>
          <div className="flex-1">
            <h2 className="text-5xl font-semibold mb-4 text-blue-600">
              {sec.title}
            </h2>
            <p className="text-gray-600 text-lg">{sec.text}</p>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src={sec.img}
              alt={sec.title}
              className="rounded-lg shadow-md w-full max-w-xl object-cover"
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 flex justify-center">
            <img
              src={sec.img}
              alt={sec.title}
              className="rounded-lg shadow-md w-full max-w-xl object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-5xl font-semibold mb-4 text-blue-600">
              {sec.title}
            </h2>
            <p className="text-gray-600 text-lg">{sec.text}</p>
          </div>
        </>
      )}
    </motion.div>
  );
})}

      </div>
          </div>

        )
      }
      </div>

       );
}


    

      // Try-1
  //     <div className="space-y-16">
  // {/* Section title */}
  // <ScrollAnimationWrapper>
  //   <motion.h1 
  //     className="text-5xl font-bold mb-8 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
  //     variants={fadeInUp}
  //   >
  //     How FIDAS Works
  //   </motion.h1>
  // </ScrollAnimationWrapper>

  // {/* Rectangle 1 - Text Left / Image Right */}
  // <ScrollAnimationWrapper>
  //   <motion.div
  //     variants={fadeInUp}
  //     className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-10 flex flex-col md:flex-row items-center gap-8"
  //   >
  //     {/* Text on left */}
  //     <div className="flex-1">
  //       <h2 className="text-2xl font-semibold mb-4 text-blue-600">Step One</h2>
  //       <p className="text-gray-600">
  //         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas a magni consequatur ad ratione dignissimos quo culpa eaque quaerat provident odit obcaecati ipsa earum maiores, ut, iste blanditiis facilis suscipit, dolor velit nam molestiae harum nemo corrupti. Est deleniti ea qui assumenda, tempore quae quia quo laboriosam harum ut! Quasi?
  //       </p>
  //     </div>
  //     {/* Image on right */}
  //     <div className="flex-1 flex justify-center">
  //       <img
  //         src="/images/samples/sample-image-1.png"
  //         alt="Step One"
  //         className="rounded-lg shadow-md w-full max-w-sm object-cover"
  //       />
  //     </div>
  //   </motion.div>
  // </ScrollAnimationWrapper>

  // {/* Rectangle 2 - Image Left / Text Right */}
  // <ScrollAnimationWrapper>
  //   <motion.div
  //     variants={fadeInUp}
  //     className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-10 flex flex-col md:flex-row items-center gap-8"
  //   >
  //     {/* Image on left */}
  //     <div className="flex-1 flex justify-center order-1 md:order-none">
  //       <img
  //         src="/images/samples/sample-image-2.png"
  //         alt="Step Two"
  //         className="rounded-lg shadow-md w-full max-w-sm object-cover"
  //       />
  //     </div>
  //     {/* Text on right */}
  //     <div className="flex-1">
  //       <h2 className="text-2xl font-semibold mb-4 text-blue-600">Step Two</h2>
  //       <p className="text-gray-600">
  //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas modi eveniet laboriosam laborum excepturi est dolor labore esse placeat cum repudiandae, ad corrupti quod illo mollitia, perferendis error, culpa accusantium ducimus ab sapiente natus! Recusandae odio error, consequuntur, aliquid iure, voluptates incidunt quaerat soluta saepe esse dolores amet blanditiis. Natus.
  //       </p>
  //     </div>
  //   </motion.div>
  // </ScrollAnimationWrapper>

  //    {/* Rectangle 3 - Text Left / Image Right */}
  // <ScrollAnimationWrapper>
  //   <motion.div
  //     variants={fadeInUp}
  //     className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-10 flex flex-col md:flex-row items-center gap-8"
  //   >
  //     {/* Text on left */}
  //     <div className="flex-1">
  //       <h2 className="text-2xl font-semibold mb-4 text-blue-600">Step Three</h2>
  //       <p className="text-gray-600">
  //         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas a magni consequatur ad ratione dignissimos quo culpa eaque quaerat provident odit obcaecati ipsa earum maiores, ut, iste blanditiis facilis suscipit, dolor velit nam molestiae harum nemo corrupti. Est deleniti ea qui assumenda, tempore quae quia quo laboriosam harum ut! Quasi?
  //       </p>
  //     </div>
  //     {/* Image on right */}
  //     <div className="flex-1 flex justify-center">
  //       <img
  //         src="/images/samples/sample-image-1.png"
  //         alt="Step One"
  //         className="rounded-lg shadow-md w-full max-w-sm object-cover"
  //       />
  //     </div>
  //   </motion.div>
  // </ScrollAnimationWrapper>

  // {/* Rectangle 4 - Image Left / Text Right */}
  // <ScrollAnimationWrapper>
  //   <motion.div
  //     variants={fadeInUp}
  //     className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-10 flex flex-col md:flex-row items-center gap-8"
  //   >
  //     {/* Image on left */}
  //     <div className="flex-1 flex justify-center order-1 md:order-none">
  //       <img
  //         src="/images/samples/sample-image-2.png"
  //         alt="Step Two"
  //         className="rounded-lg shadow-md w-full max-w-sm object-cover"
  //       />
  //     </div>
  //     {/* Text on right */}
  //     <div className="flex-1">
  //       <h2 className="text-2xl font-semibold mb-4 text-blue-600">Step Four</h2>
  //       <p className="text-gray-600">
  //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas modi eveniet laboriosam laborum excepturi est dolor labore esse placeat cum repudiandae, ad corrupti quod illo mollitia, perferendis error, culpa accusantium ducimus ab sapiente natus! Recusandae odio error, consequuntur, aliquid iure, voluptates incidunt quaerat soluta saepe esse dolores amet blanditiis. Natus.
  //       </p>
  //     </div>
  //   </motion.div>
  // </ScrollAnimationWrapper>
  //     </div>


    // <div className="space-y-16">
    //   <ScrollAnimationWrapper>
    //     <motion.h1 
    //       className="text-5xl font-bold mb-8 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
    //       variants={fadeInUp}
    //     >
    //       How FIDAS Works
    //     </motion.h1>
    //   </ScrollAnimationWrapper>

    //   <ScrollAnimationWrapper>
    //     <motion.div variants={fadeInUp} className="mb-12 flex justify-center">
    //       <div className="relative w-full max-w-3xl aspect-w-16 aspect-h-9">
    //         <Image
    //           src={howItWorksData.mainImage}
    //           alt="FIDAS Fabric Inspection Machine"
    //           width={800}
    //           height={450}
    //           className="rounded-lg shadow-lg object-cover"
    //         />
    //       </div>
    //     </motion.div>
    //   </ScrollAnimationWrapper>

    //   <ScrollAnimationWrapper>
    //     <motion.div
    //       className="grid grid-cols-1 md:grid-cols-2 gap-8"
    //       variants={fadeInUp}
    //     >
    //       {howItWorksData.steps.map((step, index) => {
    //         const IconComponent = FaIcons[step.icon as keyof typeof FaIcons];
    //         return (
    //           <motion.div 
    //             key={index}
    //             className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
    //             variants={fadeInUp}
    //           >
    //             <div className="text-4xl text-blue-600 mb-4">
    //               {IconComponent && <IconComponent />}
    //             </div>
    //             <h3 className="text-xl font-semibold mb-4 text-blue-600">{step.title}</h3>
    //             <p className="text-gray-600">{step.description}</p>
    //           </motion.div>
    //         );
    //       })}
    //     </motion.div>
    //   </ScrollAnimationWrapper>
    // </div>
 