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

const Slider = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 20px;
  padding: 10px 0;
`;

const Slide = styled.div`
  flex: 0 0 auto;
  scroll-snap-align: start;
  background-color: rgba(255,215,0,0.05);
  color: #00ffd5;
  padding: 15px 25px;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0,255,213,0.3);
  min-width: 250px;
  font-size: 1.05em;
  white-space: normal;
`;

interface AchievementsProps {
  title: string;
  items: string[];
}

const Achievements: React.FC<AchievementsProps> = ({ title, items }) => {
  return (
    <SectionWrapper
      id="achievements"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <SectionTitle>{title}</SectionTitle>
      <Slider>
        {items.map((item, index) => (
          <Slide key={index}>{item}</Slide>
        ))}
      </Slider>
    </SectionWrapper>
  );
};

export default Achievements;
