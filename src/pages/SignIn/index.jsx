import React from 'react';

import { useHistory, Link } from 'react-router-dom';
import { Form } from '@unform/web';

import { Input } from '../../components';
import Logo from '../../assets/logo.png';

import {
  Container,
  LoginContainer,
  LoginHeader,
  LoginBody,
  StyledButton,
} from './styles.css';

const SignIn = () => {
  const history = useHistory();

  const handleSubmit = (data) => {
    console.log(data);
    history.push('timeline');
  };

  return (
    <Container>
      <LoginContainer>
        <LoginHeader>
          <img src={Logo} alt="logo" />
        </LoginHeader>
        <Form onSubmit={handleSubmit}>
          <LoginBody>
            <Input name="email" placeholder="email" />
            <Input name="password" type="password" placeholder="senha" />
            <StyledButton type="submit">Entrar</StyledButton>
            <Link to="/sign-up">Cadastrar usuário</Link>
          </LoginBody>
        </Form>
      </LoginContainer>
    </Container>
  );
};

export default SignIn;
