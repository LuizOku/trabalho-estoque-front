import styled from 'styled-components';

import { Button } from '../../../components';
import colors from '../../../styles/colors';

export const CartFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const PaymentTitle = styled.h4`
  margin-top: 10px;
  margin-left: 5px;
  font-weight: bold
`;

export const PaymentMethod = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 5px;
`;

export const PaymentOption = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: ${(props) => props.selected ? 'bold' : 'normal'};
  color: ${(props) => props.selected ? colors.secondary : colors.primary};
  border: ${(props) => props.selected ? `2px solid ${colors.secondary}` : `1px solid ${colors.primary}`};
  border-radius: 4px;
  margin-right: 10px;
`;

export const CheckoutCartButton = styled(Button)`
  margin: 0px;
  width: 200px;
  background: ${() => colors.secondary}
`;

export const CancelCartButton = styled(Button)`
  margin: 0px;
  width: 200px;
  background: #E53935;
`;