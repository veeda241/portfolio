import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';

/* ─── keyframes ─── */
const scanLine = keyframes`
  0% { top: -2px; }
  100% { top: 100%; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const glitch = keyframes`
  0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 2px); }
  20% { clip-path: inset(92% 0 1% 0); transform: translate(1px, -1px); }
  40% { clip-path: inset(43% 0 1% 0); transform: translate(-1px, 3px); }
  60% { clip-path: inset(25% 0 58% 0); transform: translate(3px, 1px); }
  80% { clip-path: inset(54% 0 7% 0); transform: translate(-3px, -2px); }
  100% { clip-path: inset(58% 0 43% 0); transform: translate(2px, -3px); }
`;

const dataFlow = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 0% 100%; }
`;



const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const rotate360 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const nodeGlow = keyframes`
  0%, 100% { box-shadow: 0 0 4px rgba(76,161,175,0.3); }
  50% { box-shadow: 0 0 16px rgba(144,238,144,0.8); }
`;

/* ─── styled components ─── */
const LoadingWrapper = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${props => props.theme.colors.surface.base};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
  font-family: ${props => props.theme.fonts.secondary};
`;

const GridOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(194, 164, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(194, 164, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
`;

const ScanLineOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${props => props.theme.colors.accent.default}, transparent);
    animation: ${scanLine} 4s linear infinite;
    opacity: 0.2;
  }
`;

const DataRain = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    ${props => props.theme.colors.accent.default} 2px,
    ${props => props.theme.colors.accent.default} 4px
  );
  background-size: 20px 20px;
  animation: ${dataFlow} 8s linear infinite;
  pointer-events: none;
`;

/* ─── neural network viz ─── */
const NeuralNetContainer = styled.div`
  position: relative;
  width: 400px;
  height: 250px;
  margin-bottom: ${props => props.theme.space[6]};
`;

const NeuralNode = styled.div<{ x: number; y: number; delay: number; active: boolean }>`
  position: absolute;
  left: ${p => p.x}px;
  top: ${p => p.y}px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${p => p.active ? p.theme.colors.accent.default : 'rgba(194, 164, 255, 0.2)'};
  transition: all 0.4s ease;
  animation: ${p => p.active ? css`${nodeGlow} 1.5s ease-in-out infinite` : 'none'};
  animation-delay: ${p => p.delay}s;
`;

const NeuralConnection = styled.line<{ active: boolean }>`
  stroke: ${p => p.active ? p.theme.colors.accent.default : 'rgba(194, 164, 255, 0.05)'};
  stroke-width: ${p => p.active ? 2 : 1};
  opacity: ${p => p.active ? 0.6 : 0.2};
  transition: all 0.5s ease;
`;

const NeuralSVG = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

/* ─── core title ─── */
const CoreTitle = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.space[6]};
  position: relative;
`;

const NovaText = styled.h1`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 5em;
  font-weight: 900;
  letter-spacing: 15px;
  margin: 0;
  color: ${props => props.theme.colors.text.primary};
  text-transform: uppercase;
`;

const SubText = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.85em;
  font-weight: 700;
  letter-spacing: 4px;
  color: ${props => props.theme.colors.accent.default};
  margin-top: ${props => props.theme.space[1]};
  text-transform: uppercase;
`;

/* ─── terminal ─── */
const TerminalContainer = styled.div`
  width: 600px;
  max-width: 90vw;
  background: ${props => props.theme.colors.surface.muted};
  border: 1px solid ${props => props.theme.colors.border.default};
  border-radius: ${props => props.theme.radius.md};
  overflow: hidden;
  margin-bottom: ${props => props.theme.space[6]};
  box-shadow: ${props => props.theme.shadows[3]};
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid ${props => props.theme.colors.border.default};
`;

const TerminalDot = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${p => p.color};
`;

const TerminalTitle = styled.span`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.75em;
  font-weight: 700;
  color: ${props => props.theme.colors.text.tertiary};
  margin-left: 8px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const TerminalBody = styled.div`
  padding: 20px;
  max-height: 200px;
  overflow: hidden;
`;

