import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RibbonCutting.css';

const RibbonCutting = ({ onComplete }) => {
  const [stage, setStage] = useState('entrance'); // entrance -> cutting -> reveal -> complete
  const [showScissors, setShowScissors] = useState(false);
  const [showRibbonPieces, setShowRibbonPieces] = useState(false);

  useEffect(() => {
    const timeline = [
      { delay: 500, action: () => setStage('cutting') },
      { delay: 1000, action: () => setShowScissors(true) },
      { delay: 2000, action: () => setShowRibbonPieces(true) },
      { delay: 2500, action: () => setStage('reveal') },
      { delay: 4000, action: () => setStage('complete') },
      { delay: 5000, action: () => onComplete() }
    ];

    const timeouts = timeline.map(({ delay, action }) => 
      setTimeout(action, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <motion.div 
          className="ribbon-cutting-overlay"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Traditional Hindu Background Pattern */}
          <div className="hindu-pattern-bg">
            <div className="mandala-pattern"></div>
            <div className="kolam-pattern"></div>
          </div>

          {/* Floating Flower Petals */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="flower-petal"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: -50,
                rotate: 0,
                opacity: 0.8 
              }}
              animate={{
                y: window.innerHeight + 50,
                rotate: 360,
                opacity: 0
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                delay: Math.random() * 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                background: ['#ffb300', '#e57373', '#81c784', '#ff6b9d'][Math.floor(Math.random() * 4)]
              }}
            />
          ))}

          {/* Main Ribbon */}
          <div className="ribbon-container">
            <motion.div
              className="ribbon-left"
              animate={showRibbonPieces ? { x: -200, rotate: -15 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.div
              className="ribbon-right"
              animate={showRibbonPieces ? { x: 200, rotate: 15 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            
            {/* Golden Scissors */}
            <AnimatePresence>
              {showScissors && (
                <motion.div
                  className="scissors"
                  initial={{ y: -100, opacity: 0, scale: 0.5 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1, 
                    scale: 1,
                    rotate: [0, -10, 10, -5, 0] 
                  }}
                  transition={{ 
                    duration: 1.5,
                    rotate: { 
                      duration: 0.5, 
                      delay: 0.5,
                      times: [0, 0.25, 0.75, 0.9, 1] 
                    }
                  }}
                >
                  ✂️
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Ceremonial Elements */}
          <div className="ceremony-elements">
            <motion.div 
              className="diya"
              animate={{ 
                scale: [1, 1.1, 1],
                filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              🪔
            </motion.div>
            <motion.div 
              className="lotus"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              🪷
            </motion.div>
          </div>

          {/* Welcome Text */}
          <motion.div
            className="welcome-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: stage === 'reveal' ? 1 : 0, 
              y: stage === 'reveal' ? 0 : 50,
              scale: stage === 'reveal' ? [0.8, 1.1, 1] : 0.8
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="welcome-title">🙏 வரவேற்கிறோம் 🙏</h1>
            <p className="welcome-subtitle">கிருஹப்பிரவேச விழாவிற்கு</p>
          </motion.div>

          {/* Confetti Effect */}
          {showRibbonPieces && (
            <div className="confetti-container">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="confetti-piece"
                  initial={{
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                    scale: 0,
                    rotate: 0
                  }}
                  animate={{
                    x: Math.random() * window.innerWidth,
                    y: window.innerHeight + 100,
                    scale: [0, 1, 0.8],
                    rotate: Math.random() * 720
                  }}
                  transition={{
                    duration: 3,
                    delay: Math.random() * 0.5,
                    ease: "easeOut"
                  }}
                  style={{
                    background: ['#ffb300', '#e57373', '#81c784', '#ff6b9d', '#9c27b0'][Math.floor(Math.random() * 5)]
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RibbonCutting;
