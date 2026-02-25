import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaLinkedin, FaLink, FaEnvelope, FaPhone, FaFileDownload } from 'react-icons/fa';
import portfolioData from '../portfolioData.json';

const pulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const FooterWrapper = styled.footer`
  background: #040710;
  padding: 64px 40px 32px;
  color: white;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(76, 161, 175, 0.25), transparent);
  }

  @media (max-width: 768px) {
    padding: 40px 20px 24px;
  }
`;

const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h4 {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72em;
    font-weight: 600;
    margin-bottom: 20px;
    color: #4ca1af;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
`;

const FooterLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  margin-bottom: 10px;
  font-size: 0.88em;
  transition: all 0.3s ease;
  padding: 4px 0;

  &:hover {
    color: #90ee90;
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 14px;
  font-size: 0.88em;

  svg {
    color: rgba(76, 161, 175, 0.6);
    font-size: 0.9em;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const QuoteText = styled.p`
  font-style: italic;
  color: rgba(255, 255, 255, 0.3);
  line-height: 1.7;
  font-size: 0.88em;
  border-left: 2px solid rgba(76, 161, 175, 0.2);
  padding-left: 16px;

  @media (max-width: 768px) {
    border-left: none;
    border-top: 2px solid rgba(76, 161, 175, 0.2);
    padding-left: 0;
    padding-top: 16px;
  }
`;

const BottomBar = styled.div`
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
`;

const DesignerText = styled.p`
  color: rgba(255, 255, 255, 0.2);
  font-size: 0.78em;
  margin-bottom: 16px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #90ee90;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;

  a {
    color: rgba(255, 255, 255, 0.3);
    font-size: 1.1em;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.04);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;

    &:hover {
      color: #90ee90;
      border-color: rgba(144,238,144,0.2);
      background: rgba(144, 238, 144, 0.04);
      transform: translateY(-2px);
    }
  }
`;

const socialIconMap: { [key: string]: React.ReactElement } = {
  GitHub: <FaGithub />,
  LinkedIn: <FaLinkedin />,
  LeetCode: <FaLink />,
};

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterSection>
          <h4>{"// navigation"}</h4>
          <FooterLink href="#home">Home</FooterLink>
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#skills">Skills</FooterLink>
          <FooterLink href="#projects">Projects</FooterLink>
          <FooterLink href="#blog">Blog</FooterLink>
          <FooterLink href="Vyas.S Resume.pdf" target="_blank" rel="noopener noreferrer">
            <FaFileDownload /> Resume
          </FooterLink>
        </FooterSection>
        <FooterSection>
          <h4>{"// quote"}</h4>
          <QuoteText>
            "Ambition never is in a greater hurry than I; it merely keeps pace with circumstances and with my general way of thinking."
            <br /><br />— Napoleon Bonaparte
          </QuoteText>
        </FooterSection>
        <FooterSection>
          <h4>{"// contact"}</h4>
          <ContactItem>
            <FaEnvelope />
            <span>{portfolioData.contact.email}</span>
          </ContactItem>
          <ContactItem>
            <FaPhone />
            <span>9445290039</span>
          </ContactItem>
        </FooterSection>
      </FooterContainer>
      <BottomBar>
        <DesignerText>
          <StatusDot /> Designed & Built by Vyas Senthilkumar
        </DesignerText>
        <SocialIcons>
          {portfolioData.contact.social.map((social, index) => (
            <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
              {socialIconMap[social.name]}
            </a>
          ))}
        </SocialIcons>
      </BottomBar>
    </FooterWrapper>
  );
};

export default Footer;