const TerminalLine = styled.div<{ type?: string }>`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85em;
  line-height: 1.8;
  animation: ${fadeInUp} 0.3s ease-out both;
  color: ${p => {
    switch (p.type) {
      case 'success': return p.theme.colors.accent.default;
      case 'warning': return '#ffd700';
      case 'info': return p.theme.colors.text.tertiary;
      case 'system': return p.theme.colors.text.inverse;
      default: return p.theme.colors.text.secondary;
    }
  }};
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 16px;
  background: ${props => props.theme.colors.accent.default};
  margin-left: 2px;
  animation: ${blink} 0.8s step-end infinite;
  vertical-align: middle;
`;

/* ─── progress ─── */
const ProgressContainer = styled.div`
  width: 600px;
  max-width: 90vw;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.8em;
  font-weight: 700;
  color: ${props => props.theme.colors.text.tertiary};
  margin-bottom: ${props => props.theme.space[2]};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProgressBarOuter = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressBarInner = styled.div<{ width: number }>`
  height: 100%;
  width: ${p => p.width}%;
  background: ${props => props.theme.colors.accent.default};
  border-radius: 2px;
  transition: width 0.1s linear;
  box-shadow: 0 0 15px ${props => props.theme.colors.accent.default};
`;

/* ─── hexagonal spinner ─── */
const HexSpinner = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 40px;
  height: 40px;
  border: 2px solid ${props => props.theme.colors.border.default};
  border-top-color: ${props => props.theme.colors.accent.default};
  border-radius: 50%;
  animation: ${rotate360} 2s linear infinite;
`;

/* ─── status indicators ─── */
const StatusRow = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 16px;
  font-size: 0.6em;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const StatusItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${p => p.active ? '#90ee90' : 'rgba(76,161,175,0.3)'};
  transition: color 0.3s ease;
`;

const StatusDot = styled.div<{ active: boolean }>`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${p => p.active ? '#90ee90' : 'rgba(76,161,175,0.2)'};
  animation: ${p => p.active ? css`${pulse} 1.5s ease-in-out infinite` : 'none'};
`;

/* ─── corner decorations ─── */
const CornerDecor = styled.div<{ position: string }>`
  position: absolute;
  width: 60px;
  height: 60px;
  ${p => {
    switch (p.position) {
      case 'tl': return 'top: 20px; left: 20px; border-top: 1px solid rgba(76,161,175,0.2); border-left: 1px solid rgba(76,161,175,0.2);';
      case 'tr': return 'top: 20px; right: 20px; border-top: 1px solid rgba(76,161,175,0.2); border-right: 1px solid rgba(76,161,175,0.2);';
      case 'bl': return 'bottom: 20px; left: 20px; border-bottom: 1px solid rgba(76,161,175,0.2); border-left: 1px solid rgba(76,161,175,0.2);';
      case 'br': return 'bottom: 20px; right: 20px; border-bottom: 1px solid rgba(76,161,175,0.2); border-right: 1px solid rgba(76,161,175,0.2);';
      default: return '';
    }
  }}
