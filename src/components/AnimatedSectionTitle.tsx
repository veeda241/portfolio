import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import anime from 'animejs';

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.space[7]};
  position: relative;
`;

const CodeLabel = styled.span`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.85em;
  font-weight: 700;
  color: ${props => props.theme.colors.accent.default};
  letter-spacing: 2px;
  display: block;
  margin-bottom: ${props => props.theme.space[2]};
  text-transform: uppercase;
  opacity: 0;
`;

const MainTitle = styled.h2`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 3.5em;
  font-weight: 900;
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
  overflow: hidden;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 2.5em;
  }
`;

const Letter = styled.span`
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
`;

const DecoLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.space[2]};
  margin-top: ${props => props.theme.space[3]};
  opacity: 0;
`;

const LineSVG = styled.svg`
  width: 100px;
  height: 2px;
  overflow: visible;
`;

const LineDot = styled.div`
  width: 8px;
  height: 8px;
  border: 1px solid ${props => props.theme.colors.accent.default};
  transform: rotate(45deg);
  background: ${props => props.theme.colors.accent.default};
`;

interface AnimatedSectionTitleProps {
    label: string;
    title: string;
}

const AnimatedSectionTitle: React.FC<AnimatedSectionTitleProps> = ({ label, title }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    setIsVisible(true);
                    hasAnimated.current = true;
                }
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible || !containerRef.current) return;

        const tl = anime.timeline({ easing: 'easeOutExpo' });

        // 1. Label slides in
        tl.add({
            targets: containerRef.current.querySelector('.section-label'),
            opacity: [0, 1],
            translateY: [-10, 0],
            duration: 500,
        });

        // 2. Title letters stagger in from below
        tl.add({
            targets: containerRef.current.querySelectorAll('.section-letter'),
            opacity: [0, 1],
            translateY: ['100%', '0%'],
            duration: 700,
            delay: anime.stagger(35),
            easing: 'easeOutBack',
        }, '-=200');

        // 3. Decorative lines draw in
        tl.add({
            targets: containerRef.current.querySelectorAll('.deco-line-path'),
            strokeDashoffset: [anime.setDashoffset, 0],
            duration: 600,
            easing: 'easeInOutQuad',
        }, '-=400');

        // 4. Diamond dot scales in
        tl.add({
            targets: containerRef.current.querySelector('.deco-dot'),
            opacity: [0, 1],
            scale: [0, 1],
            rotate: [0, 45],
            duration: 400,
            easing: 'easeOutBack',
        }, '-=300');

        // 5. Decorative container fades in
        tl.add({
            targets: containerRef.current.querySelector('.deco-container'),
            opacity: [0, 1],
            duration: 400,
        }, '-=600');

    }, [isVisible]);

    const letters = title.split('');

    return (
        <TitleContainer ref={containerRef}>
            <CodeLabel className="section-label">
                ——— {label} ———
            </CodeLabel>
            <MainTitle>
                {letters.map((letter, i) => (
                    <Letter key={i} className="section-letter">
                        {letter === ' ' ? '\u00A0' : letter}
                    </Letter>
                ))}
            </MainTitle>
            <DecoLine className="deco-container">
                <LineSVG viewBox="0 0 80 2">
                    <line
                        className="deco-line-path"
                        x1="0" y1="1" x2="80" y2="1"
                        stroke="rgba(76,161,175,0.3)"
                        strokeWidth="1"
                    />
                </LineSVG>
                <LineDot className="deco-dot" />
                <LineSVG viewBox="0 0 80 2">
                    <line
                        className="deco-line-path"
                        x1="0" y1="1" x2="80" y2="1"
                        stroke="rgba(76,161,175,0.3)"
                        strokeWidth="1"
                    />
                </LineSVG>
            </DecoLine>
        </TitleContainer>
    );
};

export default AnimatedSectionTitle;
