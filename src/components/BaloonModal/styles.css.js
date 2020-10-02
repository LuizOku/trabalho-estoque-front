import styled from 'styled-components';

import colors from '../../styles/colors';

import Button from '../Button';

export const Container = styled.div`
  position: absolute;
  z-index: 10;
`;

export const ModalContainer = styled.div`
  height: ${props => props.height || "350px"};
  width: 250px;
  background: #fff;
  border-radius: 9px 9px 0 9px;
  position: fixed;
  bottom: 45px;
  right: 45px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  height: 50px;
  width: 100%;
  background: ${() => colors.tertiary};
  border-radius: 9px 9px 0 0;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
`;

export const ModalBody = styled.div`
  width: 100%;
  overflow-y: auto;
  height: calc(100% - 110px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 40px;
`;

export const ModalFooter = styled.div`
  bottom: 0;
  position: absolute;
  border-top: 1px solid #212121;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  border-radius: 0 0 0 9px;
`;

export const ActionButton = styled(Button)`
  width: 100px;
  background: ${props => props.cancel && 'red'}
`;
