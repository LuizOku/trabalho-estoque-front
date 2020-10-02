import React, { useState, useEffect, useCallback } from 'react';

import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';
import { Header, Table, Select } from '../../components';

import { Container, Body, FilterContainer } from './styles.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [wareHouses, setWareHouses] = useState([]);
  const [selectedWareHouse, setSelectedWareHouse] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const { addToast } = useToasts();

  const getBranches = useCallback(async () => {
    try {
      const { data } = await api.get('branch');
      if (data && data.branch) {
        const formattedBranches = data.branch.map((br) => {
          return {
            label: br.name,
            value: br._id,
          };
        });
        setBranches(formattedBranches);
      }
    } catch (err) {
      if (err.response) {
        addToast(err.response?.data?.error || err.response?.data?.message, {
          appearance: 'error',
        });
      }
    }
  }, [addToast]);

  useEffect(() => {
    getBranches();
  }, [getBranches]);

  const getLocations = useCallback(async () => {
    try {
      const { data } = await api.get(`location/${selectedBranch}`);
      if (data && data.location) {
        const formattedLocations = data.location.map((loc) => {
          return {
            label: loc.name,
            value: loc._id,
          };
        });
        setLocations(formattedLocations);
      }
    } catch (err) {
      if (err.response) {
        addToast(err.response?.data?.error || err.response?.data?.message, {
          appearance: 'error',
        });
      }
    }
  }, [selectedBranch, addToast]);

  useEffect(() => {
    if (selectedBranch) {
      getLocations();
    }
  }, [getLocations, selectedBranch]);

  const getWareHouses = useCallback(async () => {
    try {
      const { data } = await api.get(`warehouse/${selectedLocation}`);
      if (data && data.wareHouse) {
        const formattedWareHouses = data.wareHouse.map((wh) => {
          return {
            label: wh.name,
            value: wh._id,
          };
        });
        setWareHouses(formattedWareHouses);
      }
    } catch (err) {
      if (err.response) {
        addToast(err.response?.data?.error || err.response?.data?.message, {
          appearance: 'error',
        });
      }
    }
  }, [selectedLocation, addToast]);

  useEffect(() => {
    if (selectedBranch && selectedLocation) {
      getWareHouses();
    }
  }, [getWareHouses, selectedBranch, selectedLocation]);

  const getProducts = useCallback(async () => {
    try {
      const { data } = await api.get(`product/${selectedWareHouse}`);
      if (data && data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      if (err.response) {
        addToast(err.response?.data?.error || err.response?.data?.message, {
          appearance: 'error',
        });
      }
    }
  }, [selectedWareHouse, addToast]);

  useEffect(() => {
    if (selectedBranch && selectedLocation && selectedWareHouse) {
      getProducts();
    }
  }, [getProducts, selectedBranch, selectedLocation, selectedWareHouse]);

  return (
    <Container>
      <Header />
      <Body>
        <FilterContainer>
          <Select
            width="32%"
            placeholder="Filial"
            options={branches}
            onChange={(e) => setSelectedBranch(e.value)}
          />
          <Select
            width="32%"
            placeholder="Localidade"
            options={locations}
            onChange={(e) => setSelectedLocation(e.value)}
            isDisabled={selectedBranch === ''}
          />
          <Select
            width="32%"
            placeholder="Estoque"
            options={wareHouses}
            onChange={(e) => setSelectedWareHouse(e.value)}
            isDisabled={selectedLocation === ''}
          />
        </FilterContainer>
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
            </tr>
          </thead>
          <tbody>
            {products?.map((pr) => (
              <tr key={pr._id}>
                <td>{pr.name}</td>
                <td>{pr.code}</td>
                <td>{pr.calculatedPrice}</td>
                <td>{pr.unitOfMeasurement}</td>
                <td>{pr.providers}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Body>
    </Container>
  );
};

export default Product;
