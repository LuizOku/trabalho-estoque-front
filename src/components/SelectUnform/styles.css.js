import styled from 'styled-components';
import ReactSelect from 'react-select';

export const StyledSelect = styled(ReactSelect)`
  height: 35px;
  width: 100%;
  margin: ${props => props.hasError ? '5px 0 5px 0' : '5px 0'};
`;

export const ErrorSpan = styled.span`
  color: #D50000;
  align-self: flex-start;
  font-size: 10px;
  margin-top: 2px !important;
`;

