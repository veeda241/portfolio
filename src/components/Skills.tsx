import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedSectionTitle from './AnimatedSectionTitle';
import promptEngLogo from '../assets/prompt_eng_logo.png';
import ragLogo from '../assets/rag_logo.jpg';

const skills = [
  {
    logo: 'https://cdn.simpleicons.org/langchain/1C3C3C',
    title: 'LLM & Agents',
    level: 'Advanced',
    description: 'Building emotionally-aware AI agents, RAG pipelines, and multimodal systems with LangChain, LlamaIndex, OpenAI API, Anthropic Claude, and HuggingFace Transformers.',
    experience: 'Core specialization',
  },
  {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    title: 'PyTorch',
    level: 'Advanced',
    description: 'Developing deep learning models for computer vision, NLP, and multimodal AI systems.',
    experience: 'Primary DL framework',
  },
  {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    title: 'TensorFlow & Keras',
    level: 'Advanced',
    description: 'Building and deploying production ML models including facial expression recognition and vocal tone analysis.',
    experience: 'Production models',
  },
  {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    title: 'Python',
    level: 'Advanced',
    description: 'Primary language for AI/ML pipelines, backend services, data processing, and automation across all projects.',
    experience: 'Primary language',
  },
  {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    title: 'TypeScript',
    level: 'Proficient',
    description: 'Type-safe frontend development with React 19, Next.js, and modern web architectures.',
    experience: 'Frontend & full-stack',
  },
  {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    title: 'React & Next.js',
    level: 'Proficient',
    description: 'Building responsive, performance-optimized frontends with React 19, Vite, and Next.js for AI-powered applications.',
    experience: 'Frontend framework',
  },
  {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    title: 'FastAPI & Flask',
    level: 'Intermediate',
    description: 'Designing modern API services for AI products, real-time proctoring backends, and multi-agent pipelines.',
    experience: 'Backend APIs',
  },
  {
    logo: ragLogo,
    title: 'Vector DBs & RAG',
    level: 'Intermediate',
    description: 'Building semantic search and retrieval pipelines with Pinecone, ChromaDB, and FAISS for knowledge-augmented AI.',
    experience: 'RAG pipelines',
  },
  {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    title: 'Databases',
    level: 'Intermediate',
    description: 'Working with PostgreSQL, MongoDB, Supabase, MySQL, and Firebase for full-stack application backends.',
    experience: 'Data layer',
  },
  {
    logo: 'https://cdn.simpleicons.org/opencv/5C3EE8',
    title: 'Computer Vision',
    level: 'Intermediate',
    description: 'YOLOv8 object detection, MediaPipe face/gaze tracking, and Tesseract OCR for real-time proctoring and analysis.',
    experience: 'CV projects',
  },
  {
    logo: promptEngLogo,
    title: 'Prompt Engineering',
    level: 'Advanced',
    description: 'Designing prompts and workflows for LLM-backed assistants, structured outputs, and production AI applications.',
    experience: 'LLM workflows',
  },
  {
    logo: 'https://cdn.simpleicons.org/docker/2496ED',
    title: 'DevOps & Deployment',
    level: 'Intermediate',
    description: 'Deploying to GitHub Pages, Vercel, Render with Docker containers and GitHub Actions CI/CD pipelines.',
    experience: 'Deployment',
  },
];


const SkillsWrapper = styled.section`
  padding: ${props => props.theme.space[8]} ${props => props.theme.space[6]};
  background: ${props => props.theme.colors.surface.base};
  color: ${props => props.theme.colors.text.primary};
  position: relative;
  overflow: hidden;
  text-align: center;

  @media (max-width: 768px) {
    padding: ${props => props.theme.space[6]} ${props => props.theme.space[4]};
  }
`;

const IntroText = styled.p`
  max-width: 680px;
  margin: 0 auto ${props => props.theme.space[7]};
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.05rem;
  line-height: 1.8;
`;

const OrbitShell = styled.div`
  position: relative;
  width: min(82vw, 760px);
  height: min(50vw, 440px);
  min-height: 300px;
  margin: 0 auto;
`;

const Glow = styled.div`
  position: absolute;
  left: 50%;
  top: 18%;
  width: 980px;
  height: 980px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  background: radial-gradient(circle at center, rgba(194, 164, 255, 0.22), transparent 66%);
  filter: blur(38px);
  pointer-events: none;
`;

