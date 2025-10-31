
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaLightbulb, FaDatabase, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import { SiFlask } from 'react-icons/si';
import { GiRobotAntennas } from 'react-icons/gi';
import { RiRobotLine } from 'react-icons/ri';

const SkillsWrapper = styled.section`
  padding: 100px 40px;
  background: linear-gradient(45deg, #4ca1af, #1c3a5e, #2e8b57);
  color: #fff;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 3em;
  font-weight: 700;
  margin-bottom: 60px;
`;

const SkillsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
`;

const SkillCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 40px;
  width: 350px;
  text-align: left;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const SkillIcon = styled.div`
  font-size: 3em;
  margin-bottom: 20px;
`;

const SkillTitle = styled.h2`
  font-size: 1.5em;
  font-weight: 600;
  margin-bottom: 20px;
`;

const SkillDescription = styled.p`
  font-size: 1em;
  line-height: 1.6;
`;

const DescriptionContainer = styled.div`
  text-align: left;
  max-width: 800px;
  margin: 40px auto 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
`;

const skills = [
  
  {
    icon: <FaLightbulb />,
    title: 'Problem Solving',
    description: 'Writing clean and optimized code in Java, Python, and C. Solving challenges on platforms like LeetCode to improve logical thinking and algorithm skills. Helping peers or teams debug and optimize code for better performance.',
    experience: 'Adept at identifying and solving complex problems, with a focus on creating efficient and scalable solutions.',
  },
  {
    icon: <RiRobotLine />,
    title: 'Generative AI with Hugging Face',
    description: 'Experience in building and fine-tuning generative models using Hugging Face.',
    experience: '1 year of experience in building and fine-tuning generative models using Hugging Face.',
  },
  {
    icon: <FaDatabase />,
    title: 'SQL Databases',
    description: 'Wrote efficient SQL queries for data retrieval, aggregation, and reporting. Designed and optimized relational database schemas to support AI and web applications.',
    experience: 'January 2023 - current (2 years 6 months)',
  },
  {
    icon: <GiRobotAntennas />,
    title: 'UiPath',
    description: 'Created automated workflows to reduce manual effort in repetitive business processes. Integrated UiPath bots with external APIs and databases to perform data-driven automation tasks.',
    experience: 'June 2024 - current (2 years 2 months)',
  },
  {
    icon: <FaHtml5 />,
    title: 'HTML',
    description: 'Developed front-end layouts for web applications with clean and accessible HTML structures, ensuring compatibility and responsiveness across devices.',
    experience: 'March 2025 - current (1 year 4 months)',
  },
  {
    icon: <FaCss3Alt />,
    title: 'CSS',
    description: 'Styled and enhanced the visual appeal of web pages using CSS3. Applied modern design principles, flexbox, and grid systems for a better user experience',
    experience: 'March 2025 - current (1 year 4 months)',
  },
  {
    icon: <SiFlask />,
    title: 'Flask',
    description: 'Built and deployed lightweight web applications using Flask. Connected back-end logic with machine learning models and SQL databases to serve dynamic data-driven content.',
    experience: 'October 2024 - current (2 year)',
  },
  {
    icon: <FaJs />,
    title: 'Javascript',
    description: 'Implemented interactive UI components, event handling, and API integration using JavaScript and DOM manipulation to improve client-side functionality.',
    experience: 'March 2025 - current (1 year 4 months)',
  },
];

const Skills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);

  return (
    <SkillsWrapper id="skills">
      <PageTitle>Skills</PageTitle>
      <SkillsContainer>
        {skills.map((skill, index) => (
          <SkillCard key={index} onClick={() => setSelectedSkill(skill)}>
            <SkillIcon>{skill.icon}</SkillIcon>
            <SkillTitle>{skill.title}</SkillTitle>
          </SkillCard>
        ))}
      </SkillsContainer>
      {selectedSkill && (
        <DescriptionContainer>
          <SkillTitle>{selectedSkill.title}</SkillTitle>
          <SkillDescription>{selectedSkill.description}</SkillDescription>
          <SkillDescription><strong>Experience:</strong> {selectedSkill.experience}</SkillDescription>
        </DescriptionContainer>
      )}
    </SkillsWrapper>
  );
};

export default Skills;
