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
  padding: 100px 40px;
  background: #060a12;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;



const AboutCard = styled(motion.div)`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 48px;
  max-width: 900px;
  border: 1px solid rgba(76, 161, 175, 0.1);
  text-align: left;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(76,161,175,0.2), transparent, rgba(144,238,144,0.2));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 32px 24px;
    text-align: center;
  }
`;

const ImageWrapper = styled.div`
  flex: 0 0 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 40px;
  border: 2px solid rgba(76, 161, 175, 0.3);
  animation: ${glowRing} 3s ease-in-out infinite;
  position: relative;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 24px;
    flex: 0 0 160px;
    height: 160px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextContent = styled.div`
  h2 {
    font-size: 2em;
    margin-top: 0;
    margin-bottom: 8px;
    font-weight: 700;
    color: white;
  }
  p {
    font-size: 0.95em;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.55);
  }
`;

const RoleLabel = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7em;
  color: #4ca1af;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 12px;
  display: block;
`;

const SocialLinksRow = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    justify-content: center;
  }

  a {
    color: rgba(255, 255, 255, 0.4);
    font-size: 1.2em;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid rgba(76,161,175,0.1);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;

    &:hover {
      color: #90ee90;
      border-color: rgba(144,238,144,0.3);
      background: rgba(144, 238, 144, 0.05);
      transform: translateY(-2px);
    }
  }
`;

const BioStats = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(76,161,175,0.1);

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5em;
  font-weight: 700;
  color: #90ee90;
  font-family: 'JetBrains Mono', monospace;
`;

const StatLabel = styled.div`
  font-size: 0.7em;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 4px;
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
          <RoleLabel>AI Engineer & Developer</RoleLabel>
          <h2>{header.title}</h2>
          <p>{about.content}</p>
          <BioStats ref={statsRef}>
            <StatItem>
              <StatValue className="stat-value" data-target="10" data-suffix="+">0</StatValue>
              <StatLabel>Projects</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue className="stat-value" data-target="3" data-suffix="+">0</StatValue>
              <StatLabel>Certifications</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue className="stat-value" data-target="1" data-suffix="yr">0</StatValue>
              <StatLabel>AI/ML Exp</StatLabel>
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