import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionWrapper = styled(motion.section)`
  background-color: rgba(0,0,0,0.6);
  border-radius: 12px;
  padding: 40px;
  margin: 30px auto;
  max-width: 800px;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
`;

const SectionTitle = styled.h2`
  font-size: 2.2em;
  margin-bottom: 15px;
  text-transform: uppercase;
  border-bottom: 1px solid #aaa;
  padding-bottom: 5px;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 20px;
`;

const ListItem = styled.li`
  font-size: 1.1em;
  line-height: 1.6;
  position: relative;
  padding-left: 20px;
  transition: transform 0.3s ease, color 0.3s ease;

  &::before {
    content: "▸";
    position: absolute;
    left: 0;
    color: #ffd700;
  }

  &:hover {
    transform: scale(1.05);
    color: #00ffd5;
  }
`;

interface SkillsProps {
  title: string;
  items: string[];
}

const Skills: React.FC<SkillsProps> = ({ title, items }) => {
  return (
    <SectionWrapper
      id="skills"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <SectionTitle>{title}</SectionTitle>
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </List>
    </SectionWrapper>
  );
};

export default Skills;
