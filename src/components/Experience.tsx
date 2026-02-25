import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import anime from 'animejs';
import {
  FaGoogle,
  FaChartBar,
  FaRobot,
  FaBriefcase,
  FaDatabase,
  FaUsers,
  FaBrain,
  FaCertificate,
  FaTrophy,
  FaStar,
  FaPython,
} from 'react-icons/fa';
import AnimatedSectionTitle from './AnimatedSectionTitle';
import portfolioData from '../portfolioData.json';

/* ── Icon map ── */
const iconMap: { [key: string]: React.ReactElement } = {
  google: <FaGoogle />,
  analytics: <FaChartBar />,
  ai: <FaBrain />,
  data: <FaDatabase />,
  work: <FaBriefcase />,
  robot: <FaRobot />,
  community: <FaUsers />,
  python: <FaPython />,
};

/* ── Type badge config ── */
const typeConfig: { [key: string]: { label: string; color: string; icon: React.ReactElement } } = {
  certification: { label: 'Certification', color: '#4ca1af', icon: <FaCertificate /> },
  achievement: { label: 'Achievement', color: '#90ee90', icon: <FaTrophy /> },
  experience: { label: 'Experience', color: '#f0c674', icon: <FaStar /> },
};

/* ── Styled Components ── */
const SectionWrapper = styled.section`
  padding: 100px 40px;
  background: #060a12;
  color: white;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const CertsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const CertCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.015);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 14px;
  padding: 28px 24px;
  position: relative;
  overflow: hidden;
  cursor: default;

  /* Gradient border reveal on hover */
  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 14px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(76,161,175,0.25), transparent 50%, rgba(144,238,144,0.25));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  /* Sweep light */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(76,161,175,0.04), transparent);
    transition: left 0.6s ease;
  }

  &:hover::after {
    left: 100%;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const IconCircle = styled.div<{ accentColor: string }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${(p) => p.accentColor}12;
  border: 1px solid ${(p) => p.accentColor}25;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15em;
  color: ${(p) => p.accentColor};
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  ${CertCard}:hover & {
    transform: scale(1.08);
    box-shadow: 0 0 20px ${(p) => p.accentColor}20;
  }
`;

const TypeBadge = styled.span<{ badgeColor: string }>`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6em;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  background: ${(p) => p.badgeColor}10;
  color: ${(p) => p.badgeColor};
  border: 1px solid ${(p) => p.badgeColor}20;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  z-index: 1;
`;

const CertTitle = styled.h3`
  font-size: 1.05em;
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
  line-height: 1.35;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;

  ${CertCard}:hover & {
    color: #90ee90;
  }
`;

const CertIssuer = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72em;
  color: rgba(76, 161, 175, 0.7);
  display: block;
  margin-bottom: 8px;
  position: relative;
  z-index: 1;
`;

const CertDescription = styled.p`
  font-size: 0.78em;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.38);
  margin-bottom: 0;
  position: relative;
  z-index: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CertDate = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62em;
  color: rgba(255, 255, 255, 0.22);
  position: relative;
  z-index: 1;
  display: block;
  margin-top: 12px;
  letter-spacing: 1px;
`;

/* Horizontal timeline connector */
const TimelineBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  max-width: 600px;
  margin: 0 auto 48px;
  position: relative;
`;

const TimelineSVG = styled.svg`
  width: 100%;
  height: 24px;
  overflow: visible;
`;

/* ── Component ── */
const Experience: React.FC = () => {
  const timelineRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!timelineRef.current || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Draw the timeline path
          const paths = timelineRef.current?.querySelectorAll('.timeline-path');
          if (paths) {
            anime({
              targets: paths,
              strokeDashoffset: [anime.setDashoffset, 0],
              easing: 'easeInOutQuad',
              duration: 1500,
              delay: 400,
            });
          }

          // Pop in timeline nodes
          const nodes = timelineRef.current?.querySelectorAll('.timeline-node');
          if (nodes) {
            anime({
              targets: nodes,
              r: [0, 4],
              opacity: [0, 1],
              easing: 'easeOutBack',
              duration: 600,
              delay: anime.stagger(120, { start: 800 }),
            });
          }

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const items = portfolioData.experience;

  return (
    <SectionWrapper id="experience" ref={sectionRef}>
      <AnimatedSectionTitle label="// work_history" title="Experience" />

      {/* Timeline visualization */}
      <TimelineBar>
        <TimelineSVG ref={timelineRef} viewBox="0 0 600 24">
          <line
            className="timeline-path"
            x1="20"
            y1="12"
            x2="580"
            y2="12"
            stroke="rgba(76,161,175,0.2)"
            strokeWidth="1"
          />
          {items.map((_, i) => (
            <circle
              key={i}
              className="timeline-node"
              cx={20 + (items.length > 1 ? (560 / (items.length - 1)) * i : 280)}
              cy="12"
              r="0"
              fill={
                typeConfig[_.type]?.color || '#f0c674'
              }
            />
          ))}
        </TimelineSVG>
      </TimelineBar>

      <CertsGrid>
        {items.map((item, index) => {
          const config = typeConfig[item.type] || typeConfig.experience;
          return (
            <CertCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
            >
              <CardHeader>
                <IconCircle accentColor={config.color}>
                  {iconMap[item.icon] || <FaStar />}
                </IconCircle>
                <TypeBadge badgeColor={config.color}>
                  {config.icon}
                  {config.label}
                </TypeBadge>
              </CardHeader>
              <CertTitle>{item.title}</CertTitle>
              <CertIssuer>@ {item.issuer}</CertIssuer>
              {('description' in item && (item as any).description) && (
                <CertDescription>{(item as any).description}</CertDescription>
              )}
              <CertDate>— {item.date}</CertDate>
            </CertCard>
          );
        })}
      </CertsGrid>
    </SectionWrapper>
  );
};

export default Experience;
