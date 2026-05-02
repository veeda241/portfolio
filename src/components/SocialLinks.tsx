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
  gap: ${props => props.theme.space[1]};
  z-index: 1000;
  animation: ${fadeIn} 0.6s ease-out 1s both;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    transform: none;
    flex-direction: row;
    justify-content: center;
    background: ${props => props.theme.colors.surface.muted};
    backdrop-filter: blur(12px);
    padding: ${props => props.theme.space[3]};
    gap: ${props => props.theme.space[5]};
    border-top: 1px solid ${props => props.theme.colors.border.default};
  }
`;

const SocialLink = styled.a`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.2em;
  padding: 10px;
  border-radius: ${props => props.theme.radius.sm};
  transition: all ${props => props.theme.motion.normal} ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.colors.accent.default};
    background: rgba(194, 164, 255, 0.08);
    transform: scale(1.2);
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
