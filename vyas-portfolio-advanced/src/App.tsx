import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import styled from 'styled-components';
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

const MainAppWrapper = styled.div`
  /* This can be the main container for the single page app */
`;

const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftPanel = styled.div`
  width: 50%;
  background: linear-gradient(45deg, #4ca1af, #1c3a5e, #2e8b57);
  padding: 40px;
  color: white;
`;

const RightPanel = styled.div`
  width: 50%;
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 0;
`;

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <MainAppWrapper>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      {!isLoading && (
        <>
          <AppWrapper id="home">
            <LeftPanel>
              <Navbar />
              <Header {...portfolioData.header} />
            </LeftPanel>
            <RightPanel>
              <ParticlesComponent />
              <img src={profileImage} alt="Profile" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
              <SocialLinks />
            </RightPanel>
          </AppWrapper>
          <div id="about">
            <AboutSection />
          </div>
          <Skills />
          <Projects {...portfolioData.projects} />
          <Blog />
		  <Footer />
        </>
      )}
    </MainAppWrapper>
  );
};

export default App;
