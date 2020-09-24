import styled from 'styled-components';

export const StyledInput = styled.input`
  height: 35px;
  width: 100%;
  border: none;
  border-bottom: ${props =>
    props.haserror ? '2px solid #D50000' : '1px solid #212121'};
`;

