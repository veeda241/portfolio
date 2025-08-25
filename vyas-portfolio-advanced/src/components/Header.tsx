
import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  text-align: center;
  padding: 120px 20px 60px;
`;

const Title = styled.h1`
  font-size: 3.5em;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.2em;
  color: #ffd700;
`;

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <HeaderWrapper>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </HeaderWrapper>
  );
};

export default Header;
