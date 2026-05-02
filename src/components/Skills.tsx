import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaDatabase, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import { SiFlask } from 'react-icons/si';
import { GiRobotAntennas } from 'react-icons/gi';
import { RiRobotLine } from 'react-icons/ri';
import AnimatedSectionTitle from './AnimatedSectionTitle';



const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

const SkillsWrapper = styled.section`
  padding: ${props => props.theme.space[8]} ${props => props.theme.space[6]};
  background: ${props => props.theme.colors.surface.base};
  color: ${props => props.theme.colors.text.primary};
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: ${props => props.theme.space[6]} ${props => props.theme.space[4]};
  }
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.space[4]};
  max-width: 1200px;
  margin: 0 auto;
`;

const SkillCard = styled(motion.div) <{ isSelected: boolean }>`
  background: ${props => props.isSelected
    ? props.theme.colors.surface.muted
    : 'rgba(255, 255, 255, 0.02)'};
  border: 1px solid ${props => props.isSelected
    ? props.theme.colors.accent.default
    : props.theme.colors.border.default};
  border-radius: ${props => props.theme.radius.md};
  padding: ${props => props.theme.space[5]};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.space[3]};
  position: relative;
  overflow: hidden;
  transition: all ${props => props.theme.motion.normal} cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.isSelected ? props.theme.shadows[3] : 'none'};

  &:hover {
    border-color: ${props => props.theme.colors.accent.default};
    background: ${props => props.theme.colors.surface.muted};
    transform: translateY(-4px);
  }
`;

const SkillIcon = styled.div<{ isSelected: boolean }>`
  font-size: 2.5em;
  color: ${props => props.isSelected ? props.theme.colors.accent.default : props.theme.colors.text.secondary};
  transition: all ${props => props.theme.motion.normal} ease;
`;

const SkillTitle = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.1em;
  font-weight: 700;
  margin: 0;
  color: ${props => props.theme.colors.text.primary};
  text-transform: uppercase;
`;

const SkillLevel = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.75em;
  font-weight: 700;
  color: ${props => props.theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const DescriptionContainer = styled(motion.div)`
  text-align: left;
  max-width: 900px;
  margin: ${props => props.theme.space[6]} auto 0;
  padding: ${props => props.theme.space[6]};
  background: ${props => props.theme.colors.surface.muted};
  border: 1px solid ${props => props.theme.colors.border.default};
  border-radius: ${props => props.theme.radius.md};
  position: relative;
  box-shadow: ${props => props.theme.shadows[3]};
`;

const DescHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space[3]};
  margin-bottom: ${props => props.theme.space[3]};
`;

const DescIcon = styled.div`
  font-size: 1.8em;
  color: ${props => props.theme.colors.accent.default};
`;

const DescTitle = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.5em;
  font-weight: 900;
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
`;

const DescText = styled.p`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.05em;
  line-height: 1.8;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.space[3]};
`;

const ExpTag = styled.span`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.8em;
  font-weight: 700;
  padding: 6px 14px;
  background: rgba(194, 164, 255, 0.1);
  border: 1px solid ${props => props.theme.colors.accent.default};
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => props.theme.colors.accent.default};
  display: inline-block;
  text-transform: uppercase;
`;

const skills = [
  {
    icon: <FaLightbulb />,
    title: 'Problem Solving',
    level: 'Advanced',
    description: 'Writing clean and optimized code in Java, Python, and C. Solving challenges on LeetCode to improve logical thinking and algorithm skills.',
    experience: 'Core competency',
  },
  {
    icon: <RiRobotLine />,
    title: 'Generative AI',
    level: 'Intermediate',
    description: 'Building and fine-tuning generative models using Hugging Face Transformers and LLMs for content generation and NLP tasks.',
    experience: '1 year experience',
  },
  {
    icon: <FaDatabase />,
    title: 'SQL & Databases',
    level: 'Intermediate',
    description: 'Efficient SQL queries for data retrieval, aggregation, and reporting. Designed optimized relational database schemas.',
    experience: 'Since Jan 2023',
  },
  {
    icon: <GiRobotAntennas />,
    title: 'UiPath RPA',
    level: 'Intermediate',
    description: 'Automated workflows reducing manual effort. Integrated UiPath bots with APIs and databases for data-driven automation.',
    experience: 'Since Jun 2024',
  },
  {
    icon: <FaHtml5 />,
    title: 'HTML5',
    level: 'Proficient',
    description: 'Developing front-end layouts with clean, accessible HTML structures ensuring cross-device compatibility and responsiveness.',
    experience: 'Since Mar 2025',
  },
  {
    icon: <FaCss3Alt />,
    title: 'CSS3',
    level: 'Proficient',
    description: 'Modern CSS3 styling with flexbox, grid systems, animations, and responsive design principles.',
    experience: 'Since Mar 2025',
  },
  {
    icon: <SiFlask />,
    title: 'Flask',
    level: 'Intermediate',
    description: 'Built and deployed lightweight web applications connecting back-end logic with ML models and databases.',
    experience: 'Since Oct 2024',
  },
  {
    icon: <FaJs />,
    title: 'JavaScript',
    level: 'Proficient',
    description: 'Interactive UI components, event handling, and API integration using modern JavaScript and DOM manipulation.',
    experience: 'Since Mar 2025',
  },
];

const Skills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);

  return (
    <SkillsWrapper id="skills">
      <AnimatedSectionTitle label="// tech_stack" title="Skills" />
      <SkillsContainer>
        {skills.map((skill, index) => (
          <SkillCard
            key={index}
            isSelected={selectedSkill.title === skill.title}
            onClick={() => setSelectedSkill(skill)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <SkillIcon isSelected={selectedSkill.title === skill.title}>
              {skill.icon}
            </SkillIcon>
            <SkillTitle>{skill.title}</SkillTitle>
            <SkillLevel>{skill.level}</SkillLevel>
          </SkillCard>
        ))}
      </SkillsContainer>
      <AnimatePresence mode="wait">
        {selectedSkill && (
          <DescriptionContainer
            key={selectedSkill.title}
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <DescHeader>
              <DescIcon>{selectedSkill.icon}</DescIcon>
              <DescTitle>{selectedSkill.title}</DescTitle>
            </DescHeader>
            <DescText>{selectedSkill.description}</DescText>
            <ExpTag>{selectedSkill.experience}</ExpTag>
          </DescriptionContainer>
        )}
      </AnimatePresence>
    </SkillsWrapper>
  );
};

export default Skills;
