import React, { useState, useEffect } from 'react';

import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';
import {
  Header,
  Table,
} from '../../components';

import { Container, Body } from './styles.css';

const MinimumStock = () => {
  const [products, setProducts] = useState([]);
  const { addToast } = useToasts();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await api.get('productMinimumStock');
        if (data && data.productMinimumStock) {
          setProducts(data.productMinimumStock);
        }
      } catch (err) {
        if (err.response) {
          addToast(err.response?.data?.error || err.response?.data?.message, {
            appearance: 'error',
          });
        }
      }
    };
    getProducts();
  }, [addToast]);

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
                <h1>Mínimo</h1>
              </th>
              <th>
                <h1>Quantidade</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((pr) => (
              <tr key={pr._id}>
                <td>{pr.name}</td>
                <td>{pr.minimumInStock}</td>
                <td>{pr.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Body>
    </Container>
  );
};

export default MinimumStock;
