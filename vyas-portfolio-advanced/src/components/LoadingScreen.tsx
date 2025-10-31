import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #4ca1af, #1c3a5e, #2e8b57);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
`;

const VContainer = styled(motion.div)`
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VBar = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 100px;
  background-color: #e50914; /* Netflix red */
`;

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 10); // Update progress every 10ms for 1 second total

    return () => clearInterval(interval);
  }, []);

  return (
    <LoadingWrapper
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transition: { delay: 1, duration: 0.5 } }}
      exit={{ opacity: 0 }}
    >
      <VContainer>
        <VBar
          style={{
            left: 0,
            transform: "skewY(25deg)",
            transformOrigin: "top left",
            height: `${progress}%`,
          }}
        />
        <VBar
          style={{
            right: 0,
            transform: "skewY(-25deg)",
            transformOrigin: "top right",
            height: `${progress}%`,
          }}
        />
      </VContainer>
    </LoadingWrapper>
  );
};

export default LoadingScreen;