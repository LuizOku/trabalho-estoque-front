import React, { useRef } from 'react';

import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';
import { Input } from '../../components';
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

  const handleSubmit = async (data) => {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        login: Yup.string().required('Login obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
        permissions: Yup.string().required('Permissões obrigatórias'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const formattedData = {
        ...data,
        permissions: data?.permissions?.split(',').map((per) => ({
          path: `/${per.trim()}`,
        })),
      };
      const res = await api.post('user', formattedData);
      if (res.data) {
        addToast('Usuário criado com sucesso', { appearance: 'success' });
        history.push('/');
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
        addToast(err.response?.data?.error, { appearance: 'error' });
      }
    }
  };

  return (
    <Container>
      <LoginContainer>
        <LoginHeader>
          <img src={Logo} alt="logo" />
        </LoginHeader>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <LoginBody>
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
  );
};

export default SignUp;
