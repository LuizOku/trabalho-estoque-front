import styled from 'styled-components';

import colors from '../../styles/colors';

export const StyledButton = styled.button`
  height: 35px;
  background: ${(props) => props.background || colors.secondary};
  border-radius: 15px;
  border: none;
  color: ${(props) => props.color || '#ffffff'};
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    transform: scale(1.05);
  }
`;
