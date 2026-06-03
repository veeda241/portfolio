import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaRobot, FaShieldAlt, FaBookOpen, FaGlobe, FaFish, FaChartBar } from 'react-icons/fa';

const projectIcons: { [key: string]: React.ReactElement } = {
  'Nova AI': <FaRobot />,
  'ExamGuard Pro': <FaShieldAlt />,
  'StudyBuddy Pro': <FaBookOpen />,
  'Personal Portfolio': <FaGlobe />,
  'RobinHood Tax System': <FaChartBar />,
  'MatsyaN - Fish Recognition': <FaFish />,
};

const ProjectShowcaseContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${props => props.theme.space[4]};
  max-width: 1180px;
  margin: 0 auto;

  @media (max-width: 840px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectItem = styled(motion.a)`
  display: flex;
  flex-direction: column;
  min-height: 320px;
  background:
    radial-gradient(circle at 90% 12%, rgba(194, 164, 255, 0.16), transparent 28%),
    ${props => props.theme.colors.surface.muted};
  border: 1px solid ${props => props.theme.colors.border.default};
  border-radius: ${props => props.theme.radius.md};
  padding: ${props => props.theme.space[6]};
  color: ${props => props.theme.colors.text.primary};
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: all ${props => props.theme.motion.normal} cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.theme.shadows[2]};

  &:hover {
    border-color: ${props => props.theme.colors.accent.default};
    transform: translateY(-8px);
    box-shadow: 0 26px 80px rgba(194, 164, 255, 0.13);
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.space[4]};
  position: relative;
  z-index: 1;
`;

const ProjectIconWrapper = styled.div`
  width: 58px;
  height: 58px;
  border-radius: ${props => props.theme.radius.sm};
  background: rgba(194, 164, 255, 0.1);
  border: 1px solid ${props => props.theme.colors.accent.default};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.55em;
  color: ${props => props.theme.colors.accent.default};
  transition: all ${props => props.theme.motion.fast} ease;

  ${ProjectItem}:hover & {
    background: ${props => props.theme.colors.accent.default};
    color: ${props => props.theme.colors.surface.base};
    transform: rotate(10deg);
  }
`;

const LinkIcons = styled.div`
  display: flex;
  gap: ${props => props.theme.space[2]};
  align-items: center;
`;

const LinkIcon = styled.span`
  font-size: 1.1em;
  color: ${props => props.theme.colors.text.secondary};
  transition: all ${props => props.theme.motion.fast} ease;
  padding: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);

  ${ProjectItem}:hover & {
    color: ${props => props.theme.colors.accent.default};
    background: rgba(194, 164, 255, 0.1);
  }
`;

const ProjectTitle = styled.h3`
  font-size: clamp(1.45rem, 3vw, 2.2rem);
  font-weight: 900;
  margin-bottom: ${props => props.theme.space[3]};
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.08;
`;

const ProjectDescription = styled.p`
  font-size: 0.98rem;
  line-height: 1.7;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.space[4]};
  flex: 1;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.space[2]};
`;

const Tag = styled.span`
  font-size: 0.75rem;
  font-weight: 800;
  color: ${props => props.theme.colors.text.tertiary};
  background: rgba(194, 164, 255, 0.08);
  padding: 5px 12px;
  border-radius: 999px;
  border: 1px solid rgba(194, 164, 255, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.06em;
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
  const focusedItems = items;

  return (
    <ProjectShowcaseContainer>
      {focusedItems.map((project, index) => (
        <ProjectItem
          key={project.title}
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
            <ProjectIconWrapper>{projectIcons[project.title] || <FaGithub />}</ProjectIconWrapper>
            <LinkIcons>
              <LinkIcon><FaGithub /></LinkIcon>
              <LinkIcon><FaExternalLinkAlt /></LinkIcon>
            </LinkIcons>
          </ProjectHeader>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectDescription>{project.description}</ProjectDescription>
          <ProjectTags>
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </ProjectTags>
        </ProjectItem>
      ))}
    </ProjectShowcaseContainer>
  );
};

export default ProjectShowcase;
