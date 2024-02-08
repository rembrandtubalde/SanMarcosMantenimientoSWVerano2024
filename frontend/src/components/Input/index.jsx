import React from 'react';
import PropTypes from 'prop-types';

import { Input as StyledInput } from '../../styled-components/Input';

export const Input = (props) => {
  return (
    <>
      <StyledInput
        type={props.type}
        error={props.fail}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        onKeyDown={props.handleKeyDown}
        disabled={props.disabled}
      />
    </>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  fail: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  handleKeyDown: PropTypes.func,
  disabled: PropTypes.bool
};
