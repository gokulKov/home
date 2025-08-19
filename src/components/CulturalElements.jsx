import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CulturalElements.css';

const CulturalElements = () => {

  return (
    <div className="cultural-elements">
      {/* Reduced Floating Diyas */}
      <div className="enhanced-diyas">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`enhanced-diya diya-float-${i + 1}`}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🪔
          </motion.div>
        ))}
      </div>

      {/* Essential Sacred Hindu Symbols */}
      <div className="sacred-symbols">
        <motion.div 
          className="om-symbol"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ॐ
        </motion.div>
      </div>

      {/* Minimal Traditional Flowers - No sunflowers */}
      <div className="traditional-flowers">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`flower flower-${i + 1}`}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{
              duration: 6,
              delay: i * 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {['🌺', '🪷'][Math.floor(Math.random() * 2)]}
          </motion.div>
        ))}
      </div>

      {/* Simple Kalash */}
      <motion.div 
        className="kalash-simple"
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🏺
      </motion.div>
    </div>
  );
};

export default CulturalElements;
