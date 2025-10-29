import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaDatabase, FaJs, FaRobot } from 'react-icons/fa';
import { SiFlask } from 'react-icons/si';
import { GiRobotAntennas } from 'react-icons/gi';

const skills = [
  {
    name: 'AI',
    icon: <FaRobot />,
    description: {
      duration: 'Placeholder',
      experience: 'Placeholder',
      projects: 'Placeholder',
    },
  },
  {
    name: 'SQL Skills',
    icon: <FaDatabase />,
    description: {
      duration: 'Placeholder',
      experience: 'Placeholder',
      projects: 'Placeholder',
    },
  },
  {
    name: 'SQL Databases',
    icon: <FaDatabase />,
    description: {
      duration: 'Placeholder',
      experience: 'Placeholder',
      projects: 'Placeholder',
    },
  },
  {
    name: 'UiPath',
    icon: <GiRobotAntennas />,
    description: {
      duration: 'Placeholder',
      experience: 'Placeholder',
      projects: 'Placeholder',
    },
  },
  {
    name: 'HTML',
    icon: <FaHtml5 />,
    description: {
      duration: 'Placeholder',
      experience: 'Placeholder',
      projects: 'Placeholder',
    },
  },
  {
    name: 'CSS',
    icon: <FaCss3Alt />,
    description: {
      duration: 'Placeholder',
      experience: 'Placeholder',
      projects: 'Placeholder',
    },
  },
  {
    name: 'Flask',
    icon: <SiFlask />,
    description: {
      duration: 'Placeholder',
      experience: 'Placeholder',
      projects: 'Placeholder',
    },
  },
  {
    name: 'Javascript',
    icon: <FaJs />,
    description: {
      duration: 'Placeholder',
      experience: 'Placeholder',
      projects: 'Placeholder',
    },
  },
];

const NewSkillsWrapper = styled(motion.section)`
  padding: 100px 40px;
  background: #fff;
  color: #333;
  text-align: center;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

const PageTitle = styled.h1`
  font-size: 3em;
  font-weight: 700;
  margin-bottom: 60px;
`;

const SkillsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
`;

const HexagonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 330px;
  margin: 0 auto;
`;

const Hexagon = styled.div`
  position: relative;
  width: 100px;
  height: 115.47px;
  background-color: #fff;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 2px solid #000;
  margin: 28px 5px;

  &:nth-child(2n) {
    transform: translateY(60px);
  }

  &:hover {
    background-color: #f5a623;
  }
`;

const DescriptionContainer = styled.div`
  text-align: left;
  max-width: 400px;
`;

const SkillTitle = styled.h2`
  font-size: 3.5em;
  color: #0d9488; /* Teal color from the image */
  margin-bottom: 20px;
`;

const SkillDetail = styled.p`
  font-size: 1.1em;
  line-height: 1.6;
  strong {
    color: #0d9488; /* Teal color from the image */
  }
`;

const NewSkills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);

  return (
    <NewSkillsWrapper id="new-skills">
      <PageTitle>Skills</PageTitle>
      <SkillsContainer>
        <HexagonGrid>
          {skills.map((skill) => (
            <Hexagon key={skill.name} onClick={() => setSelectedSkill(skill)}>
              {skill.icon}
            </Hexagon>
          ))}
        </HexagonGrid>
        <DescriptionContainer>
          <SkillTitle>{selectedSkill.name}</SkillTitle>
          <SkillDetail>
            <strong>Duration:</strong> {selectedSkill.description.duration}
          </SkillDetail>
          <SkillDetail>
            <strong>Experience:</strong> {selectedSkill.description.experience}
          </SkillDetail>
          <SkillDetail>
            <strong>Projects:</strong> {selectedSkill.description.projects}
          </SkillDetail>
        </DescriptionContainer>
      </SkillsContainer>
    </NewSkillsWrapper>
  );
};

export default NewSkills;
