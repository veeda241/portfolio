
import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(0,0,0,0.85);
  padding: 10px 0;
  z-index: 1000;
  text-align: center;
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  display: inline-block;
  margin: 0 20px;
`;

const NavLink = styled.a`
  color: #ffd700;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #00ffd5;
  }
`;

const Navbar: React.FC = () => {
  return (
    <Nav>
      <NavList>
        <NavItem><NavLink href="#about">About</NavLink></NavItem>
        <NavItem><NavLink href="#skills">Skills</NavLink></NavItem>
        <NavItem><NavLink href="#projects">Projects</NavLink></NavItem>
        <NavItem><NavLink href="#achievements">Achievements</NavLink></NavItem>
        <NavItem><NavLink href="#contact">Contact</NavLink></NavItem>
      </NavList>
    </Nav>
  );
};

export default Navbar;
