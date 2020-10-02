import React from 'react';

import { StyledSelect } from './styles.css';

const Select = ({ width, noMargin, ...rest }) => {
  return (
    <StyledSelect
      styles={{
        control: (provided, state) => ({
          ...provided,
          cursor: state.isDisabled ? 'default' : 'pointer',
        }),
      }}
      noMargin={noMargin}
      width={width}
      {...rest}
    />
  );
};

export default Select;
