import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaRobot, FaTerminal, FaGavel, FaWind, FaFish, FaShieldAlt, FaMoneyBillWave, FaPalette, FaChartBar, FaBookReader } from 'react-icons/fa';

const projectIcons: { [key: string]: React.ReactElement } = {
  "Nova System AI": <FaRobot />,
  "NOVA CLI": <FaTerminal />,
  "Legal Case Law Bot": <FaGavel />,
  "AQI AI Agent": <FaWind />,
  "MatsyaN - Fish Recognition": <FaFish />,
  "SentinelDB": <FaShieldAlt />,
  "RobinHood Tax System": <FaMoneyBillWave />,
  "Generative Design": <FaPalette />,
  "DAC Website": <FaChartBar />,
  "StudyBuddy Pro": <FaBookReader />,
};

const ProjectShowcaseContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectItem = styled(motion.a)`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.015);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 14px;
  padding: 28px;
  color: white;
  text-decoration: none;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 14px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(76,161,175,0.2), transparent, rgba(144,238,144,0.2));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(76,161,175,0.03), transparent);
    transition: left 0.6s ease;
  }

  &:hover::after {
    left: 100%;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
`;

const ProjectIconWrapper = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(76,161,175,0.08);
  border: 1px solid rgba(76,161,175,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  color: #4ca1af;
  transition: all 0.3s ease;

  ${ProjectItem}:hover & {
    background: rgba(144,238,144,0.1);
    border-color: rgba(144,238,144,0.25);
    color: #90ee90;
  }
`;

const LinkIcons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const LinkIcon = styled.span`
  font-size: 0.85em;
  color: rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  padding: 4px;

  ${ProjectItem}:hover & {
    color: #90ee90;
  }
`;

const ProjectNumber = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6em;
  color: rgba(76,161,175,0.35);
  letter-spacing: 2px;
  margin-bottom: 6px;
  display: block;
  position: relative;
  z-index: 1;
`;

const ProjectTitle = styled.h3`
  font-size: 1.15em;
  font-weight: 700;
  margin-bottom: 10px;
  color: white;
  line-height: 1.3;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;

  ${ProjectItem}:hover & {
    color: #90ee90;
  }
`;

const ProjectDescription = styled.p`
  font-size: 0.82em;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 16px;
  flex: 1;
  position: relative;
  z-index: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  position: relative;
  z-index: 1;
`;

const Tag = styled.span`
  font-family: 'JetBrains Mono', monospace;
  background: rgba(76, 161, 175, 0.06);
  color: rgba(76,161,175,0.7);
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.65em;
  font-weight: 500;
  border: 1px solid rgba(76, 161, 175, 0.1);
`;

interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
}

interface ProjectShowcaseProps {
  items: Project[];
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ items }) => {
  return (
    <ProjectShowcaseContainer>
      {items.map((project, index) => (
        <ProjectItem
          key={index}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
          viewport={{ once: true }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
        >
          <ProjectHeader>
            <ProjectIconWrapper>
              {projectIcons[project.title] || <FaGithub />}
            </ProjectIconWrapper>
            <LinkIcons>
              <LinkIcon><FaGithub /></LinkIcon>
              <LinkIcon><FaExternalLinkAlt /></LinkIcon>
            </LinkIcons>
          </ProjectHeader>
          <ProjectNumber>{"PROJECT_" + String(index + 1).padStart(2, '0')}</ProjectNumber>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectDescription>{project.description}</ProjectDescription>
          <ProjectTags>
            {project.tags.map((tag, i) => (
              <Tag key={i}>{tag}</Tag>
            ))}
          </ProjectTags>
        </ProjectItem>
      ))}
    </ProjectShowcaseContainer>
  );
};

export default ProjectShowcase;