const Ring = styled.div<{ radius: number; centerX: number; centerY: number }>`
  position: absolute;
  left: ${props => props.centerX - props.radius}px;
  top: ${props => props.centerY - props.radius}px;
  width: ${props => props.radius * 2}px;
  height: ${props => props.radius * 2}px;
  border: 1px solid rgba(194, 164, 255, 0.16);
  border-bottom-color: transparent;
  border-left-color: rgba(194, 164, 255, 0.08);
  border-right-color: rgba(194, 164, 255, 0.08);
  border-radius: 999px;
  pointer-events: none;
`;

const OrbitNode = styled(motion.button)<{ x: number; y: number; iconSize: number; selected: boolean }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: ${props => props.iconSize}px;
  height: ${props => props.iconSize}px;
  min-width: ${props => props.iconSize}px;
  min-height: ${props => props.iconSize}px;
  border-radius: 18px;
  border: 1px solid ${props => props.selected ? props.theme.colors.accent.default : 'rgba(194, 164, 255, 0.25)'};
  background: ${props => props.selected ? 'rgba(194, 164, 255, 0.18)' : 'rgba(255, 255, 255, 0.04)'};
  color: ${props => props.selected ? props.theme.colors.accent.default : props.theme.colors.text.primary};
  display: grid;
  place-items: center;
  font-size: ${props => Math.max(18, props.iconSize * 0.46)}px;
  z-index: 3;
  box-shadow: ${props => props.selected ? '0 18px 42px rgba(194, 164, 255, 0.18)' : 'none'};
  backdrop-filter: blur(12px);

  &:hover {
    color: ${props => props.theme.colors.surface.base};
    background: ${props => props.theme.colors.accent.default};
    border-color: ${props => props.theme.colors.accent.default};
  }
`;

const LogoImage = styled.img`
  width: 62%;
  height: 62%;
  object-fit: contain;
  filter: drop-shadow(0 8px 14px rgba(0, 0, 0, 0.25));
  transition: transform ${props => props.theme.motion.fast} ease;

  ${OrbitNode}:hover & {
    transform: scale(1.08);
  }
`;

const Tooltip = styled.span<{ above: boolean }>`
  position: absolute;
  left: 50%;
  ${props => props.above ? 'bottom: calc(100% + 10px);' : 'top: calc(100% + 10px);'}
  width: max-content;
  max-width: 180px;
  transform: translateX(-50%);
  padding: 7px 10px;
  border-radius: ${props => props.theme.radius.sm};
  background: #050405;
  border: 1px solid rgba(194, 164, 255, 0.25);
  color: ${props => props.theme.colors.text.primary};
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0;
  pointer-events: none;
  transition: opacity ${props => props.theme.motion.fast} ease;

  ${OrbitNode}:hover & {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    ${props => props.above ? 'top: calc(100% - 4px);' : 'bottom: calc(100% - 4px);'}
    width: 10px;
    height: 10px;
    transform: translateX(-50%) rotate(45deg);
    background: #050405;
    border-right: 1px solid rgba(194, 164, 255, 0.25);
    border-bottom: 1px solid rgba(194, 164, 255, 0.25);
  }
`;

const DetailPanel = styled(motion.div)`
  max-width: 900px;
  margin: ${props => props.theme.space[6]} auto 0;
  padding: ${props => props.theme.space[6]};
  text-align: left;
  background: ${props => props.theme.colors.surface.muted};
  border: 1px solid ${props => props.theme.colors.border.default};
  border-radius: ${props => props.theme.radius.md};
  box-shadow: ${props => props.theme.shadows[3]};
`;

const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space[3]};
  margin-bottom: ${props => props.theme.space[3]};
`;

const DetailIcon = styled.div`
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => props.theme.colors.accent.default};
  border: 1px solid ${props => props.theme.colors.accent.default};
  background: rgba(194, 164, 255, 0.08);
  font-size: 1.55rem;
`;

const DetailLogo = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;

const DetailTitle = styled.h3`
  margin: 0;
  font-size: 1.45rem;
`;

const DetailText = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.04rem;
  line-height: 1.8;
  margin-bottom: ${props => props.theme.space[3]};
`;

const LevelTag = styled.span`
  display: inline-block;
  padding: 6px 14px;
  border-radius: ${props => props.theme.radius.sm};
  border: 1px solid ${props => props.theme.colors.accent.default};
  background: rgba(194, 164, 255, 0.1);
  color: ${props => props.theme.colors.accent.default};
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

