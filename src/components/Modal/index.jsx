import React from 'react';

import { FiX } from 'react-icons/fi';

import { ModalFade, ModalContainer } from './styles.css';

const Modal = ({ open, title, width, height, children, handleClose }) => {
  return (
    <>
      {open && (
        <ModalFade onClick={handleClose}>
          <ModalContainer
            onClick={(e) => e.stopPropagation()}
            width={width}
            height={height}
          >
            <FiX size={25} onClick={handleClose} />
            <h1>{title}</h1>
            {children}
          </ModalContainer>
        </ModalFade>
      )}
    </>
  );
};

export default Modal;
