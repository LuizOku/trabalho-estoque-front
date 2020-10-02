import React, { useRef, useEffect } from 'react';

import { useField } from '@unform/core';

import { StyledSelect, ErrorSpan } from './styles.css';

const Select = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <>
      <StyledSelect
        styles={{
          control: (provided, state) => ({
            ...provided,
            border: error ? '2px solid #D50000' : null,
            cursor: state.isDisabled ? 'default' : 'pointer',
          }),
        }}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        hasError={error}
        error
        {...rest}
      />
      {error && <ErrorSpan>{error}</ErrorSpan>}
    </>
  );
};

export default Select;
