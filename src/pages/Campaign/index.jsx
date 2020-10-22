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
} from '../../components';

import { Container, Body } from './styles.css';

const Campaign = () => {
  const [isBaloonOpen, setBaloonOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [products, setProducts] = useState([]);
  const formRef = useRef(null);
  const { addToast } = useToasts();

  const getCampaigns = useCallback(async () => {
    try {
      const { data } = await api.get('all-campaing');
      if (data && data.campaing) {
        setCampaigns(data.campaing);
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
    getCampaigns();
  }, [getCampaigns]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await api.get('all-product');
        if (data && data.product) {
          const formattedProducts = data.product.map((pr) => {
            return {
              id: pr._id,
              value: pr._id,
              label: pr.name,
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
    };
    getProducts();
  }, [addToast]);

  const handleSubmit = async (data) => {
    console.log(data);
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        products: Yup.array().required('Produtos obrigatórios'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const { data: res } = await api.post('campaing', data);
      if (res) {
        await getCampaigns();
        addToast('Campanha adicionada com sucesso', {
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
            {campaigns?.map((cp) => (
              <tr key={cp._id}>
                <td>{cp.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Body>
      <FabButton onClick={() => setBaloonOpen(!isBaloonOpen)}>+</FabButton>
      <BaloonModal
        height="320px"
        isVisible={isBaloonOpen}
        title="Nova Campanha"
        cancelAction={handleCloseAndReset}
        saveAction={() => formRef.current.submitForm()}
      >
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" placeholder="Nome" />
          <CheckBox vertical name="products" options={products || []} />
        </Form>
      </BaloonModal>
    </Container>
  );
};

export default Campaign;