function useViewportSize() {
  const [size, setSize] = useState({ width: 900, height: 700 });

  useEffect(() => {
    const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}

function SemiCircleOrbit({
  radius,
  centerX,
  centerY,
  items,
  iconSize,
  selectedTitle,
  onSelect,
}: {
  radius: number;
  centerX: number;
  centerY: number;
  items: typeof skills;
  iconSize: number;
  selectedTitle: string;
  onSelect: (skill: typeof skills[number]) => void;
}) {
  return (
    <>
      <Ring radius={radius} centerX={centerX} centerY={centerY} />
      {items.map((skill, index) => {
        const count = items.length;
        const angle = count === 1 ? 90 : (index / (count - 1)) * 180;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        const tooltipAbove = angle > 90;

        return (
          <OrbitNode
            key={`${radius}-${skill.title}-${index}`}
            type="button"
            x={centerX + x - iconSize / 2}
            y={centerY - y - iconSize / 2}
            iconSize={iconSize}
            selected={selectedTitle === skill.title}
            onMouseEnter={() => onSelect(skill)}
            onFocus={() => onSelect(skill)}
            onClick={() => onSelect(skill)}
            whileHover={{ scale: 1.12, y: -3 }}
            whileTap={{ scale: 0.96 }}
            aria-label={skill.title}
          >
            <LogoImage src={skill.logo} alt="" aria-hidden="true" />
            <Tooltip above={tooltipAbove}>{skill.title}</Tooltip>
          </OrbitNode>
        );
      })}
    </>
  );
}

const Skills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);
  const size = useViewportSize();

  const orbitMetrics = useMemo(() => {
    const baseWidth = Math.min(size.width * 0.82, 760);
    const centerX = baseWidth / 2;
    const centerY = baseWidth * 0.52;
    const iconSize =
      size.width < 480
        ? Math.max(42, baseWidth * 0.08)
        : size.width < 768
          ? Math.max(48, baseWidth * 0.075)
          : Math.max(56, baseWidth * 0.075);

    return { baseWidth, centerX, centerY, iconSize };
  }, [size.width]);

  const innerSkills = skills.slice(0, 3);
  const middleSkills = skills.slice(3, 7);
  const outerSkills = skills.slice(7);

  return (
    <SkillsWrapper id="skills">
      <AnimatedSectionTitle label="// tech_orbit" title="Skills" />
      <IntroText>
        Move across the orbit to explore the tools and frameworks I use across LLM systems, computer vision,
        RAG pipelines, and full-stack AI deployment.
      </IntroText>

      <OrbitShell style={{ width: orbitMetrics.baseWidth, height: orbitMetrics.baseWidth * 0.62 }}>
        <Glow />
        <SemiCircleOrbit
          radius={orbitMetrics.baseWidth * 0.22}
          centerX={orbitMetrics.centerX}
          centerY={orbitMetrics.centerY}
          items={innerSkills}
          iconSize={orbitMetrics.iconSize}
          selectedTitle={selectedSkill.title}
          onSelect={setSelectedSkill}
        />
        <SemiCircleOrbit
          radius={orbitMetrics.baseWidth * 0.36}
          centerX={orbitMetrics.centerX}
          centerY={orbitMetrics.centerY}
          items={middleSkills}
          iconSize={orbitMetrics.iconSize}
          selectedTitle={selectedSkill.title}
          onSelect={setSelectedSkill}
        />
        <SemiCircleOrbit
          radius={orbitMetrics.baseWidth * 0.5}
          centerX={orbitMetrics.centerX}
          centerY={orbitMetrics.centerY}
          items={outerSkills}
          iconSize={orbitMetrics.iconSize}
          selectedTitle={selectedSkill.title}
          onSelect={setSelectedSkill}
        />
      </OrbitShell>

      <AnimatePresence mode="wait">
        <DetailPanel
          key={selectedSkill.title}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <DetailHeader>
            <DetailIcon>
              <DetailLogo src={selectedSkill.logo} alt="" aria-hidden="true" />
            </DetailIcon>
            <div>
              <DetailTitle>{selectedSkill.title}</DetailTitle>
              <LevelTag>{selectedSkill.level} - {selectedSkill.experience}</LevelTag>
            </div>
          </DetailHeader>
          <DetailText>{selectedSkill.description}</DetailText>
        </DetailPanel>
      </AnimatePresence>
    </SkillsWrapper>
  );
};

export default Skills;
