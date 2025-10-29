import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Navbar from './components/Navbar';
import portfolioData from './portfolioData.json';
import SocialLinks from './components/SocialLinks';
import profileImage from './assets/profile.png';
import AboutSection from './components/AboutSection';
import NewSkills from './components/NewSkills';

const MainAppWrapper = styled.div`
  /* This can be the main container for the single page app */
`;

const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftPanel = styled.div`
  width: 50%;
  background-color: #0d5d5d;
  padding: 40px;
  color: white;
`;

const RightPanel = styled.div`
  width: 50%;
  background-image: url(${profileImage});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const App: React.FC = () => {
  return (
    <MainAppWrapper>
      <AppWrapper id="home">
        <LeftPanel>
          <Navbar />
          <Header {...portfolioData.header} />
        </LeftPanel>
        <RightPanel>
          <SocialLinks />
        </RightPanel>
      </AppWrapper>
      <div id="about">
        <AboutSection />
      </div>
      <NewSkills />
    </MainAppWrapper>
  );
};

export default App;
