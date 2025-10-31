import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px 40px;
  border-radius: 12px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavTitle = styled.div`
  font-weight: bold;
  color: #90ee90;
  margin: 0;
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const NavItem = styled.li`
  margin-right: 20px;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1em;
  transition: color 0.3s ease;

  &:hover {
    color: #90ee90;
  }
`;

const Navbar: React.FC = () => {
  return (
    <Nav>
      <div>
        <NavTitle>Vyas</NavTitle>
      </div>
      <NavList>
        <NavItem><NavLink href="#top">Home</NavLink></NavItem>
        <NavItem><NavLink href="#about">About</NavLink></NavItem>
        <NavItem><NavLink href="#blog">Blog</NavLink></NavItem>
      </NavList>
    </Nav>
  );
};

export default Navbar;