`;

/* ─── neural network layer definitions ─── */
const LAYERS = [
  { count: 3, x: 40 },
  { count: 5, x: 120 },
  { count: 4, x: 200 },
  { count: 3, x: 280 },
];

function generateNodes() {
  const nodes: { x: number; y: number; layer: number; idx: number }[] = [];
  LAYERS.forEach((layer, li) => {
    const gap = 180 / (layer.count + 1);
    for (let i = 0; i < layer.count; i++) {
      nodes.push({ x: layer.x, y: gap * (i + 1), layer: li, idx: nodes.length });
    }
  });
  return nodes;
}

function generateConnections(nodes: ReturnType<typeof generateNodes>) {
  const conns: { from: number; to: number }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[j].layer === nodes[i].layer + 1) {
        conns.push({ from: i, to: j });
      }
    }
  }
  return conns;
}

const NODES = generateNodes();
const CONNECTIONS = generateConnections(NODES);

/* ─── boot sequence lines ─── */
const BOOT_SEQUENCE = [
  { text: 'nova --init-system', type: 'system', delay: 200 },
  { text: 'NOVA AI System v4.2.1', type: 'info', delay: 400 },
  { text: 'Initializing neural core...', type: 'default', delay: 600 },
  { text: 'Loading language models [LLM-7B]', type: 'default', delay: 900 },
  { text: 'Hugging Face pipeline connected', type: 'success', delay: 1200 },
  { text: 'NLP engine calibrated', type: 'success', delay: 1500 },
  { text: 'Emotion detection module: ACTIVE', type: 'success', delay: 1800 },
  { text: 'Voice synthesis: STANDBY', type: 'warning', delay: 2100 },
  { text: 'Loading portfolio data...', type: 'default', delay: 2400 },
  { text: 'Rendering interface components', type: 'info', delay: 2700 },
  { text: 'All systems operational', type: 'success', delay: 3000 },
  { text: 'NOVA ONLINE — Welcome, Vyas', type: 'success', delay: 3300 },
];

/* ─── component ─── */
const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [activeNodes, setActiveNodes] = useState<Set<number>>(new Set());
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  // progress bar
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current as unknown as number);
          return 100;
        }
        return prev + 0.8;
      });
    }, 30);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current as unknown as number); };
  }, []);

  // terminal lines
  useEffect(() => {
    BOOT_SEQUENCE.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });
  }, []);

  // neural network activation wave
  useEffect(() => {
    const activateWave = () => {
      NODES.forEach((node, i) => {
        setTimeout(() => {
          setActiveNodes(prev => {
            const next = new Set(prev);
            next.add(i);
            return next;
          });
          // deactivate after a bit
          setTimeout(() => {
            setActiveNodes(prev => {
              const next = new Set(prev);
              next.delete(i);
              return next;
            });
          }, 800);
        }, node.layer * 300 + Math.random() * 200);
      });
    };

    activateWave();
    const waveInterval = setInterval(activateWave, 2000);
    return () => clearInterval(waveInterval);
  }, []);

  const statusItems = [
    { label: 'Neural Core', active: progress > 20 },
    { label: 'NLP Engine', active: progress > 45 },
    { label: 'Data Pipeline', active: progress > 70 },
    { label: 'Interface', active: progress > 90 },
  ];

  return (
    <LoadingWrapper
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <GridOverlay />
      <ScanLineOverlay />
      <DataRain />
      <HexSpinner />
      <CornerDecor position="tl" />
      <CornerDecor position="tr" />
      <CornerDecor position="bl" />
      <CornerDecor position="br" />

      {/* Neural Network Visualization */}
      <NeuralNetContainer>
        <NeuralSVG>
          {CONNECTIONS.map((conn, i) => (
            <NeuralConnection
              key={i}
              x1={NODES[conn.from].x + 4}
              y1={NODES[conn.from].y + 4}
              x2={NODES[conn.to].x + 4}
              y2={NODES[conn.to].y + 4}
              active={activeNodes.has(conn.from) || activeNodes.has(conn.to)}
            />
          ))}
        </NeuralSVG>
        {NODES.map((node, i) => (
          <NeuralNode
            key={i}
            x={node.x}
            y={node.y}
            delay={i * 0.1}
            active={activeNodes.has(i)}
          />
        ))}
      </NeuralNetContainer>

      {/* NOVA title */}
      <CoreTitle>
        <NovaText>NOVA</NovaText>
        <SubText>Neural Operations & Virtual Architecture</SubText>
      </CoreTitle>

      {/* Terminal */}
      <TerminalContainer>
        <TerminalHeader>
          <TerminalDot color="#ff5f57" />
          <TerminalDot color="#ffbd2e" />
          <TerminalDot color="#28c840" />
          <TerminalTitle>nova-system://boot</TerminalTitle>
        </TerminalHeader>
        <TerminalBody>
          {BOOT_SEQUENCE.slice(0, visibleLines).map((line, i) => (
            <TerminalLine key={i} type={line.type}>
              {line.text}
            </TerminalLine>
          ))}
          {visibleLines < BOOT_SEQUENCE.length && (
            <TerminalLine type="system">
              <Cursor />
            </TerminalLine>
          )}
        </TerminalBody>
      </TerminalContainer>

      {/* Progress */}
      <ProgressContainer>
        <ProgressLabel>
          <span>System Initialization</span>
          <span>{Math.min(Math.round(progress), 100)}%</span>
        </ProgressLabel>
        <ProgressBarOuter>
          <ProgressBarInner width={progress} />
        </ProgressBarOuter>

        <StatusRow>
          {statusItems.map((item, i) => (
            <StatusItem key={i} active={item.active}>
              <StatusDot active={item.active} />
              {item.label}
            </StatusItem>
          ))}
        </StatusRow>
      </ProgressContainer>
    </LoadingWrapper>
  );
};

export default LoadingScreen;