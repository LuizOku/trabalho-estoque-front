import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { InputContainer, Container } from './styles.css';

const Checkbox = ({ name, options, ...rest }) => {
  const inputRefs = useRef([]);
  const { fieldName, registerField, defaultValue = [] } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs) => {
        return refs.filter((ref) => ref.checked).map((ref) => ref.value);
      },
      clearValue: (refs) => {
        refs.forEach((ref) => {
          ref.checked = false;
        });
      },
      setValue: (refs, values) => {
        refs.forEach((ref) => {
          if (values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <Container>
      {options.map((option, index) => (
        <label htmlFor={option.id} key={option.id}>
          <InputContainer>
            <input
              defaultChecked={defaultValue.find((dv) => dv === option.id)}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              value={option.value}
              type="checkbox"
              id={option.id}
              {...rest}
            />
            {option.label}
          </InputContainer>
        </label>
      ))}
    </Container>
  );
};

export default Checkbox;
