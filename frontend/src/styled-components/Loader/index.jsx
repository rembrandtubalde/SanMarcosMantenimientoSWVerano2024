import React from 'react';
import { motion } from 'framer-motion';
import './index.css';

export const Loader = () => {
  return (
    <div className='loader'>
      <motion.span
        className='loader__circle'
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 1
        }}
      />
    </div>
  );
};
