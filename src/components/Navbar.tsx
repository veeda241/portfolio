import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

const Nav = styled.nav<{ scrolled: boolean }>`
  background: ${props => props.scrolled ? 'rgba(6, 10, 18, 0.92)' : 'rgba(255, 255, 255, 0.04)'};
  padding: 14px 28px;
  border-radius: 10px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid ${props => props.scrolled ? 'rgba(76, 161, 175, 0.15)' : 'rgba(255, 255, 255, 0.08)'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.4s ease;
  position: relative;
  z-index: 100;
`;

const NavBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #90ee90;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const NavTitle = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 1em;
  background: linear-gradient(135deg, #90ee90, #4ca1af);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 2px;
`;

const NavList = styled.ul<{ mobileOpen: boolean }>`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 4px;

  @media (max-width: 768px) {
    display: ${props => props.mobileOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: rgba(6, 10, 18, 0.96);
    backdrop-filter: blur(16px);
    border-radius: 10px;
    padding: 12px;
    border: 1px solid rgba(76, 161, 175, 0.15);
    gap: 2px;
  }
`;

const NavItem = styled.li``;

const NavLink = styled.a`
  font-family: 'JetBrains Mono', monospace;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 0.78em;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: block;
  letter-spacing: 1px;

  &:hover {
    color: #90ee90;
    background: rgba(144, 238, 144, 0.06);
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: 1px solid rgba(76,161,175,0.2);
  color: rgba(255,255,255,0.6);
  font-size: 1.2em;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(76,161,175,0.4);
    color: #90ee90;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav scrolled={scrolled}>
      <NavBrand>
        <StatusDot />
        <NavTitle>NOVA://VS</NavTitle>
      </NavBrand>
      <Hamburger onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? '✕' : '☰'}
      </Hamburger>
      <NavList mobileOpen={mobileOpen}>
        <NavItem><NavLink href="#home" onClick={() => setMobileOpen(false)}>home</NavLink></NavItem>
        <NavItem><NavLink href="#about" onClick={() => setMobileOpen(false)}>about</NavLink></NavItem>
        <NavItem><NavLink href="#skills" onClick={() => setMobileOpen(false)}>skills</NavLink></NavItem>
        <NavItem><NavLink href="#projects" onClick={() => setMobileOpen(false)}>projects</NavLink></NavItem>
        <NavItem><NavLink href="#experience" onClick={() => setMobileOpen(false)}>exp</NavLink></NavItem>
        <NavItem><NavLink href="#certificates" onClick={() => setMobileOpen(false)}>certs</NavLink></NavItem>
        <NavItem><NavLink href="#achievements" onClick={() => setMobileOpen(false)}>achievements</NavLink></NavItem>
        <NavItem><NavLink href="#blog" onClick={() => setMobileOpen(false)}>blog</NavLink></NavItem>
      </NavList>
    </Nav>
  );
};

export default Navbar;