"use client";

import React from "react";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Section type
interface Section {
  title: string;
  text: string;
  img: string;
}

// Props for both versions
interface HowFidasWorksProps {
  sections: Section[];
}

// Media query hook
function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

// ------------------------
// Static version (mobile)
// ------------------------
function StaticSections({ sections }: { sections: Section[] }) {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-12">
      <h1 className="text-center text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
        How FIDAS Works
      </h1>

      {sections.map((sec, i) => (
        <div key={i} className="flex flex-col items-center gap-6">
          <img
            src={sec.img}
            alt={sec.title}
            className="rounded-lg shadow-md w-full max-w-md h-64 object-contain"
          />
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-2">
              {sec.title}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">{sec.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ------------------------
// Animated version (desktop/tablet)
// ------------------------
function AnimatedSections({ sections }: { sections: Section[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"],
  });
  
    const titleOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto h-[700vh]"
    >
      {/* Sticky title */}
      <motion.div
        className="sticky top-[4.3rem] bg-blue-50 py-4 px-4 z-30"
        style={{ opacity: titleOpacity }}
      >
        <motion.h1
          style={{ opacity: titleOpacity }}
          className="sticky top-20 left-0 w-full text-center text-6xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400 drop-shadow-lg z-30"
        >
          How FIDAS Works
        </motion.h1>
      </motion.div>

      {/* Sections */}
      <div className="relative">
        {sections.map((sec, i) => {
          const start = i / sections.length;
          const end = (i + 1) / sections.length;

          const opacity =
            i === sections.length - 1
              ? useTransform(scrollYProgress, [start, end], [0, 1.5])
              : useTransform(scrollYProgress, [start, end], [1.8, 0]);

          return (
            <motion.div
              key={i}
              style={{ opacity }}
              className="sticky top-30 h-[70vh] flex flex-col md:flex-row items-center justify-center gap-10 p-10"
            >
              {i % 2 === 0 ? (
                <>
                  <div className="flex-1">
                    <h2 className="text-3xl font-semibold mb-4 text-blue-600">
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
                    <h2 className="text-3xl font-semibold mb-4 text-blue-600">
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
  );
}

// ------------------------
// Main Component
// ------------------------
export default function HowFidasWorks() {
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  
  // Early return ensures hooks are never skipped
  if (isMobile) {
    return <StaticSections sections={sections} />;
  }

  return <AnimatedSections sections={sections} />;
}
