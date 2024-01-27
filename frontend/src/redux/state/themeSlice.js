import { createSlice } from '@reduxjs/toolkit';

const getTheme = () => {
  const theme = localStorage.getItem('theme');
  if (['light', 'dark'].includes(theme)) {
    return theme;
  }

  const userTheme = window.matchMedia('(prefers-color-scheme: light)');
  if (userTheme.matches) {
    return 'light';
  }

  return 'light';
};

const initialState = getTheme();

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => action.payload
  }
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;