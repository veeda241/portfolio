import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import anime from 'animejs';

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const glowPulse = keyframes`
  0%, 100% { text-shadow: 0 0 20px rgba(76,161,175,0.2); }
  50% { text-shadow: 0 0 40px rgba(144,238,144,0.3), 0 0 80px rgba(76,161,175,0.1); }
`;

const HeaderWrapper = styled.header`
  text-align: left;
  margin-top: 80px;
`;

const StatusLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  opacity: 0;
`;

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #90ee90;
  box-shadow: 0 0 8px rgba(144,238,144,0.5);
  animation: ${glowPulse} 2s ease-in-out infinite;
`;

const StatusText = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75em;
  color: rgba(76,161,175,0.6);
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Greeting = styled.span`
  font-size: 1.1em;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  display: block;
  margin-bottom: 8px;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  opacity: 0;
`;

const Title = styled.h1`
  font-size: 4.5em;
  font-weight: 800;
  margin: 0;
  line-height: 1.05;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 2.8em;
  }
`;

const TitleLetter = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, #ffffff 0%, #90ee90 50%, #4ca1af 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0;
  transform: translateY(40px);
`;

const TypewriterContainer = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85em;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.7;
  max-width: 480px;
  min-height: 50px;
  opacity: 0;
`;

const TypedText = styled.span`
  color: rgba(255, 255, 255, 0.55);
`;

const CursorBlink = styled.span`
  display: inline-block;
  width: 2px;
  height: 1em;
  background: #90ee90;
  margin-left: 2px;
  animation: ${blink} 0.8s step-end infinite;
  vertical-align: text-bottom;
`;

const RoleTag = styled.span`
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8em;
  padding: 4px 12px;
  background: rgba(76,161,175,0.1);
  border: 1px solid rgba(76,161,175,0.2);
  border-radius: 4px;
  color: #4ca1af;
  margin-top: 12px;
  opacity: 0;
  transform: scale(0.8);
`;

const CTAContainer = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const CTAButton = styled.a`
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9em;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);

  &.primary {
    background: linear-gradient(135deg, #4ca1af, #2e8b57);
    color: white;
    border: none;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, transparent, rgba(255,255,255,0.1));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 25px rgba(76, 161, 175, 0.35);
      &::after { opacity: 1; }
    }
  }

  &.secondary {
    background: transparent;
    color: white;
    border: 1px solid rgba(76,161,175,0.3);

    &:hover {
      border-color: #90ee90;
      color: #90ee90;
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 15px rgba(144,238,144,0.1);
    }
  }
`;

/* Animated SVG underline */
const UnderlineSVG = styled.svg`
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 6px;
  overflow: visible;
`;

const TitleWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Master Anime.js timeline for the header
    const tl = anime.timeline({
      easing: 'easeOutExpo',
    });

    // 1. Status line fades in
    tl.add({
      targets: '.header-status',
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 600,
    });

    // 2. Greeting text fades in
    tl.add({
      targets: '.header-greeting',
      opacity: [0, 1],
      translateY: [15, 0],
      duration: 500,
    }, '-=200');

    // 3. Title letters stagger in with bounce
    tl.add({
      targets: '.title-letter',
      opacity: [0, 1],
      translateY: [40, 0],
      rotateX: [90, 0],
      duration: 800,
      delay: anime.stagger(80, { start: 0 }),
      easing: 'easeOutBack',
    }, '-=200');

    // 4. SVG underline draws in
    tl.add({
      targets: '.title-underline',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1000,
      easing: 'easeInOutQuad',
    }, '-=400');

    // 5. Typewriter container fades in
    tl.add({
      targets: '.header-typewriter',
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 400,
    }, '-=600');

    // 6. Role tag pops in
    tl.add({
      targets: '.header-role',
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 500,
      easing: 'easeOutBack',
    }, '-=200');

    // 7. CTA buttons stagger in
    tl.add({
      targets: '.header-cta',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      delay: anime.stagger(150),
      easing: 'easeOutElastic(1, .6)',
    }, '-=300');

    // Start typewriter after initial animations
    const typewriterDelay = setTimeout(() => {
      let idx = 0;
      const interval = setInterval(() => {
        if (idx <= subtitle.length) {
          setTypedText(subtitle.slice(0, idx));
          idx++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, 22);
      return () => clearInterval(interval);
    }, 1200);

    return () => clearTimeout(typewriterDelay);
  }, [subtitle]);

  const letters = title.split('');

  return (
    <HeaderWrapper ref={headerRef}>
      <StatusLine className="header-status">
        <StatusDot />
        <StatusText>System Online</StatusText>
      </StatusLine>
      <Greeting className="header-greeting">Hey, I'm</Greeting>
      <TitleWrapper>
        <Title>
          {letters.map((letter, i) => (
            <TitleLetter key={i} className="title-letter">
              {letter}
            </TitleLetter>
          ))}
        </Title>
        <UnderlineSVG viewBox="0 0 200 6">
          <path
            className="title-underline"
            ref={underlineRef}
            d="M0 3 Q50 0 100 3 T200 3"
            fill="none"
            stroke="url(#underlineGrad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="underlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#90ee90" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#4ca1af" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#90ee90" stopOpacity="0" />
            </linearGradient>
          </defs>
        </UnderlineSVG>
      </TitleWrapper>
      <TypewriterContainer className="header-typewriter">
        <TypedText>{typedText}</TypedText>
        {isTyping && <CursorBlink />}
      </TypewriterContainer>
      <RoleTag className="header-role">AI Engineer</RoleTag>
      <CTAContainer>
        <CTAButton className="primary header-cta" href="#projects">View Projects</CTAButton>
        <CTAButton className="secondary header-cta" href="#about">About Me</CTAButton>
      </CTAContainer>
    </HeaderWrapper>
  );
};

export default Header;