import React from 'react';

import { Header, Table } from '../../components';

import { Container, Body } from './styles.css';

const WareHouse = () => {
  return (
    <Container>
      <Header />
      <Body>
        <Table>
          <thead>
            <tr>
              <th>
                <h1>Nome</h1>
              </th>
              <th>
                <h1>Pertence a terceiro</h1>
              </th>
              <th>
                <h1>Localização</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Teste 01</td>
              <td>Sim</td>
              <td>Curitiba</td>
            </tr>
            <tr>
              <td>Teste 02</td>
              <td>Não</td>
              <td>Londrina</td>
            </tr>
          </tbody>
        </Table>
      </Body>
    </Container>
  );
};

export default WareHouse;
