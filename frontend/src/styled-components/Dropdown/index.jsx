import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as DropdownStyled from './Dropdown.styled';

export const Dropdown = ({ handleSelect, fail, options, label }) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('');

  const handleSelected = (value) => {
    setSelected(value);
  };

  return (
    <DropdownStyled.Container>
      <DropdownStyled.Button
        className={`dropdown-btn ${selected ? 'dropdown-btn__active' : fail ? 'input--fail': null}`}
        onClick={() => setIsActive(!isActive)}
      >
        {selected ? selected : label}
        <i className="fa-solid fa-caret-down"></i>
      </DropdownStyled.Button>
      {isActive && (
        <DropdownStyled.Content>
          {options.map((option) => (
            <DropdownStyled.Item
              key={option.value}
              value={option.value}
              onClick={(e) => {
                handleSelected(option.label);
                handleSelect(e);
                console.log(e.target.getAttribute('value'));
                setIsActive(false);
              }}
            >
              {option.label}
            </DropdownStyled.Item>
          ))}
        </DropdownStyled.Content>
      )}
    </DropdownStyled.Container>
  );
};

Dropdown.propTypes = {
  handleSelect: PropTypes.func,
  fail: PropTypes.bool,
  options: PropTypes.array,
  label: PropTypes.string,
};