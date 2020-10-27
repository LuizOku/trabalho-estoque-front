import React, { useRef, useState } from 'react';

import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';
import { Input, Loader } from '../../components';
import Logo from '../../assets/logo.png';

import {
  Container,
  LoginContainer,
  LoginHeader,
  LoginBody,
  StyledButton,
} from './styles.css';

const SignIn = () => {
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
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      setShowLoader(true);
      const res = await api.post('user/login', data);
      setShowLoader(false);
      if (res.data) {
        await localStorage.setItem('auth-estoque', res.data?.token);
        await localStorage.setItem(
          'auth-estoque-is-client',
          res.data?.is_client
        );
        if (res.data?.is_client) {
          history.push('ecommerce');
        } else {
          history.push('movements');
        }
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
              <Input name="login" placeholder="Login" />
              <Input name="password" type="password" placeholder="Senha" />
              <StyledButton type="submit">Entrar</StyledButton>
              <Link to="/sign-up">Cadastrar usuário</Link>
            </LoginBody>
          </Form>
        </LoginContainer>
      </Container>
    </>
  );
};

export default SignIn;
