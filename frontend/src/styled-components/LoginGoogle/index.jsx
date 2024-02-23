import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export const LoginGoogle = ({ handleGoogleLogin }) => {
  return (
    <button className="google-icon-wrapper" onClick={handleGoogleLogin}>
      <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="google button" />
      <span className="google-icon-text">Google</span>
    </button>
  );
};

LoginGoogle.propTypes = {
  handleGoogleLogin: PropTypes.func,
};