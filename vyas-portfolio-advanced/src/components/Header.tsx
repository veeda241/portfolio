import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  text-align: left;
  margin-top: 100px;
`;

const Title = styled.h1`
  font-size: 5em;
  font-weight: 700;
  margin: 0;
  line-height: 1.1;
  color: white;

  @media (max-width: 768px) {
    font-size: 3em;
  }

  span {
    color: #90ee90;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2em;
  color: white;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <HeaderWrapper>
      <Title>
        <span>Hey, I'm</span>
        <br />
        {title}
      </Title>
      <Subtitle>{subtitle}</Subtitle>
    </HeaderWrapper>
  );
};

export default Header;