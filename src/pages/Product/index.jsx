import React from 'react';

import { Header, Table } from '../../components';

import { Container, Body } from './styles.css';

const Product = () => {
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
                <h1>Código</h1>
              </th>
              <th>
                <h1>Preço</h1>
              </th>
              <th>
                <h1>Unidade de medida</h1>
              </th>
              <th>
                <h1>Provedores</h1>
              </th>
              <th>
                <h1>Estoque</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Guarana Kuat</td>
              <td>1234</td>
              <td>R$09,00</td>
              <td>ml</td>
              <td>Teste</td>
              <td>Teste</td>
            </tr>
            <tr>
              <td>Fanta Uva</td>
              <td>4567</td>
              <td>R$09,00</td>
              <td>ml</td>
              <td>Teste</td>
              <td>Teste</td>
            </tr>
          </tbody>
        </Table>
      </Body>
    </Container>
  );
};

export default Product;
