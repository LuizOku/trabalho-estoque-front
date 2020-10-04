import React, { useState, useRef, useEffect, useCallback } from 'react';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';
import { Header, Table, FabButton, BaloonModal, Input } from '../../components';

import { Container, Body } from './styles.css';

const Branch = () => {
  const [isBaloonOpen, setBaloonOpen] = useState(false);
  const [branches, setBranches] = useState([]);
  const formRef = useRef(null);
  const { addToast } = useToasts();

  const getBranches = useCallback(async () => {
    try {
      const { data } = await api.get('branch');
      if (data && data.branch) {
        setBranches(data.branch);
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

  const handleSubmit = async (data) => {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const { data: res } = await api.post('branch', data);
      if (res) {
        await getBranches();
        addToast('Filial adicionada com sucesso', {
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
        <Table>
          <thead>
            <tr>
              <th>
                <h1>Nome</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {branches?.map((br) => (
              <tr key={br._id}>
                <td>{br.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Body>
      <FabButton onClick={() => setBaloonOpen(!isBaloonOpen)}>+</FabButton>
      <BaloonModal
        height="220px"
        isVisible={isBaloonOpen}
        title="Nova filial"
        cancelAction={handleCloseAndReset}
        saveAction={() => formRef.current.submitForm()}
      >
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" placeholder="Nome" />
        </Form>
      </BaloonModal>
    </Container>
  );
};

export default Branch;
