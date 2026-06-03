import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

const Nav = styled.nav<{ scrolled: boolean }>`
  position: fixed;
  top: ${props => props.theme.space[4]};
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  background: ${props => props.scrolled ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.03)'};
  padding: ${props => props.theme.space[3]} ${props => props.theme.space[6]};
  border-radius: ${props => props.theme.radius.md};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.scrolled ? props.theme.colors.border.default : 'rgba(255, 255, 255, 0.1)'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all ${props => props.theme.motion.normal} cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  box-shadow: ${props => props.scrolled ? props.theme.shadows[3] : 'none'};

  @media (max-width: 768px) {
    top: 0;
    width: 100%;
    border-radius: 0;
    padding: ${props => props.theme.space[3]} ${props => props.theme.space[4]};
  }
`;

const NavBrand = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space[2]};
`;

const NavTitle = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 900;
  font-size: 1.4em;
  color: ${props => props.theme.colors.text.primary};
  letter-spacing: 2px;
  text-transform: uppercase;
  background: linear-gradient(135deg, ${props => props.theme.colors.text.primary} 0%, ${props => props.theme.colors.accent.default} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavList = styled.ul<{ mobileOpen: boolean }>`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: ${props => props.theme.space[2]};

  @media (max-width: 768px) {
    display: ${props => props.mobileOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.surface.muted};
    padding: ${props => props.theme.space[4]};
    border-bottom: 1px solid ${props => props.theme.colors.border.default};
    gap: ${props => props.theme.space[3]};
  }
`;

const NavItem = styled.li``;

const NavLink = styled.a`
  font-family: ${props => props.theme.fonts.secondary};
  color: ${props => props.theme.colors.text.secondary};
  text-decoration: none;
  font-size: 0.75em;
  font-weight: 800;
  padding: 10px 18px;
  border-radius: ${props => props.theme.radius.sm};
  transition: all ${props => props.theme.motion.fast} ease;
  display: block;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid transparent;

  &:hover {
    color: ${props => props.theme.colors.accent.default};
    background: rgba(194, 164, 255, 0.05);
    border-color: rgba(194, 164, 255, 0.1);
  }
`;

const Hamburger = styled.button`
  display: none;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.5em;
  padding: 5px;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
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
        <NavTitle>S.VYAS</NavTitle>
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