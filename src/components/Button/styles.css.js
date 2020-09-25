import styled from 'styled-components';

import colors from '../../styles/colors';

export const StyledButton = styled.button`
  height: 35px;
  background: ${() => colors.secondary};
  border-radius: 15px;
  border: none;
  color: #fff;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;
