
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

interface AboutProps {
  title: string;
  content: string;
}

const About: React.FC<AboutProps> = ({ title, content }) => {
  return (
    <SectionWrapper id="about">
      <SectionTitle>{title}</SectionTitle>
      <p>{content}</p>
    </SectionWrapper>
  );
};

export default About;
