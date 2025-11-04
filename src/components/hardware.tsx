"use client"
import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';


const components = [
  "Electronic Length Measurement Counter",
  "Fabric Width Measurement Sensor",
  "Permanent Roll Printer – Grey Fab",
  "Digital X, Y Coordinate Locator",
  "Defect Camera for Sewing Defect",
  "Real-time GSM Measurement",
  "Weighing Scale Integration",
  "Electronic EPI / PPI Counter",
  "Auto Defect Label Applicator",
  "Computer Integrated Colorimeter",
  "Multi-Touch Touchscreen Monitor",
  "Roll Face Side Marking System",
  "Industrial PC",
  "Interactive Voice Speakers",
  "Roll Auto Packing",
  "Roll Number Barcode / QR Printing",
  "Roll Barcode / QR Scanner",
  "Automated Storage & Retrieval System",
];

export default function HardwareSection(){
    return(
         <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-2 py-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
        Hardware Integrations
      </h2>

      <p className="text-gray-600 mb-8">
        FIDAS seamlessly integrates with cutting-edge hardware components,
        ensuring automation, precision measurement, and real-time visibility
        across your textile operations.
      </p>

      <div className="relative overflow-hidden mb-16" style={{ height: "250px" }}>
        <motion.div
          className="flex absolute"
          animate={{
            x: [0, -2800],
          }}
          transition={{
            x: {
              repeat: Infinity,
              duration: 35,
              ease: "linear",
            },
          }}
          style={{
            width: "5600px", // doubled width for seamless loop
          }}
        >
          {components.map((step, index) => (
            <div key={index} className="flex items-center">
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden flex-shrink-0 mx-2"
                style={{ width: "300px", height: "150px" }}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-teal-400" />
                <p className="text-xl font-semibold mt-4">{step}</p>
              </motion.div>

              {index < components.length - 1 && (
                <div className="flex-shrink-0 w-8 flex items-center justify-center">
                  <FaArrowRight className="text-blue-500 text-xl" />
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
    )
}


