
import React from 'react';
import styled from 'styled-components';
import { BsLinkedin, BsGithub, BsInstagram, BsYoutube } from 'react-icons/bs';

const SocialLinksWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 15px 10px;
  border-radius: 10px 0 0 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.5em;
  margin: 10px 0;
  transition: color 0.3s ease;

  &:hover {
color: #90ee90;
  }
`;

const SocialLinks: React.FC = () => {
  return (
    <SocialLinksWrapper>
      <SocialLink href="https://www.linkedin.com/in/vyas-s-veeda/" target="_blank" rel="noopener noreferrer">
        <BsLinkedin />
      </SocialLink>
      <SocialLink href="https://github.com/veeda241" target="_blank" rel="noopener noreferrer">
        <BsGithub />
      </SocialLink>
      <SocialLink href="https://www.instagram.com/veeda_2417/" target="_blank" rel="noopener noreferrer">
        <BsInstagram />
      </SocialLink>
      <SocialLink href="https://www.youtube.com/@vyas_veeda" target="_blank" rel="noopener noreferrer">
        <BsYoutube />
      </SocialLink>
    </SocialLinksWrapper>
  );
};

export default SocialLinks;
