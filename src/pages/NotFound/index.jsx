import React from 'react';

import NotFoundImage from '../../assets/404.svg';

import { Container } from './styles.css';

const NotFound = () => {
  return (
    <Container>
      <img src={NotFoundImage} alt="404" />
    </Container>
  );
};

export default NotFound;
