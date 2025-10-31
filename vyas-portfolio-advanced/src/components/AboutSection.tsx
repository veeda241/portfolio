import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import portfolioData from '../portfolioData.json';
import profileImage from '../assets/profile.png';
import { BsGithub, BsLinkedin } from 'react-icons/bs';

const AboutSectionWrapper = styled.section`
  padding: 100px 40px;
  background: linear-gradient(45deg, #4ca1af, #1c3a5e, #2e8b57);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 4em;
  font-weight: 700;
  margin-bottom: 40px;
`;

const AboutCard = styled(motion.div)`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  max-width: 900px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: left;
`;

const ImageWrapper = styled.div`
  flex: 0 0 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 40px;
  border: 5px solid white;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextContent = styled.div`
  h2 {
    font-size: 2.5em;
    margin-top: 0;
    margin-bottom: 20px;
  }
  p {
    font-size: 1.1em;
    line-height: 1.6;
  }
`;

const SocialLinks = styled.div`
  margin-top: 20px;
  a {
    color: white;
    font-size: 1.8em;
    margin-right: 20px;
    transition: color 0.3s ease;
    &:hover {
      color: #90ee90;
    }
  }
`;

const AboutSection: React.FC = () => {
  const { header, about, contact } = portfolioData;

  return (
    <AboutSectionWrapper>
      <PageTitle>About</PageTitle>
      <AboutCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      >
        <ImageWrapper>
          <ProfileImage src={profileImage} alt="Vyas" />
        </ImageWrapper>
        <TextContent>
          <h2>{header.title}</h2>
          <p>{about.content}</p>
          <SocialLinks>
            {contact.social.map(social => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
                {social.name === 'GitHub' && <BsGithub />}
                {social.name === 'LinkedIn' && <BsLinkedin />}
              </a>
            ))}
          </SocialLinks>
        </TextContent>
      </AboutCard>
    </AboutSectionWrapper>
  );
};

export default AboutSection;