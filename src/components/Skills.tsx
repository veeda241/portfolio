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
  padding: 100px 40px;
  background: #060a12;
  color: #fff;
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  max-width: 1000px;
  margin: 0 auto;
`;

const SkillCard = styled(motion.div) <{ isSelected: boolean }>`
  background: ${props => props.isSelected
    ? 'rgba(76, 161, 175, 0.08)'
    : 'rgba(255, 255, 255, 0.015)'};
  border: 1px solid ${props => props.isSelected
    ? 'rgba(76, 161, 175, 0.35)'
    : 'rgba(255, 255, 255, 0.04)'};
  border-radius: 12px;
  padding: 28px 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s ease, background 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.isSelected
    ? 'linear-gradient(90deg, #4ca1af, #90ee90)'
    : 'transparent'};
    transition: background 0.3s ease;
  }

  &:hover {
    border-color: rgba(76, 161, 175, 0.25);
    background: rgba(76, 161, 175, 0.04);
  }
`;

const SkillIcon = styled.div<{ isSelected: boolean }>`
  font-size: 2em;
  color: ${props => props.isSelected ? '#90ee90' : 'rgba(255, 255, 255, 0.35)'};
  transition: all 0.3s ease;
  ${props => props.isSelected && css`animation: ${float} 2s ease-in-out infinite;`}
`;

const SkillTitle = styled.h3`
  font-size: 0.85em;
  font-weight: 600;
  margin: 0;
  color: rgba(255, 255, 255, 0.85);
`;

const SkillLevel = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6em;
  color: rgba(76,161,175,0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const DescriptionContainer = styled(motion.div)`
  text-align: left;
  max-width: 800px;
  margin: 40px auto 0;
  padding: 32px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(76, 161, 175, 0.12);
  border-radius: 12px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 20%;
    right: 20%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(144,238,144,0.3), transparent);
  }
`;

const DescHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const DescIcon = styled.div`
  font-size: 1.5em;
  color: #90ee90;
`;

const DescTitle = styled.h3`
  font-size: 1.2em;
  font-weight: 700;
  color: white;
  margin: 0;
`;

const DescText = styled.p`
  font-size: 0.9em;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 12px;
`;

const ExpTag = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72em;
  padding: 4px 10px;
  background: rgba(76,161,175,0.08);
  border: 1px solid rgba(76,161,175,0.15);
  border-radius: 4px;
  color: #4ca1af;
  display: inline-block;
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
