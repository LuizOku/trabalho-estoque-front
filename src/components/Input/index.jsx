import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { StyledInput, ErrorSpan } from './styles.css';

const Input = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <>
      <StyledInput
        ref={inputRef}
        defaultValue={defaultValue}
        hasError={error}
        {...rest}
      />
      {error && <ErrorSpan>{error}</ErrorSpan>}
    </>
  );
};

export default Input;
