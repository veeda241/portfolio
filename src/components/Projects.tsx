import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProjectShowcase from './ProjectShowcase';
import AnimatedSectionTitle from './AnimatedSectionTitle';
import portfolioData from '../portfolioData.json';

const SectionWrapper = styled(motion.section)`
  background: #060a12;
  padding: 100px 40px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

interface ProjectsProps {
  title: string;
}

const Projects: React.FC<ProjectsProps> = ({ title }) => {
  return (
    <SectionWrapper id="projects">
      <AnimatedSectionTitle label="// my_work" title={title} />
      <ProjectShowcase items={portfolioData.projects.items} />
    </SectionWrapper>
  );
};

export default Projects;
