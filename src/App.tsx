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
  background: ${props => props.theme.colors.surface.base};
  min-height: 100vh;
  position: relative;
  color: ${props => props.theme.colors.text.primary};
`;

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
    background: linear-gradient(90deg, transparent, ${props => props.theme.colors.accent.default}, transparent);
    opacity: 0.1;
    animation: ${scanLine} 8s linear infinite;
  }
`;

const AppWrapper = styled(motion.div)`
  display: flex;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at 0% 0%, ${props => props.theme.colors.surface.muted} 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, ${props => props.theme.colors.surface.muted} 0%, transparent 50%);

  @media (max-width: 900px) {
    flex-direction: column;
    min-height: auto;
  }
`;

const LeftPanel = styled.div`
  width: 50%;
  padding: ${props => props.theme.space[8]} ${props => props.theme.space[6]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;

  @media (max-width: 900px) {
    width: 100%;
    padding: ${props => props.theme.space[6]};
  }
`;

const RightPanel = styled.div`
  width: 50%;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 900px) {
    width: 100%;
    height: 60vh;
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
  border-radius: ${props => props.theme.radius.md};
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.border.default};
  box-shadow: ${props => props.theme.shadows[3]};
`;

const ProfileImageStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 60%, ${props => props.theme.colors.surface.base});
`;

const SectionDivider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, ${props => props.theme.colors.border.default}, transparent);
  margin: ${props => props.theme.space[8]} 0;
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
          <AnimatedCircuits />
          <Navbar />

          <AppWrapper
            id="home"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <LeftPanel>
              <Header {...portfolioData.header} />
            </LeftPanel>
            <RightPanel>
              <ParticlesComponent />
              <ProfileImageWrapper>
                <ProfileImageStyled src={profileImage} alt="Vyas - AI Engineer" />
                <ImageOverlay />
              </ProfileImageWrapper>
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
