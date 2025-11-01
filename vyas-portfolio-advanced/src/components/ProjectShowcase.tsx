import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import novaAiImage from '../assets/nova_ai.png';
import profileImage from '../assets/profile.png';
import gansCnnsImage from '../assets/gans_cnns.png';
import studyBuddyProImage from '../assets/Gemini_Generated_Image_feea4feea4feea4f.png';

const projectImages: { [key: string]: string } = {
  "nova_ai.png": novaAiImage,
  "profile.png": profileImage,
  "gans_cnns.png": gansCnnsImage,
  "Gemini_Generated_Image_feea4feea4feea4f.png": studyBuddyProImage,
};

const ProjectShowcaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ProjectItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 2fr 1fr; /* Adjusted to give more space to text */
  gap: 40px;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 40px;
  color: white;
`;

const ProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h2`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tag = styled.span`
  background-color: #61dafb;
  color: #282c34;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9em;
`;

const ProjectDescription = styled.p`
  font-size: 1.1em;
  line-height: 1.6;
`;

const ProjectImage = styled(motion.img)`
  width: 200px; /* Reduced width for the image */
  height: auto;
  border-radius: 10px;
`;

interface Project {
  title: string;
  description: string;
  link: string;
  image: string;
  tags: string[];
}

interface ProjectShowcaseProps {
  items: Project[];
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ items }) => {
  return (
    <ProjectShowcaseContainer>
      {items.map((project, index) => (
        <ProjectItem key={index}>
          <ProjectDetails>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectTags>
              {project.tags.map((tag, i) => (
                <Tag key={i}>{tag}</Tag>
              ))}
            </ProjectTags>
            <ProjectDescription>{project.description}</ProjectDescription>
          </ProjectDetails>
          <ProjectImage
            src={projectImages[project.image]}
            alt={project.title}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </ProjectItem>
      ))}
    </ProjectShowcaseContainer>
  );
};

export default ProjectShowcase;
