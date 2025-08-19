import React, { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const TraditionalParticles = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ["#ffb300", "#e57373", "#81c784", "#ff6b9d", "#9c27b0", "#64b5f6"],
      },
      links: {
        color: "#ffb300",
        distance: 150,
        enable: false,
        opacity: 0.2,
        width: 1,
      },
      collisions: {
        enable: false,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 0.8,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 1200,
        },
        value: 25,
      },
      opacity: {
        value: { min: 0.3, max: 0.7 },
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false,
        },
      },
      shape: {
        type: ["circle", "triangle", "star"],
        options: {
          star: {
            sides: 5,
          },
          triangle: {
            sides: 3,
          },
        },
      },
      size: {
        value: { min: 3, max: 8 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 1,
          sync: false,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="traditional-particles"
      init={particlesInit}
      options={particlesConfig}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default TraditionalParticles;
