import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProjectShowcase from './ProjectShowcase';
import AnimatedSectionTitle from './AnimatedSectionTitle';
import portfolioData from '../portfolioData.json';

const SectionWrapper = styled(motion.section)`
  background: ${props => props.theme.colors.surface.base};
  padding: ${props => props.theme.space[8]} ${props => props.theme.space[6]};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: ${props => props.theme.space[6]} ${props => props.theme.space[4]};
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
