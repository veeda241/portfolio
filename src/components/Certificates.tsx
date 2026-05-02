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
  padding: ${props => props.theme.space[8]} ${props => props.theme.space[6]};
  background: ${props => props.theme.colors.surface.base};
  color: ${props => props.theme.colors.text.primary};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: ${props => props.theme.space[6]} ${props => props.theme.space[4]};
  }
`;

const CertsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.space[4]};
  max-width: 1200px;
  margin: 0 auto;
`;

const CertCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface.muted};
  border: 1px solid ${props => props.theme.colors.border.default};
  border-radius: ${props => props.theme.radius.md};
  padding: ${props => props.theme.space[6]};
  position: relative;
  overflow: hidden;
  transition: all ${props => props.theme.motion.normal} cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.theme.shadows[2]};

  &:hover {
    border-color: ${props => props.theme.colors.accent.default};
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows[3]};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.space[4]};
`;

const IconCircle = styled.div<{ accentColor: string }>`
  width: 52px;
  height: 52px;
  border-radius: ${props => props.theme.radius.sm};
  background: rgba(194, 164, 255, 0.1);
  border: 1px solid ${props => props.theme.colors.accent.default};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4em;
  color: ${props => props.theme.colors.accent.default};
  transition: all ${props => props.theme.motion.fast} ease;
`;

const TypeBadge = styled.span<{ badgeColor: string }>`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.75em;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  background: rgba(194, 164, 255, 0.08);
  color: ${props => props.theme.colors.accent.default};
  border: 1px solid rgba(194, 164, 255, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CertTitle = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.25em;
  font-weight: 900;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.space[1]};
  line-height: 1.2;
  text-transform: uppercase;
`;

const CertIssuer = styled.span`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.9em;
  font-weight: 700;
  color: ${props => props.theme.colors.text.tertiary};
  display: block;
  margin-bottom: ${props => props.theme.space[2]};
`;

const CertDescription = styled.p`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.95em;
  line-height: 1.6;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.space[3]};
`;

const CertDate = styled.span`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.85em;
  font-weight: 600;
  color: ${props => props.theme.colors.text.inverse};
  display: block;
  margin-top: ${props => props.theme.space[3]};
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
const Certificates: React.FC = () => {
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

  const certs = portfolioData.certificates;

  return (
    <SectionWrapper id="certificates" ref={sectionRef}>
      <AnimatedSectionTitle label="// credentials" title="Certifications" />

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
          {certs.map((_, i) => (
            <circle
              key={i}
              className="timeline-node"
              cx={20 + (560 / (certs.length - 1)) * i}
              cy="12"
              r="0"
              fill={
                typeConfig[_.type]?.color || '#4ca1af'
              }
            />
          ))}
        </TimelineSVG>
      </TimelineBar>

      <CertsGrid>
        {certs.map((cert, index) => {
          const config = typeConfig[cert.type] || typeConfig.certification;
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
                  {iconMap[cert.icon] || <FaCertificate />}
                </IconCircle>
                <TypeBadge badgeColor={config.color}>
                  {config.icon}
                  {config.label}
                </TypeBadge>
              </CardHeader>
              <CertTitle>{cert.title}</CertTitle>
              <CertIssuer>@ {cert.issuer}</CertIssuer>
              {('description' in cert && (cert as any).description) && (
                <CertDescription>{(cert as any).description}</CertDescription>
              )}
              <CertDate>— {cert.date}</CertDate>
            </CertCard>
          );
        })}
      </CertsGrid>
    </SectionWrapper>
  );
};

export default Certificates;
