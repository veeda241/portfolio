import React from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';

export interface ScrollStackItemProps {
  itemClassName?: string;
  index?: number;
  children: ReactNode;
}

const StackItem = styled.div<{ index: number }>`
  position: sticky;
  top: calc(72px + ${props => props.index * 18}px);
  min-height: 340px;
  margin: 0 0 90px;
  transform-origin: top center;
  z-index: ${props => props.index + 1};

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    margin-bottom: ${props => props.theme.space[4]};
  }
`;

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
  index = 0,
}) => (
  <StackItem className={`scroll-stack-card ${itemClassName}`.trim()} index={index}>
    {children}
  </StackItem>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStackRoot = styled.div<{ itemDistance: number }>`
  position: relative;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 8vh min(6vw, 80px) 18vh;

  @media (max-width: 768px) {
    padding: ${props => props.theme.space[4]};
  }
`;

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 90,
}) => (
  <ScrollStackRoot className={className} itemDistance={itemDistance}>
    {children}
  </ScrollStackRoot>
);

export default ScrollStack;
