
import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import ParticlesComponent from './components/Particles';
import Navbar from './components/Navbar';
import portfolioData from './portfolioData.json';

const AppWrapper = styled.div`
  color: #f8f8f8;
  font-family: 'Montserrat', sans-serif;
`;

const Main = styled.main`
  position: relative;
  z-index: 1;
`;

const App: React.FC = () => {
  return (
    <AppWrapper>
      <ParticlesComponent />
      <Navbar />
      <Main>
        <Header {...portfolioData.header} />
        <About {...portfolioData.about} />
        <Skills {...portfolioData.skills} />
        <Projects {...portfolioData.projects} />
        <Achievements {...portfolioData.achievements} />
        <Contact {...portfolioData.contact} />
      </Main>
    </AppWrapper>
  );
};

export default App;
