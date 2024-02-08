import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export const Notification = ({ message }) => {
  return (
    <div className='message'>
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
};