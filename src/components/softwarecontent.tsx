"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SoftwareIntegrations({ nodes }: { nodes: any[] }) {
  const [radius, setRadius] = useState(160);

  // ✅ Dynamically adjust radius on resize (SSR-safe)
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 480) setRadius(100);
      else if (window.innerWidth < 768) setRadius(130);
      else setRadius(160);
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 text-center mb-12">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 py-2 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
        Software Integrations
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-4xl mx-auto">
        FIDAS seamlessly integrates with leading ERP and production management
        systems, enabling automatic data exchange for inspection results,
        fabric roll tracking, and quality reports. This ensures smooth workflow
        automation, real-time visibility, and accurate updates across your
        entire production process.
      </p>

      {/* Orbit Section */}
      <div
        className="relative flex items-center justify-center w-full h-[320px] sm:h-[420px] md:h-[500px] overflow-hidden"
        aria-label="Software Integrations Orbit"
      >
        {/* Center Circle */}
        <div className="absolute flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border border-teal-400/40 rounded-full shadow-lg group bg-white/40 backdrop-blur-md">
          <Image
            src="/images/icons/fidas-software.png"
            alt="FIDAS Software"
            width={70}
            height={70}
            className="object-contain pointer-events-none"
            priority
          />
          <span className="absolute bottom-[-2.2rem] left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-400 to-blue-500 text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
            FIDAS Software
          </span>
        </div>

        {/* ✅ Render orbit layout (mobile + desktop adaptive) */}
        <OrbitSection nodes={nodes} radius={radius} />
      </div>
    </section>
  );
}

// =======================================================
// 🔹 Orbit Section Component (mobile + desktop handling)
// =======================================================
function OrbitSection({ nodes, radius }: { nodes: any[]; radius: number }) {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640); // sm breakpoint
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <>
      {isMobile ? (
        /* 🔹 Mobile Orbit Layout */
        <motion.div
          className="absolute rounded-full border border-teal-400/40 w-[180px] h-[180px]"
        >
          {nodes.map((node, i) => {
            const angle = (i / nodes.length) * 2 * Math.PI;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            return (
              <motion.div
                key={i}
                className="absolute flex flex-col items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full shadow-md group"
                style={{
                top: `calc(50% + ${y}px - 24px)`,
                left: `calc(50% + ${x}px - 24px)`,
              }}
              >
                <Image src={node.icon} alt={node.label} width={30} height={30} />
                <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-[9px] bg-gradient-to-r from-teal-400 to-blue-500 text-white font-medium px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {node.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        /* 🔹 Desktop Orbit Layout */
         <motion.div
      className="absolute rounded-full border border-teal-400/40 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px]"
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      {nodes.map((node, i) => {
        // 🔹 Responsive radius based on screen size
        const radius = typeof window !== "undefined"
          ? window.innerWidth < 640
            ? 110
            : window.innerWidth < 1024
            ? 145
            : 180
          : 180;

        const angle = (i / nodes.length) * 2 * Math.PI;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full shadow-md backdrop-blur-sm group"
            style={{
              top: `calc(50% + ${y}px - 40px)`,
              left: `calc(50% + ${x}px - 40px)`,
            }}
            whileHover={{ scale: 1.15 }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            <Image
              src={node.icon}
              alt={node.label}
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="absolute bottom-[-1.8rem] left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-400 to-blue-500 text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-30">
              {node.label}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
      )}
    </>
  );
}
