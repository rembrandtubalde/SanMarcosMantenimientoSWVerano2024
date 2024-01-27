import React from 'react';
import PropTypes from 'prop-types';

import useToggle from '../../hooks/useToggle';
import { Input } from '../Input';
import * as PasswordInputStyled from './PasswordInput.styled';

export const PasswordInput = (props) => {
  let fail = props.fail;
  const { newState, handleToggle } = useToggle(false);

  return (
    <PasswordInputStyled.Container>
      <PasswordInputStyled.InputPass>
        <Input
          type={newState ? 'text' : 'password'}
          error={fail}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
          onKeyDown={props.handleKeyDown}
        />
        <PasswordInputStyled.ShowPassword onClick={handleToggle}>
          {newState ? (
            <i className="fa-solid fa-eye"></i>
          ) : (
            <i className="fa-solid fa-eye-slash"></i>
          )}
        </PasswordInputStyled.ShowPassword>
      </PasswordInputStyled.InputPass>
      <Input
        type={newState ? 'text' : 'password'}
        error={fail}
        placeholder={props.placeholderConfirm}
        name={props.nameConfirm}
        value={props.valueConfirm}
        onChange={props.handleChange}
        onKeyDown={props.handleKeyDown}
      />
    </PasswordInputStyled.Container>
  );
};

PasswordInput.propTypes = {
  type: PropTypes.string,
  fail: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  handleKeyDown: PropTypes.func,
  placeholderConfirm: PropTypes.string,
  nameConfirm: PropTypes.string,
  valueConfirm: PropTypes.string
};