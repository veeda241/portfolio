
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionWrapper = styled(motion.section)`
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease;
  background-color: rgba(0,0,0,0.6);
  border-radius: 12px;
  padding: 40px;
  margin: 30px auto;
  max-width: 800px;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.2em;
  margin-bottom: 15px;
  text-transform: uppercase;
  border-bottom: 1px solid #aaa;
  padding-bottom: 5px;
`;

const ProjectList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProjectItem = styled.li`
  margin-bottom: 20px;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5em;
  margin-bottom: 5px;
`;

const ProjectDescription = styled.p`
  font-size: 1.1em;
  line-height: 1.6;
`;

const ProjectLink = styled.a`
  color: #ffd700;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #00ffd5;
  }
`;

interface Project {
  title: string;
  description: string;
  link: string;
}

interface ProjectsProps {
  title: string;
  items: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ title, items }) => {
  return (
    <SectionWrapper id="projects">
      <SectionTitle>{title}</SectionTitle>
      <ProjectList>
        {items.map((project, index) => (
          <ProjectItem key={index}>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            {project.link && (
              <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </ProjectLink>
            )}
          </ProjectItem>
        ))}
      </ProjectList>
    </SectionWrapper>
  );
};

export default Projects;
