import styled from 'styled-components';

export const StyledInput = styled.input`
  height: 35px;
  width: 100%;
  border: none;
  border-bottom: ${props =>
    props.hasError ? '2px solid #D50000' : '1px solid #212121'};
`;

export const ErrorSpan = styled.span`
  color: #D50000;
  align-self: flex-start;
  font-size: 10px;
  margin-top: 2px !important;
`;

