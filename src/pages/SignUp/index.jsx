import React, { useRef, useState } from 'react';

import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';
import { Input, CheckBox, Loader } from '../../components';
import Logo from '../../assets/logo.png';

import {
  Container,
  LoginContainer,
  LoginHeader,
  LoginBody,
  StyledButton,
} from './styles.css';

const SignUp = () => {
  const formRef = useRef(null);
  const history = useHistory();
  const { addToast } = useToasts();
  const [showLoader, setShowLoader] = useState(false);

  const handleSubmit = async (data) => {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        login: Yup.string().required('Login obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
        permissions:
          data?.is_client.length > 0
            ? Yup.string()
            : Yup.string().required('Permissões obrigatórias'),
        is_client: Yup.array(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const formattedData = {
        ...data,
        permissions: data?.permissions?.split(',').map((per) => ({
          path: `/${per.trim()}`,
        })),
        is_client: data?.is_client.length > 0,
      };
      setShowLoader(true);
      const res = await api.post('user', formattedData);
      setShowLoader(false);
      if (res.data) {
        addToast('Usuário criado com sucesso', { appearance: 'success' });
        history.push('/');
      }
    } catch (err) {
      setShowLoader(false);
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

  return (
    <>
      <Loader showLoader={showLoader} />
      <Container>
        <LoginContainer>
          <LoginHeader>
            <img src={Logo} alt="logo" />
          </LoginHeader>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <LoginBody>
              <CheckBox
                name="is_client"
                options={[
                  {
                    id: 'is_client',
                    value: true,
                    label: 'Sou cliente',
                  },
                ]}
              />
              <Input name="login" placeholder="Login" />
              <Input name="password" type="password" placeholder="Senha" />
              <Input
                name="permissions"
                placeholder="Permissões (p1, p2, p3...)"
              />
              <StyledButton type="submit">Cadastrar</StyledButton>
              <Link to="/">Já tenho conta, entrar</Link>
            </LoginBody>
          </Form>
        </LoginContainer>
      </Container>
    </>
  );
};

export default SignUp;
