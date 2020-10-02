import styled from 'styled-components';
import Select from 'react-select';

export const StyledSelect = styled(Select)`
  width: ${props => props.width ? props.width : '98%'};
  margin-bottom: ${props => props.noMargin ? '5px' : '15px'};
  margin-top: 5px;
`;