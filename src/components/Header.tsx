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
  margin-top: ${props => props.theme.space[8]};
`;

const Greeting = styled.span`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.1em;
  font-weight: 600;
  color: ${props => props.theme.colors.accent.default};
  display: block;
  margin-bottom: ${props => props.theme.space[2]};
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 5.5em;
  font-weight: 900;
  margin: 0;
  line-height: 0.9;
  margin-bottom: ${props => props.theme.space[4]};
  color: ${props => props.theme.colors.text.primary};

  @media (max-width: 768px) {
    font-size: 3.2em;
  }
`;

const TitleLetter = styled.span`
  display: inline-block;
  opacity: 0;
  transform: translateY(40px);
`;

const TypewriterContainer = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.1em;
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
  max-width: 550px;
  min-height: 60px;
  opacity: 0;
`;

const TypedText = styled.span`
  color: ${props => props.theme.colors.text.secondary};
`;

const CursorBlink = styled.span`
  display: inline-block;
  width: 3px;
  height: 1.1em;
  background: ${props => props.theme.colors.accent.default};
  margin-left: 4px;
  animation: ${blink} 0.8s step-end infinite;
  vertical-align: text-bottom;
`;

const CTAContainer = styled.div`
  margin-top: ${props => props.theme.space[6]};
  display: flex;
  gap: ${props => props.theme.space[4]};
  flex-wrap: wrap;
`;

const CTAButton = styled.a`
  padding: 14px 32px;
  border-radius: ${props => props.theme.radius.sm};
  font-weight: 700;
  font-size: 0.95em;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all ${props => props.theme.motion.normal} cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);

  &.primary {
    background: ${props => props.theme.colors.accent.default};
    color: ${props => props.theme.colors.surface.base};
    box-shadow: 0 4px 0 0 ${props => props.theme.colors.accent.hover};

    &:hover {
      transform: translateY(-2px);
      background: ${props => props.theme.colors.accent.hover};
      box-shadow: 0 6px 20px ${props => props.theme.colors.accent.default}44;
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 0 0 ${props => props.theme.colors.accent.hover};
    }
  }

  &.secondary {
    background: transparent;
    color: ${props => props.theme.colors.text.primary};
    border: 2px solid ${props => props.theme.colors.border.default};

    &:hover {
      border-color: ${props => props.theme.colors.accent.default};
      color: ${props => props.theme.colors.accent.default};
      transform: translateY(-2px);
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
      <Greeting className="header-greeting">Aspiring AI Engineer</Greeting>
      <TitleWrapper>
        <Title>
          {letters.map((letter, i) => (
            <TitleLetter key={i} className="title-letter">
              {letter}
            </TitleLetter>
          ))}
        </Title>
      </TitleWrapper>
      <TypewriterContainer className="header-typewriter">
        <TypedText>{typedText}</TypedText>
        {isTyping && <CursorBlink />}
      </TypewriterContainer>
      <CTAContainer>
        <CTAButton className="primary header-cta" href="#projects">Explore Work</CTAButton>
        <CTAButton className="secondary header-cta" href="#about">The Story</CTAButton>
      </CTAContainer>
    </HeaderWrapper>
  );
};

export default Header;