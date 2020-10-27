import React, { useState, useEffect } from 'react';

import { useHistory, Link } from 'react-router-dom';
import { bubble as Menu } from 'react-burger-menu';

import Logo from '../../assets/logo.png';

import { Nav, Container, SignOutButton, MenuContainer } from './styles.css';

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getIsClient = async () => {
      const isClientStorage = await localStorage.getItem(
        'auth-estoque-is-client'
      );
      if (isClientStorage && isClientStorage === 'true') {
        setIsClient(true);
      }
    };
    getIsClient();
  }, []);

  const logOut = () => {
    localStorage.removeItem('auth-estoque');
    localStorage.removeItem('auth-estoque-is-client');
    history.push('/');
  };

  return (
    <header>
      <Nav>
        <Container>
          <MenuContainer>
            {isClient ? (
              <Menu noOverlay>
                <Link to="ecommerce">Ecommerce</Link>
              </Menu>
            ) : (
              <Menu noOverlay>
                <Link to="movements">Movementações</Link>
                <Link to="branch">Filial</Link>
                <Link to="location">Localidade</Link>
                <Link to="ware-house">Estoque</Link>
                <Link to="product">Produto</Link>
                <Link to="campaign">Campanha</Link>
                <Link to="minimum-stock">Relatório de Estoque mínimo</Link>
              </Menu>
            )}
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
