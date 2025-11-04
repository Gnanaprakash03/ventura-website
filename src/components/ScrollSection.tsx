"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";


type Point = {
  title: string;
  description: string;
  fullContent: string;
};

interface ScrollSectionProps {
  image: string;
  points: Point[];
  reverse?: boolean; // to flip sides
}

export default function ScrollSection({ image, points, reverse }: ScrollSectionProps) {
  const [openModal, setOpenModal] = useState<Point | null>(null);
  
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

  return (
    <div>
      {isMobile ? (
    <section className={`relative min-h-screen flex flex-col lg:flex-row gap-8 py-16 ${reverse ? "lg:flex-row-reverse" : ""}`}>
      
      {/* Image */}
      <div className="w-full lg:w-1/2 sticky top-20 lg:top-40 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Image
            src={image}
            alt="Section image"
            width={550}
            height={500}
            className="rounded-3xl shadow-xl object-cover"
          />
        </motion.div>
      </div>

      {/* Points */}
      <div className="w-full lg:w-1/2 space-y-8 mt-8 lg:mt-0">
        {points.map((point, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-xl sm:text-2xl text-blue-600 font-bold mb-2">{point.title}</h3>
            <p className="text-gray-700 mb-3">{point.description}</p>
           {/* <button onClick={() => setOpenModal(point)} className="text-blue-600 font-semibold hover:underline">
                Read more →
            </button> */}

          </motion.div>
        ))}
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white max-w-md w-full rounded-2xl p-6 relative">
            <button onClick={() => setOpenModal(null)} className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl">
                &times;
            </button>
            <h2 className="text-xl sm:text-2xl font-bold mb-3">{openModal.title}</h2>
            <p className="text-gray-700 leading-relaxed">{openModal.fullContent}</p>
            </div>
        </div>
        )}


      
    </section>
      ) : (
 <section
      className={`min-h-screen flex items-start justify-between gap-8 py-20 ${
        reverse ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Sticky Image */}
      <div className="w-1/2 sticky top-[180px] flex justify-center">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <Image
            src={image}
            alt="Section image"
            width={550}
            height={500}
            className="rounded-3xl shadow-xl object-cover"
            />
        </motion.div>
        </div>

      {/* Points List */}
      <div className="w-1/2 space-y-8">
        {points.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: reverse ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-blue-600 mb-2">{point.title}</h3>
            <p className="text-gray-700 mb-3">{point.description}</p>
            {/* <button
              onClick={() => setOpenModal(point)}
              className="text-blue-500 font-semibold hover:underline"
            >
              Read more →
            </button> */}
          </motion.div>
        ))}
      </div>

      {/* Popup Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl w-full rounded-2xl p-8 relative">
            <button
              onClick={() => setOpenModal(null)}
              className="absolute top-3 right-4 text-grey-700 hover:text-black text-2xl"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">{openModal.title}</h2>
            <p className="text-gray-700 leading-relaxed">{openModal.fullContent}</p>
          </div>
        </div>
      )}
    </section>
     )}
    </div>
   
  );
}
