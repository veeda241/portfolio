import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaLinkedin, FaLink, FaEnvelope, FaPhone, FaFileDownload } from 'react-icons/fa';
import portfolioData from '../portfolioData.json';

const pulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const FooterWrapper = styled.footer`
  background: ${props => props.theme.colors.surface.muted};
  padding: ${props => props.theme.space[8]} ${props => props.theme.space[6]} ${props => props.theme.space[6]};
  color: ${props => props.theme.colors.text.primary};
  position: relative;
  border-top: 1px solid ${props => props.theme.colors.border.default};

  @media (max-width: 768px) {
    padding: ${props => props.theme.space[6]} ${props => props.theme.space[4]};
  }
`;

const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.space[6]};
  max-width: 1200px;
  margin: 0 auto ${props => props.theme.space[6]};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.space[5]};
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h4 {
    font-family: ${props => props.theme.fonts.primary};
    font-size: 0.85em;
    font-weight: 700;
    margin-bottom: ${props => props.theme.space[4]};
    color: ${props => props.theme.colors.accent.default};
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

const FooterLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space[2]};
  color: ${props => props.theme.colors.text.secondary};
  text-decoration: none;
  margin-bottom: ${props => props.theme.space[2]};
  font-size: 0.95em;
  font-weight: 600;
  transition: all ${props => props.theme.motion.fast} ease;

  &:hover {
    color: ${props => props.theme.colors.accent.default};
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space[3]};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.space[3]};
  font-size: 0.95em;
  font-weight: 600;

  svg {
    color: ${props => props.theme.colors.accent.default};
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const QuoteText = styled.p`
  font-family: ${props => props.theme.fonts.secondary};
  font-style: italic;
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.7;
  font-size: 0.9em;
  border-left: 2px solid ${props => props.theme.colors.accent.default};
  padding-left: ${props => props.theme.space[4]};

  @media (max-width: 768px) {
    border-left: none;
    border-top: 2px solid ${props => props.theme.colors.accent.default};
    padding-left: 0;
    padding-top: ${props => props.theme.space[4]};
  }
`;

const BottomBar = styled.div`
  text-align: center;
  padding-top: ${props => props.theme.space[4]};
  border-top: 1px solid ${props => props.theme.colors.border.default};
`;

const DesignerText = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.85em;
  font-weight: 700;
  margin-bottom: ${props => props.theme.space[3]};
  font-family: ${props => props.theme.fonts.secondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.space[3]};

  a {
    color: ${props => props.theme.colors.text.secondary};
    font-size: 1.2em;
    padding: 10px;
    border-radius: ${props => props.theme.radius.sm};
    border: 1px solid ${props => props.theme.colors.border.default};
    transition: all ${props => props.theme.motion.fast} ease;
    display: flex;
    align-items: center;

    &:hover {
      color: ${props => props.theme.colors.accent.default};
      border-color: ${props => props.theme.colors.accent.default};
      background: rgba(194, 164, 255, 0.05);
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
          Designed & Built by Vyas Senthilkumar
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
