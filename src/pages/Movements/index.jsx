import React, { useState, useRef, useEffect, useCallback } from 'react';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';
import {
  Header,
  Table,
  FabButton,
  BaloonModal,
  Input,
  SelectUnform,
  Select,
} from '../../components';

import { Container, Body, FilterContainer } from './styles.css';

const MOVEMENT_TYPES = [
  {
    value: 1,
    label: 'COMPRA',
  },
  {
    value: 2,
    label: 'VENDA',
  },
  {
    value: 3,
    label: 'CONSUMO INTERNO',
  },
  {
    value: 4,
    label: 'FABRICAÇÃO',
  },
  {
    value: 5,
    label: 'DEVOLUÇÃO',
  },
  {
    value: 6,
    label: 'PERDA',
  },
  {
    value: 7,
    label: 'AJUSTE',
  },
];

const Movements = () => {
  const [isBaloonOpen, setBaloonOpen] = useState(false);
  const [movements, setMovements] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [wareHouses, setWareHouses] = useState([]);
  const [selectedWareHouse, setSelectedWareHouse] = useState('');
  const [formWareHouses, setFormWareHouses] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [formLocations, setFormLocations] = useState([]);
  const [formSelectedLocation, setFormSelectedLocation] = useState('');
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [formSelectedBranch, setFormSelectedBranch] = useState('');
  const formRef = useRef(null);

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
        const formattedProducts = data.products.map((prod) => {
          return {
            label: prod.name,
            value: prod._id,
          };
        });
        setProducts(formattedProducts);
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

  const getMovements = useCallback(async () => {
    try {
      const { data } = await api.get(`product-movement/${selectedProduct}`);
      if (data && data.productMovement) {
        setMovements(data.productMovement);
      }
    } catch (err) {
      if (err.response) {
        addToast(err.response?.data?.error || err.response?.data?.message, {
          appearance: 'error',
        });
      }
    }
  }, [selectedProduct, addToast]);

  useEffect(() => {
    if (
      selectedBranch &&
      selectedLocation &&
      selectedWareHouse &&
      selectedProduct
    ) {
      getMovements();
    }
  }, [
    getMovements,
    selectedBranch,
    selectedLocation,
    selectedWareHouse,
    selectedProduct,
  ]);

  const handleSubmit = async (data) => {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        productName: Yup.string().required('Produto obrigatório'),
        productCode: Yup.string().required('Código obrigatório'),
        documentCode: Yup.string().required('Documento obrigatório'),
        documentObservation: Yup.string().required('Observação obrigatória'),
        productUnitOfMeasurement: Yup.string().required('Unidade obrigatória'),
        productProvider: Yup.string().required('Provedor obrigatório'),
        productWarehouse: Yup.string().required('Estoque obrigatório'),
        productMovementQuantity: Yup.string().required(
          'Quantidade obrigatória'
        ),
        productMovementPrice: Yup.string().required('Preço obrigatório'),
        productMovementType: Yup.string().required(
          'Tipo de movementação obrigatória'
        ),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const { data: res } = await api.post('move-product', data);
      if (res) {
        if (
          selectedBranch &&
          selectedLocation &&
          selectedWareHouse &&
          selectedProduct
        ) {
          getWareHouses();
        }
        addToast('Movementação realizada com sucesso', {
          appearance: 'success',
        });
        handleCloseAndReset();
      }
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
      if (err.response) {
        addToast(err.response?.data?.error || err.response?.data?.message, {
          appearance: 'error',
        });
      }
    }
  };

  const getFormLocations = useCallback(async () => {
    try {
      const { data } = await api.get(`location/${formSelectedBranch}`);
      if (data && data.location) {
        const formattedLocations = data.location.map((loc) => {
          return {
            label: loc.name,
            value: loc._id,
          };
        });
        setFormLocations(formattedLocations);
      }
    } catch (err) {
      if (err.response) {
        addToast(err.response?.data?.error || err.response?.data?.message, {
          appearance: 'error',
        });
      }
    }
  }, [formSelectedBranch, addToast]);

  useEffect(() => {
    if (formSelectedBranch) {
      getFormLocations();
    }
  }, [getFormLocations, formSelectedBranch]);

  const getFormWareHouses = useCallback(async () => {
    try {
      const { data } = await api.get(`warehouse/${formSelectedLocation}`);
      if (data && data.wareHouse) {
        const formattedWareHouses = data.wareHouse.map((wh) => {
          return {
            label: wh.name,
            value: wh._id,
          };
        });
        setFormWareHouses(formattedWareHouses);
      }
    } catch (err) {
      if (err.response) {
        addToast(err.response?.data?.error || err.response?.data?.message, {
          appearance: 'error',
        });
      }
    }
  }, [formSelectedLocation, addToast]);

  useEffect(() => {
    if (formSelectedBranch && formSelectedLocation) {
      getFormWareHouses();
    }
  }, [getFormWareHouses, formSelectedBranch, formSelectedLocation]);

  const handleCloseAndReset = () => {
    formRef.current.reset();
    setBaloonOpen(false);
  };

  return (
    <Container>
      <Header />
      <Body>
        <FilterContainer>
          <Select
            width="49%"
            placeholder="Filial"
            options={branches}
            onChange={(e) => setSelectedBranch(e.value)}
          />
          <Select
            width="49%"
            placeholder="Localidade"
            options={locations}
            onChange={(e) => setSelectedLocation(e.value)}
            isDisabled={selectedBranch === ''}
          />
        </FilterContainer>
        <FilterContainer>
          <Select
            width="49%"
            placeholder="Estoque"
            options={wareHouses}
            onChange={(e) => setSelectedWareHouse(e.value)}
            isDisabled={selectedLocation === ''}
          />
          <Select
            width="49%"
            placeholder="Produto"
            options={products}
            onChange={(e) => setSelectedProduct(e.value)}
            isDisabled={selectedWareHouse === ''}
          />
        </FilterContainer>
        <Table>
          <thead>
            <tr>
              <th>
                <h1>Quantidade</h1>
              </th>
              <th>
                <h1>Preço</h1>
              </th>
              <th>
                <h1>Documento</h1>
              </th>
              <th>
                <h1>Observação Documento</h1>
              </th>
              <th>
                <h1>Tipo de movementação</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {movements?.map((mv) => (
              <tr key={mv._id}>
                <td>{mv.quantity}</td>
                <td>{mv.price}</td>
                <td>{mv?.document?.code}</td>
                <td>{mv?.document?.observation}</td>
                <td>
                  {MOVEMENT_TYPES.find((ty) => ty.value === mv.type)?.label}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Body>
      <FabButton onClick={() => setBaloonOpen(!isBaloonOpen)}>+</FabButton>
      <BaloonModal
        height="750px"
        isVisible={isBaloonOpen}
        title="Nova Movementação"
        cancelAction={handleCloseAndReset}
        saveAction={() => formRef.current.submitForm()}
      >
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Select
            noMargin
            width="100%"
            placeholder="Filial"
            options={branches}
            onChange={(e) => setFormSelectedBranch(e.value)}
          />
          <Select
            noMargin
            width="100%"
            placeholder="Localidade"
            options={formLocations}
            isDisabled={formSelectedBranch === ''}
            onChange={(e) => setFormSelectedLocation(e.value)}
          />
          <SelectUnform
            name="productWarehouse"
            placeholder="Estoque"
            options={formWareHouses}
            isDisabled={formSelectedLocation === ''}
          />
          <SelectUnform
            name="productMovementType"
            placeholder="Tipo de movementação"
            options={MOVEMENT_TYPES}
          />
          <Input name="productName" placeholder="Nome do produto" />
          <Input name="productCode" placeholder="Código do produto" />
          <Input name="documentCode" placeholder="Documento" />
          <Input
            name="documentObservation"
            placeholder="Observação do documento"
          />
          <Input
            name="productUnitOfMeasurement"
            placeholder="Unidade de medida"
          />
          <Input name="productProvider" placeholder="Provedor" />
          <Input
            name="productMovementQuantity"
            placeholder="Quantidade"
            type="number"
          />
          <Input
            name="productMovementPrice"
            placeholder="Preço"
            type="number"
          />
        </Form>
      </BaloonModal>
    </Container>
  );
};

export default Movements;
