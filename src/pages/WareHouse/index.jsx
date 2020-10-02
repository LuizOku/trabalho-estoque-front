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
  CheckBox,
  SelectUnform,
  Select,
} from '../../components';

import { Container, Body, FilterContainer } from './styles.css';

const WareHouse = () => {
  const [isBaloonOpen, setBaloonOpen] = useState(false);
  const [wareHouses, setWareHouses] = useState([]);
  const [locations, setLocations] = useState([]);
  const [formLocations, setFormLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
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
        setWareHouses(data.wareHouse);
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

  const handleSubmit = async (data) => {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        location: Yup.string().required('Localidade obrigatória'),
        isThirdParty: Yup.array(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const formattedData = {
        ...data,
        isThirdParty: data?.isThirdParty.length > 0,
      };
      const { data: res } = await api.post('warehouse', formattedData);
      if (res) {
        if (selectedBranch && selectedLocation) {
          getWareHouses();
        }
        addToast('Estoque adicionado com sucesso', {
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
        <Table>
          <thead>
            <tr>
              <th>
                <h1>Nome</h1>
              </th>
              <th>
                <h1>Pertence a terceiro</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {wareHouses?.map((wh) => (
              <tr key={wh._id}>
                <td>{wh.name}</td>
                <td>{wh.isThirdParty ? 'Sim' : 'Não'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Body>
      <FabButton onClick={() => setBaloonOpen(!isBaloonOpen)}>+</FabButton>
      <BaloonModal
        height="300px"
        isVisible={isBaloonOpen}
        title="Novo estoque"
        cancelAction={handleCloseAndReset}
        saveAction={() => formRef.current.submitForm()}
      >
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" placeholder="Nome" />
          <Select
            noMargin
            width="100%"
            placeholder="Filial"
            options={branches}
            onChange={(e) => setFormSelectedBranch(e.value)}
          />
          <SelectUnform
            name="location"
            placeholder="Localidade"
            options={formLocations}
            isDisabled={formSelectedBranch === ''}
          />
          <CheckBox
            name="isThirdParty"
            options={[
              {
                id: 'isThirdParty',
                value: true,
                label: 'Pertence a terceiro',
              },
            ]}
          />
        </Form>
      </BaloonModal>
    </Container>
  );
};

export default WareHouse;
