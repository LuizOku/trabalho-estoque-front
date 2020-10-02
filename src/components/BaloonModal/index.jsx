import React from 'react';

import {
  Container,
  ModalContainer,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ActionButton,
} from './styles.css';

const BaloonModal = ({
  isVisible,
  title,
  children,
  cancelAction,
  saveAction,
  height,
}) => (
  <>
    {isVisible && (
      <Container>
        <ModalContainer height={height}>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <ActionButton cancel onClick={cancelAction}>
              Cancelar
            </ActionButton>
            <ActionButton onClick={saveAction}>Salvar</ActionButton>
          </ModalFooter>
        </ModalContainer>
      </Container>
    )}
  </>
);

export default BaloonModal;
