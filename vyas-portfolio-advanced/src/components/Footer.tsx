
import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaInstagram, FaLink } from 'react-icons/fa';
import portfolioData from '../portfolioData.json';

const FooterWrapper = styled.footer`
  background-color: #f8f9fa;
  padding: 40px 0;
  text-align: center;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const FooterSection = styled.div`
  margin: 20px;
`;

const FooterLink = styled.a`
  display: block;
  color: #343a40;
  text-decoration: none;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  margin-top: 20px;
  a {
    font-size: 24px;
    margin: 0 10px;
    color: #343a40;
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
          <h4>Navigation</h4>
          <FooterLink href="#home">Home</FooterLink>
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#skills">Skills</FooterLink>
          <FooterLink href="#blog">Blogs</FooterLink>
          <FooterLink href="#projects">Project</FooterLink>
          <FooterLink href="#">Resume</FooterLink>
        </FooterSection>
        <FooterSection>
          <h4>Quote</h4>
          <p>“Ambition never is in a greater hurry than I; it merely keeps pace with circumstances and with my general way of thinking.” - Napoleon Bonaparte</p>
        </FooterSection>
        <FooterSection>
          <h4>Contact</h4>
          <p>Vyas</p>
          <p>Vyas.sk17@gmail.com</p>
          <p>9445290039</p>
        </FooterSection>
      </FooterContainer>
      <div>
        <p>Designed By Vyas Senthilkumar</p>
        <SocialIcons>
          {portfolioData.contact.social.map((social, index) => (
            <a key={index} href={social.url} target="_blank" rel="noopener noreferrer">
              {socialIconMap[social.name]}
            </a>
          ))}
        </SocialIcons>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
