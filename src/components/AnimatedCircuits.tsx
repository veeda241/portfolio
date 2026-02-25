import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import anime from 'animejs';

const SVGContainer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  opacity: 0.35;
`;

const CircuitSVG = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
`;

/* 
  Floating particles that drift around the hero section
  powered by anime.js
*/
const ParticleCanvas = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
`;



const AnimatedCircuits: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        // Animate the circuit paths drawing in
        const paths = svgRef.current.querySelectorAll('.circuit-path');
        anime({
            targets: paths,
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 3000,
            delay: anime.stagger(400, { start: 500 }),
            loop: false,
        });

        // Animate the circuit nodes pulsing
        const nodes = svgRef.current.querySelectorAll('.circuit-node');
        anime({
            targets: nodes,
            r: [0, 3],
            opacity: [0, 1],
            easing: 'easeOutElastic(1, .5)',
            duration: 800,
            delay: anime.stagger(200, { start: 2000 }),
        });

        // Gentle breathing animation for nodes
        anime({
            targets: nodes,
            opacity: [0.4, 1],
            easing: 'easeInOutSine',
            duration: 2000,
            delay: anime.stagger(300, { start: 3000 }),
            direction: 'alternate',
            loop: true,
        });

        // Floating particles
        if (containerRef.current) {
            const particlesContainer = containerRef.current.querySelector('.particles-container');
            if (particlesContainer) {
                for (let i = 0; i < 15; i++) {
                    const particle = document.createElement('div');
                    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(76, 161, 175, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
          `;
                    particlesContainer.appendChild(particle);

                    anime({
                        targets: particle,
                        translateX: () => anime.random(-60, 60),
                        translateY: () => anime.random(-60, 60),
                        opacity: [
                            { value: 0, duration: 0 },
                            { value: Math.random() * 0.4 + 0.1, duration: 1500 },
                            { value: 0, duration: 1500 },
                        ],
                        easing: 'easeInOutSine',
                        duration: anime.random(4000, 7000),
                        delay: anime.random(0, 3000),
                        loop: true,
                        direction: 'alternate',
                    });
                }
            }
        }
    }, []);

    return (
        <SVGContainer ref={containerRef}>
            <CircuitSVG ref={svgRef} viewBox="0 0 600 800" preserveAspectRatio="none">
                {/* Horizontal circuit lines */}
                <path
                    className="circuit-path"
                    d="M0 150 L120 150 L140 170 L250 170"
                    fill="none"
                    stroke="rgba(76,161,175,0.3)"
                    strokeWidth="0.8"
                />
                <path
                    className="circuit-path"
                    d="M600 250 L450 250 L430 270 L350 270"
                    fill="none"
                    stroke="rgba(144,238,144,0.2)"
                    strokeWidth="0.8"
                />
                <path
                    className="circuit-path"
                    d="M0 400 L80 400 L100 380 L200 380 L220 400 L320 400"
                    fill="none"
                    stroke="rgba(76,161,175,0.25)"
                    strokeWidth="0.8"
                />
                <path
                    className="circuit-path"
                    d="M600 550 L500 550 L480 530 L380 530"
                    fill="none"
                    stroke="rgba(144,238,144,0.15)"
                    strokeWidth="0.8"
                />
                <path
                    className="circuit-path"
                    d="M0 650 L150 650 L170 630 L280 630"
                    fill="none"
                    stroke="rgba(76,161,175,0.2)"
                    strokeWidth="0.8"
                />

                {/* Vertical connector lines */}
                <path
                    className="circuit-path"
                    d="M250 170 L250 250 L270 270"
                    fill="none"
                    stroke="rgba(76,161,175,0.2)"
                    strokeWidth="0.6"
                />
                <path
                    className="circuit-path"
                    d="M350 270 L350 380"
                    fill="none"
                    stroke="rgba(144,238,144,0.15)"
                    strokeWidth="0.6"
                />

                {/* Circuit nodes (junction points) */}
                <circle className="circuit-node" cx="120" cy="150" r="0" fill="#4ca1af" />
                <circle className="circuit-node" cx="250" cy="170" r="0" fill="#90ee90" />
                <circle className="circuit-node" cx="450" cy="250" r="0" fill="#4ca1af" />
                <circle className="circuit-node" cx="350" cy="270" r="0" fill="#90ee90" />
                <circle className="circuit-node" cx="200" cy="380" r="0" fill="#4ca1af" />
                <circle className="circuit-node" cx="320" cy="400" r="0" fill="#90ee90" />
                <circle className="circuit-node" cx="500" cy="550" r="0" fill="#4ca1af" />
                <circle className="circuit-node" cx="150" cy="650" r="0" fill="#90ee90" />
                <circle className="circuit-node" cx="280" cy="630" r="0" fill="#4ca1af" />
            </CircuitSVG>
            <ParticleCanvas className="particles-container" />
        </SVGContainer>
    );
};

export default AnimatedCircuits;
