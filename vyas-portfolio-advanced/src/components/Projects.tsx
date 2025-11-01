import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProjectShowcase from './ProjectShowcase';
import portfolioData from '../portfolioData.json';

const SectionWrapper = styled(motion.section)`
  background: linear-gradient(45deg, #4ca1af, #1c3a5e, #2e8b57);
  border-radius: 12px;
  padding: 40px;
  margin: 30px auto;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
`;

const SectionTitle = styled.h2`
  font-size: 2.2em;
  margin-bottom: 15px;
  text-transform: uppercase;
  border-bottom: 1px solid #aaa;
  padding-bottom: 5px;
`;

interface ProjectsProps {
  title: string;
}

const Projects: React.FC<ProjectsProps> = ({ title }) => {
  return (
    <SectionWrapper
      id="projects"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <SectionTitle>{title}</SectionTitle>
      <ProjectShowcase items={portfolioData.projects.items} />
    </SectionWrapper>
  );
};

export default Projects;
