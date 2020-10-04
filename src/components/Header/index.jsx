import React from 'react';

import { useHistory, Link } from 'react-router-dom';
import { bubble as Menu } from 'react-burger-menu';

import Logo from '../../assets/logo.png';

import { Nav, Container, SignOutButton, MenuContainer } from './styles.css';

export default function Header() {
  const history = useHistory();
  const logOut = () => {
    localStorage.removeItem('auth-estoque');
    history.push('/');
  };

  return (
    <header>
      <Nav>
        <Container>
          <MenuContainer>
            <Menu noOverlay>
              <Link to="movements">Movementações</Link>
              <Link to="branch">Filial</Link>
              <Link to="location">Localidade</Link>
              <Link to="ware-house">Estoque</Link>
              <Link to="product">Produto</Link>
            </Menu>
          </MenuContainer>
          <Link to="movements">
            <img src={Logo} alt="" width={80} />
          </Link>
          <SignOutButton onClick={logOut}>SAIR</SignOutButton>
        </Container>
      </Nav>
    </header>
  );
}
