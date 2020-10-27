import styled from 'styled-components';

import colors from '../../styles/colors';

export const StyledFabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  background: ${() => colors.secondary};
  border-radius: 50%;
  border: none;
  color: #ffffff;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  &:hover {
    transform: scale(1.05);
  }
`;
