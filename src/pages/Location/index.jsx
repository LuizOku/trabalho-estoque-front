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

import { Container, Body } from './styles.css';

const Location = () => {
  const [isBaloonOpen, setBaloonOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
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
        setLocations(data.location);
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

  const handleSubmit = async (data) => {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        address: Yup.string().required('Endereço obrigatório'),
        branch: Yup.string().required('Filial obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const { data: res } = await api.post('location', data);
      if (res) {
        if (selectedBranch) {
          getLocations();
        }
        addToast('Localidade adicionada com sucesso', {
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

  const handleCloseAndReset = () => {
    formRef.current.reset();
    setBaloonOpen(false);
  };

  return (
    <Container>
      <Header />
      <Body>
        <Select
          placeholder="Filial"
          options={branches}
          onChange={(e) => setSelectedBranch(e.value)}
        />
        <Table>
          <thead>
            <tr>
              <th>
                <h1>Nome</h1>
              </th>
              <th>
                <h1>Endereço</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {locations?.map((loc) => (
              <tr key={loc._id}>
                <td>{loc.name}</td>
                <td>{loc.address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Body>
      <FabButton onClick={() => setBaloonOpen(!isBaloonOpen)}>+</FabButton>
      <BaloonModal
        height="320px"
        isVisible={isBaloonOpen}
        title="Nova localidade"
        cancelAction={handleCloseAndReset}
        saveAction={() => formRef.current.submitForm()}
      >
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" placeholder="Nome" />
          <Input name="address" placeholder="Endereço" />
          <SelectUnform name="branch" placeholder="Filial" options={branches} />
        </Form>
      </BaloonModal>
    </Container>
  );
};

export default Location;
