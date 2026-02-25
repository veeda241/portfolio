import React from 'react';
import styled, { keyframes } from 'styled-components';
import { BsLinkedin, BsGithub, BsInstagram, BsYoutube } from 'react-icons/bs';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const SocialLinksWrapper = styled.div`
  position: fixed;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  z-index: 1000;
  animation: ${fadeIn} 0.6s ease-out 1s both;

  &::before, &::after {
    content: '';
    width: 1px;
    height: 40px;
    background: linear-gradient(180deg, transparent, rgba(76, 161, 175, 0.4), transparent);
  }

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    transform: none;
    flex-direction: row;
    justify-content: center;
    background: rgba(10, 15, 26, 0.95);
    backdrop-filter: blur(12px);
    padding: 12px;
    gap: 20px;
    border-top: 1px solid rgba(76, 161, 175, 0.2);

    &::before, &::after {
      display: none;
    }
  }
`;

const SocialLink = styled.a`
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.1em;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #90ee90;
    background: rgba(144, 238, 144, 0.08);
    transform: scale(1.15);
  }
`;

const SocialLinks: React.FC = () => {
  return (
    <SocialLinksWrapper>
      <SocialLink href="https://www.linkedin.com/in/vyas-s-veeda/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <BsLinkedin />
      </SocialLink>
      <SocialLink href="https://github.com/veeda241" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <BsGithub />
      </SocialLink>
      <SocialLink href="https://www.instagram.com/veeda_2417/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <BsInstagram />
      </SocialLink>
      <SocialLink href="https://www.youtube.com/@vyas_veeda" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
        <BsYoutube />
      </SocialLink>
    </SocialLinksWrapper>
  );
};

export default SocialLinks;
