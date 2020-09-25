import React from 'react';

import { Header, Table } from '../../components';

import { Container, Body } from './styles.css';

const Location = () => {
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
                <h1>Endereço</h1>
              </th>
              <th>
                <h1>Filial</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Curitiba</td>
              <td>Avenida Iguaçu, 3001</td>
              <td>Coca-cola</td>
            </tr>
            <tr>
              <td>Londrina</td>
              <td>Avenida das Nações, 2325</td>
              <td>Ambev</td>
            </tr>
          </tbody>
        </Table>
      </Body>
    </Container>
  );
};

export default Location;
