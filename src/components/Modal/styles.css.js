import styled from 'styled-components';

export const ModalFade = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  background: #00000080;
`;

export const ModalContainer = styled.div`
  width: ${props => props.width}px;
  max-height: ${props => props.height}px;
  background: #FFFFFF;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  h1 {
    align-self: center;
  }
  svg {
    align-self: flex-end;
    cursor: pointer;
  }
`;




