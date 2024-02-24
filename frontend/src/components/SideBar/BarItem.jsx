import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import { LinkContainer } from './Sidebar.styled';

export const BarItem = (props) => {
  const { route, icon, isOpen, delay, label } = props;

  const itemVariant = {
    closed: {
      opacity: 0,
    },
    open: {
      opacity: 1,
    }
  };

  return (
    <LinkContainer to={route} >
      <i className={icon}></i>
      {isOpen && (
        <motion.span
          initial="closed"
          animate="open"
          transition={{ ease: 'easeInOut', delay }}
          variants={itemVariant}
          className="sidebar__link--text"
        >
          { label }
        </motion.span>
      )}
    </LinkContainer >
  );
};

BarItem.propTypes = {
  route: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  delay: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};