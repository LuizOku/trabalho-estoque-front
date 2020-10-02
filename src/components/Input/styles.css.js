import styled from 'styled-components';

export const StyledInput = styled.input`
  height: 40px;
  width: 100%;
  border-radius: 4px;
  padding-left: 8px;
  margin: ${props => props.hasError ? '5px 0 0 0' : '5px 0'};
  border: ${props =>
    props.hasError ? '2px solid #D50000' : '1px solid rgb(204, 204, 204)'};
`;

export const ErrorSpan = styled.span`
  color: #D50000;
  align-self: flex-start;
  font-size: 10px;
  margin-top: 2px !important;
`;

