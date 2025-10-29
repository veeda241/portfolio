import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import portfolioData from '../portfolioData.json';

const ProjectItem: React.FC<{ project: any; index: number }> = ({ project, index }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const radius = 5;
  const angle = (index / portfolioData.projects.items.length) * 2 * Math.PI;
  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  return (
    <mesh ref={mesh} position={[x, 0, z]} rotation={[0, -angle, 0]}>
      <planeGeometry args={[3, 2]} />
      <meshStandardMaterial color="orange" />
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>
    </mesh>
  );
};

const CarouselGroup: React.FC = () => {
  const group = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={group}>
      {portfolioData.projects.items.map((project, index) => (
        <ProjectItem key={index} project={project} index={index} />
      ))}
    </group>
  );
};

const ProjectCarousel: React.FC = () => {
  return (
    <Canvas style={{ height: '500px' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <CarouselGroup />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default ProjectCarousel;
