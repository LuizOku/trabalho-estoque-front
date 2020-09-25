import React from 'react';

import { Header, Table } from '../../components';

import { Container, Body } from './styles.css';

const Branch = () => {
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Coca-cola</td>
            </tr>
            <tr>
              <td>Ambev</td>
            </tr>
          </tbody>
        </Table>
      </Body>
    </Container>
  );
};

export default Branch;
