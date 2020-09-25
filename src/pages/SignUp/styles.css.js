import styled from 'styled-components';

import { Button } from '../../components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LoginContainer = styled.div`
  width: 450px;
  height: 500px;
  padding: 0 70px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  flex-direction: column;
  box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
`;

export const LoginHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  color: #006064;
`;

export const LoginBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  span {
    margin-top: 10px;
    text-align: center;
    color: #d50000;
  }
  a {
    margin-top: 10px;
    text-align: center;
    text-decoration: none;
    color: #006064;
    &:hover {
      color: #80deea;
    }
  }
`;

export const StyledButton = styled(Button)`
  margin: 0px;
  margin-top: 30px;
  width: 200px;
`;

