import styled from 'styled-components';

import { Button } from '../../components';
import colors from '../../styles/colors';

export const Container = styled.div`
  padding-top: 100px;
`;

export const Body = styled.div`
  display: flex;
  padding: 0 50px 0 50px;
  flex-direction: column;
`;

export const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: ${props => props.selected ? '#ffffff' : 'transparent'};
  color: ${props => props.selected ? colors.primary : '#ffffff'};
  border-radius: 4px;
  font-weight: bold;
  margin: 0 10px;
  border: 2px solid #ffffff;
  cursor: pointer;
`;

export const CartContainer = styled.div`
  width: 50vh;
  height: 100%;
  position: fixed;
  right: 0;
  background: #FFFFFF;
  z-index: 20;
  box-shadow: 0 2px 3px rgba(0,0,0,.08);
  transform: translateX(0);
  transition: transform 0.3s ease-out;
`;

export const ProductCardsContainer = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ProductCard = styled.div`
  min-width: 260px;
  height: ${props => props.isCart ? 100 : 140}px;
  background: #FFFFFF;
  border-radius: 4px;
  box-shadow: 0 2px 3px rgba(0,0,0,.25);
  padding: 10px;
  margin: 5px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  border-bottom: ${() => `1px solid ${colors.primary}`};
  span {
    padding: 5px;
    border-radius: 4px;
    background: ${() => colors.secondary};
  }
`;

export const CardBody = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AddCartButton = styled(Button)`
  margin: 0px;
  width: 200px;
  background: ${() => colors.tertiary}
`;

export const CartFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
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


