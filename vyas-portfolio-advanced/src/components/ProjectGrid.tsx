import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import novaAiImage from '../assets/nova_ai.png';
import profileImage from '../assets/profile.png';
import gansCnnsImage from '../assets/gans_cnns.png';

const projectImages: { [key: string]: string } = {
  "nova_ai.png": novaAiImage,
  "profile.png": profileImage,
  "gans_cnns.png": gansCnnsImage,
};

const ProjectGridContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 20px;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const ProjectTitle = styled.h2`
  font-size: 1.8em;
  margin-bottom: 10px;
  color: white;
`;

const ProjectDescription = styled.p`
  font-size: 1em;
  line-height: 1.5;
  margin-bottom: 15px;
  flex-grow: 1;
`;

const ProjectLink = styled.a`
  color: #61dafb;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

interface Project {
  title: string;
  description: string;
  link: string;
  image: string;
}

interface ProjectGridProps {
  items: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ items }) => {
  return (
    <ProjectGridContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {items.map((project, index) => (
        <ProjectCard
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          onClick={() => project.link && window.open(project.link, '_blank')}
        >
          <ProjectImage src={projectImages[project.image]} alt={project.title} />
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectDescription>{project.description}</ProjectDescription>
          {project.link && (
            <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </ProjectLink>
          )}
        </ProjectCard>
      ))}
    </ProjectGridContainer>
  );
};

export default ProjectGrid;
