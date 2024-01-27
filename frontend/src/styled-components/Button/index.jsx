import React from 'react';
import PropTypes from 'prop-types';

import { Loader } from '../Loader';
import { StyledButton } from '../StyledButton';

export const Button = ({ type, label, handleClick, isLoading }) => {

  return (
    <>
      <StyledButton
        type={type}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? <Loader /> : label}
      </StyledButton>
    </>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  handleClick: PropTypes.func,
  isLoading: PropTypes.bool,
};