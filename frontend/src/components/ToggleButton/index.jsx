import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setTheme } from '../../redux/state/themeSlice';
import './index.css';

export const ToggleButton = () => {
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('theme', theme);
  } , [theme]);

  const handleThemeChange = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="sidebar__switch">
      <label>
        <input type="checkbox" />
        <span
          className="sidebar__switch--slider"
          onClick={handleThemeChange}
        ></span>
      </label>
    </div>
  );
};
