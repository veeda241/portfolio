import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import portfolioData from '../portfolioData.json';
import profileImage from '../assets/profile.png';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import AnimatedSectionTitle from './AnimatedSectionTitle';
import anime from 'animejs';



const glowRing = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(76,161,175,0.15), inset 0 0 20px rgba(76,161,175,0.05); }
  50% { box-shadow: 0 0 40px rgba(144,238,144,0.25), inset 0 0 30px rgba(144,238,144,0.08); }
`;

const AboutSectionWrapper = styled.section`
  padding: ${props => props.theme.space[8]} ${props => props.theme.space[6]};
  background: ${props => props.theme.colors.surface.base};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: ${props => props.theme.space[6]} ${props => props.theme.space[4]};
  }
`;

const AboutCard = styled(motion.div)`
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.surface.muted};
  border-radius: ${props => props.theme.radius.md};
  padding: ${props => props.theme.space[7]};
  max-width: 1000px;
  border: 1px solid ${props => props.theme.colors.border.default};
  text-align: left;
  position: relative;
  box-shadow: ${props => props.theme.shadows[3]};

  @media (max-width: 768px) {
    flex-direction: column;
    padding: ${props => props.theme.space[6]};
    text-align: center;
  }
`;

const ImageWrapper = styled.div`
  flex: 0 0 240px;
  height: 240px;
  border-radius: ${props => props.theme.radius.md};
  overflow: hidden;
  margin-right: ${props => props.theme.space[6]};
  border: 1px solid ${props => props.theme.colors.border.default};
  position: relative;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: ${props => props.theme.space[4]};
    flex: 0 0 200px;
    height: 200px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextContent = styled.div`
  h2 {
    font-family: ${props => props.theme.fonts.primary};
    font-size: 2.5em;
    margin-top: 0;
    margin-bottom: ${props => props.theme.space[3]};
    color: ${props => props.theme.colors.text.primary};
  }
  p {
    font-family: ${props => props.theme.fonts.secondary};
    font-size: 1.05em;
    line-height: 1.8;
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const RoleLabel = styled.span`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.85em;
  font-weight: 700;
  color: ${props => props.theme.colors.accent.default};
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: ${props => props.theme.space[2]};
  display: block;
`;

const SocialLinksRow = styled.div`
  margin-top: ${props => props.theme.space[4]};
  display: flex;
  gap: ${props => props.theme.space[3]};

  @media (max-width: 768px) {
    justify-content: center;
  }

  a {
    color: ${props => props.theme.colors.text.secondary};
    font-size: 1.4em;
    padding: ${props => props.theme.space[2]};
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

const BioStats = styled.div`
  display: flex;
  gap: ${props => props.theme.space[6]};
  margin-top: ${props => props.theme.space[4]};
  padding-top: ${props => props.theme.space[4]};
  border-top: 1px solid ${props => props.theme.colors.border.default};

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: ${props => props.theme.space[4]};
  }
`;

const StatItem = styled.div`
  text-align: left;
`;

const StatValue = styled.div`
  font-size: 2em;
  font-weight: 900;
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.fonts.primary};
`;

const StatLabel = styled.div`
  font-size: 0.8em;
  font-weight: 700;
  color: ${props => props.theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const AboutSection: React.FC = () => {
  const { header, about, contact } = portfolioData;
  const statsRef = useRef<HTMLDivElement>(null);
  const hasCountedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasCountedRef.current) {
          hasCountedRef.current = true;
          // Animate stat values counting up
          const statElements = statsRef.current?.querySelectorAll('.stat-value');
          if (statElements) {
            statElements.forEach((el) => {
              const target = parseInt(el.getAttribute('data-target') || '0');
              const obj = { value: 0 };
              anime({
                targets: obj,
                value: target,
                round: 1,
                easing: 'easeOutExpo',
                duration: 2000,
                update: () => {
                  el.textContent = obj.value + (el.getAttribute('data-suffix') || '');
                },
              });
            });
          }
        }
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <AboutSectionWrapper>
      <AnimatedSectionTitle label="// about_me" title="About" />
      <AboutCard
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <ImageWrapper>
          <ProfileImage src={profileImage} alt="Vyas" />
        </ImageWrapper>
        <TextContent>
          <RoleLabel>AI/ML Engineer & Full-Stack Developer</RoleLabel>
          <h2>{header.title}</h2>
          <p>{about.content}</p>
          <BioStats ref={statsRef}>
            <StatItem>
              <StatValue className="stat-value" data-target="56" data-suffix="+">0</StatValue>
              <StatLabel>Repositories</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue className="stat-value" data-target="10" data-suffix="+">0</StatValue>
              <StatLabel>Certifications</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue className="stat-value" data-target="3" data-suffix="">0</StatValue>
              <StatLabel>Internships</StatLabel>
            </StatItem>
          </BioStats>
          <SocialLinksRow>
            {contact.social.map(social => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
                {social.name === 'GitHub' && <BsGithub />}
                {social.name === 'LinkedIn' && <BsLinkedin />}
              </a>
            ))}
          </SocialLinksRow>
        </TextContent>
      </AboutCard>
    </AboutSectionWrapper>
  );
};

export default AboutSection;