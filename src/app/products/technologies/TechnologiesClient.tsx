"use client";
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FaIcons from 'react-icons/fa';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface Technology {
  _id: string;
  name: string;
  description: string;
  features: string[];
  icon: string;
}

export function TechnologiesClient({ technologies }: { technologies: Technology[] }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    } else {
      controls.start("initial");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={controls}
      variants={staggerChildren}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {technologies.map((tech) => {
        const IconComponent = FaIcons[tech.icon as keyof typeof FaIcons];
        return (
          <motion.div
            key={tech._id}
            variants={fadeInUp}
            className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="text-4xl text-blue-600 mb-4">
              {IconComponent && <IconComponent />}
            </div>
            <h3 className="text-xl font-semibold mb-4 text-blue-600">{tech.name}</h3>
            <p className="text-gray-600 mb-4">{tech.description}</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              {tech.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="text-sm">{feature}</li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </motion.div>
  );
}