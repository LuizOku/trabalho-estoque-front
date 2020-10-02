import styled from 'styled-components';

import colors from '../../styles/colors';

export const StyledTable = styled.table`
  text-align: left;
  overflow: hidden;
  width: 98%;
  display: table;
  color: #ffffff;
  border: 1px solid #ffffff;
  h1 {
    font-size: 3em;
    font-weight: 300;
    line-height: 1em;
    text-align: center;
  }
  th h1 {
    font-weight: bold;
    font-size: 1em;
    text-align: left;
  }
  th {
    border: 1px solid #ffffff;
    padding-bottom: 1.7%;
    padding-top: 1.7%;
    padding-left: 1.7%;
    background-color: #303f9f;
  }
  td {
    border: 1px solid #ffffff;
    padding-bottom: 1.7%;
    padding-top: 1.7%;
    padding-left: 1.7%;
    font-weight: normal;
    font-size: 1em;
  }
  tr:nth-child(odd) {
    background-color: ${() => colors.primary};
  }
  tr:nth-child(even) {
    background-color: ${() => colors.tertiary};
  }
`;

