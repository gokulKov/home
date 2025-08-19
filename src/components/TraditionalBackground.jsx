import React from 'react';
import { motion } from 'framer-motion';
import './TraditionalBackground.css';

const TraditionalBackground = () => {
  return (
    <div className="traditional-background">
      {/* Animated Rangoli Patterns */}
      <div className="rangoli-container">
        <motion.div 
          className="rangoli-pattern rangoli-1"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div 
          className="rangoli-pattern rangoli-2"
          animate={{ 
            rotate: [360, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div 
          className="rangoli-pattern rangoli-3"
          animate={{ 
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      {/* Paisley Motifs */}
      <div className="paisley-container">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`paisley paisley-${i + 1}`}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.7, 0.4],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Lotus Border Elements */}
      <div className="lotus-border">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`lotus-element lotus-${i + 1}`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 3,
              delay: i * 0.25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Kalash (Sacred Pot) Elements */}
      <div className="kalash-container">
        <motion.div 
          className="kalash kalash-1"
          animate={{
            scale: [1, 1.05, 1],
            filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="kalash kalash-2"
          animate={{
            scale: [1.05, 1, 1.05],
            filter: ["brightness(1.1)", "brightness(1)", "brightness(1.1)"]
          }}
          transition={{
            duration: 4,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Diyas */}
      <div className="floating-diyas">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`floating-diya diya-${i + 1}`}
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6],
              filter: [
                "brightness(1) drop-shadow(0 0 5px rgba(255, 179, 0, 0.3))",
                "brightness(1.3) drop-shadow(0 0 15px rgba(255, 179, 0, 0.6))",
                "brightness(1) drop-shadow(0 0 5px rgba(255, 179, 0, 0.3))"
              ]
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🪔
          </motion.div>
        ))}
      </div>

      {/* Sacred Geometry */}
      <div className="sacred-geometry">
        <motion.div 
          className="yantra"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="sri-chakra"
          animate={{
            rotate: [360, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
};

export default TraditionalBackground;
