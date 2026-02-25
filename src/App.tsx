import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import styled, { keyframes } from 'styled-components';
import Header from './components/Header';
import Navbar from './components/Navbar';
import portfolioData from './portfolioData.json';
import SocialLinks from './components/SocialLinks';
import profileImage from './assets/profile.png';
import AboutSection from './components/AboutSection';
import Skills from './components/Skills';
import ParticlesComponent from './components/Particles';
import Blog from './components/Blog';
import Projects from './components/Projects';
import Footer from './components/Footer';
import AnimatedCircuits from './components/AnimatedCircuits';
import Certificates from './components/Certificates';
import Experience from './components/Experience';
import Achievements from './components/Achievements';

const scanLine = keyframes`
  0% { top: -2px; }
  100% { top: 100%; }
`;

const MainAppWrapper = styled.div`
  background: #060a12;
  min-height: 100vh;
  position: relative;
`;

/* Subtle global scanline for AI aesthetic */
const GlobalScanLine = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9998;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(76,161,175,0.12), transparent);
    animation: ${scanLine} 6s linear infinite;
  }
`;

/* CRT-style subtle overlay */
const CRTOverlay = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9997;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.015) 2px,
    rgba(0, 0, 0, 0.015) 4px
  );
`;

const AppWrapper = styled(motion.div)`
  display: flex;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  @media (max-width: 900px) {
    flex-direction: column;
    min-height: auto;
  }
`;

const LeftPanel = styled.div`
  width: 50%;
  background: linear-gradient(135deg, #060a12 0%, #0d1b2a 40%, #0a1a1a 100%);
  padding: 40px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  z-index: 2;

  @media (max-width: 900px) {
    width: 100%;
    padding: 24px;
    min-height: auto;
    padding-bottom: 60px;
  }
`;

const RightPanel = styled.div`
  width: 50%;
  position: relative;
  z-index: 0;
  overflow: hidden;

  @media (max-width: 900px) {
    width: 100%;
    height: 60vh;
  }
`;

const ProfileImageStyled = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  z-index: 1;
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
    to right,
    rgba(6, 10, 18, 0.7) 0%,
    rgba(6, 10, 18, 0.2) 30%,
    transparent 60%
  );

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(to top, #060a12, transparent);
  }
`;

/* Glowing circuit lines on the right panel */
const CircuitOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  opacity: 0.3;
  background:
    radial-gradient(circle at 20% 80%, rgba(76,161,175,0.15) 0%, transparent 40%),
    radial-gradient(circle at 80% 20%, rgba(144,238,144,0.1) 0%, transparent 40%);
`;

/* Section divider with AI circuit pattern */
const SectionDivider = styled.div`
  position: relative;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(76,161,175,0.2), transparent);
  max-width: 60%;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: -4px;
    transform: translateX(-50%);
    width: 8px;
    height: 8px;
    border: 1px solid rgba(76,161,175,0.3);
    transform: translateX(-50%) rotate(45deg);
    background: #060a12;
  }
`;

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' }
  }
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Match the NOVA boot sequence timing
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <MainAppWrapper>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GlobalScanLine />
          <CRTOverlay />

          <AppWrapper
            id="home"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <LeftPanel>
              <AnimatedCircuits />
              <Navbar />
              <Header {...portfolioData.header} />
            </LeftPanel>
            <RightPanel>
              <ParticlesComponent />
              <ProfileImageStyled src={profileImage} alt="Vyas - AI Engineer" />
              <ImageOverlay />
              <CircuitOverlay />
              <SocialLinks />
            </RightPanel>
          </AppWrapper>

          <motion.div
            id="about"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <AboutSection />
          </motion.div>

          <SectionDivider />

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <Skills />
          </motion.div>

          <SectionDivider />

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <Projects {...portfolioData.projects} />
          </motion.div>

          <SectionDivider />

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <Experience />
          </motion.div>

          <SectionDivider />

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <Certificates />
          </motion.div>

          <SectionDivider />

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <Achievements />
          </motion.div>

          <SectionDivider />

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <Blog />
          </motion.div>

          <Footer />
        </motion.div>
      )}
    </MainAppWrapper>
  );
};

export default App;
