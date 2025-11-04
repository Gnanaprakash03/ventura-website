import React from 'react';
import { motion } from 'framer-motion';

const SmallLoader = () => {
  return (
    <motion.div
      className="w-4 h-4 border-t-2 border-blue-500 border-solid rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

export default SmallLoader;