import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export const Error = ({ error }) => {
  const hasManyErrors = Array.isArray(error);
  let errors;

  if (!hasManyErrors) errors = error.split('-');

  return (
    <div className='error-message'>
      {!hasManyErrors ? errors.map((err) => <h5 key={err}>{err}</h5>) : error}
    </div>
  );
};

Error.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])
};